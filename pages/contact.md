---
layout: page
title: Contact
meta_description: Get in touch with Hadi Rickit for development projects, security consulting, or collaboration opportunities.
permalink: /contact
section: contact
intro_paragraph: ""
---

<article class="contact-article">
  <div class="contact-intro">
    <h1>Get in touch</h1>
    <p class="lead">Ready to collaborate? Let's discuss your project.</p>
  </div>

  <div class="contact-form-section">
    {% include contact-form.html %}
  </div>
</article>

<style>
/* Contact page clean, minimal styling - matches about page */
.contact-article {
  max-width: 42rem;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #2d2d2d;
}

.contact-intro {
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e5e5;
}

.contact-intro h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

.lead {
  font-size: 1.25rem;
  color: #666;
  font-weight: 400;
  margin: 0;
}

.contact-form-section {
  margin-top: 0;
}

/* Form styling */
.form-minimal {
  margin-top: 0;
  max-width: 100%;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #666;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-minimal {
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-minimal--primary {
  background: #1a1a1a;
  color: white;
}

.btn-minimal--primary:hover {
  background: #333;
}

@media (max-width: 768px) {
  .contact-article {
    padding: 2rem 1.5rem 4rem;
  }
  
  .contact-intro h1 {
    font-size: 1.75rem;
  }
}
</style>
