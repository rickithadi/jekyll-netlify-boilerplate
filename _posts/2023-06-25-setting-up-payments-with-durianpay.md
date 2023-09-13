---
layout: post
title: Setting up payments with Durianpay 💰
meta_description: durianpay integration step by step
author: hadi_rickit
date: 2023-06-25 13:42:22
intro_paragraph: >-
  Durianpay is an Indonesian payment processor similar to global players like
  Stripe and Square. It provides entry into the Indonesian market with a
  relatively low barrier to entry, decent documentation good developer support.


  In this article, we will go through integrating checkout into an expo or web project. I will be spinning up a backend to return an access token as well as fire some logic on successful payment in a webhook.

  You'll need a durianpay account and relevant API keys

  [Link to Durianpay documentation](https://durianpay.id/docs/integration/)

categories: payments, indonesia, durianpay
---

 **How to integrate Durianpay Checkout**
<p align="center">

  <img alt="default publish site option on notion" title="deploy options provided by notion" src="
 https://rickithadi.com/assets/img/uploads/payment.png
"  >

  </p>

1. ### Pull in Durianpay script in HTML file

- Since I'm using expo, I need to run `expo customize:web` to expose an HTML file, which I can then use to pull in Durianpay. If you're not using expo, you can skip this point. Just use your index.html
- Paste this script into the head of your HTML file to pull in the library:

`<script async type="text/javascript" src="https://js.durianpay.id/0.1.39/durianpay.min.js"></script>`
<br><br>

<!-- 2. ### Set up server

   - Spin up a node.js server and pull in `dpay-node-sdk` via your package manager of choice.
   - Initialise Durianpay like so:\
      `const dpay = new Durianpay({
  secret_key: "your_secret_key", // Use your Sandbox or LIVE key
});`
     <br><br>

3. ### Create endpoint to return access token

   This access_token is required by the client.

<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%;"><a href="https://gist.github.com/rickithadi/9e6bf4f7ee854812229064f2ea5c0a98" data-iframely-url="//iframely.net/2Ah3zLz"></a></div></div><script async src="//iframely.net/embed.js"></script>
<br><br>

4.  ### Initialise checkout on client-side

        - Create checkout with previously obtained access_token and your API key.
        - `createDurianPayOrder` is a method that hits the create-order endpoint.

    <br>
    <br>
    <div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%;"><a href="https://gist.github.com/rickithadi/4207a58a04d1d8bf7e9885b485c61ef1" data-iframely-url="//iframely.net/GQdamwZ"></a></div></div><script async src="//iframely.net/embed.js"></script>

- Be sure to handle `onSuccess`, `onClose` and `onError` callbacks.
  <br><br>

5. ### Webhook

   A known limitation I've come across is that Durianpay will force a refresh and take users to `redirect_url` if user does not click the (x) button. This results in `onSuccess`, `onClose` and `onError` callbacks not firing, meaning there is a risk of successful payment but fulfilment logic not being executed.
  <br>

According to Durianpay, setting up webhook is an optional step, but I highly recommend it. Although it does not fix the refresh, it ensures logic is fired on your backend once payments and/or orders are completed regardless of client status.

- Set up URL on Durianpay dashboard

<br>
   - Signature verification:

<br>
<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%;"><a href="https://gist.github.com/rickithadi/a646ce4bf232edd8dbd472221373ad5a" data-iframely-url="//iframely.net/KWahL1k"></a></div></div><script async src="//iframely.net/embed.js"></script>
<br>
   - Fire logic on event, assuming signatures tally:
`if (event === "order.completed") {
//onSuccess logic here
}` -->
