---
layout: post
title: Setting up payments with Durianpay
meta_description: durianpay integration, expo react native
author: hadi_rickit
date: 2023-06-25 13:42:22
intro_paragraph: >-
  Durianpay is an Indonesian payment processor similar to global players like
  Stripe and Square. It provides entry into the Indonesian market with a
  relatively low barrier to entry, decent documentation good developer support.


  In this article, we will go through integrating checkout into an expo or web project. I will be spinning up a backend to return an access token as well as fire some logic on successful payment in a webhook.


  [L﻿ink to Durianpay documentation](https://durianpay.id/docs/integration/)



  **P﻿rerequisites**




  * Durianpay account

  * R﻿elevant API keys
categories: ""
---
# **H﻿ow to integrate Durianpay Checkout**

1. ### Pull in Durianpay script in HTML file

   * Since I'm using expo, I need to run `expo customize:web` to expose an HTML file, which I can then use to pull in Durianpay. If you're not using expo, you can skip this point.
   * P﻿aste this script into the head of your HTML file to pull in the library:\
     `<script async type="text/javascript" src="https://js.durianpay.id/0.1.39/durianpay.min.js"></script>`


2. ### S﻿et up server

   * S﻿pin up a node.js server and pull in `dpay-node-sdk` via your package manager of choice.
   * I﻿nitialise Durianpay like so:\
     `const dpay = new Durianpay({
       secret_key: "your_secret_key", // Use your Sandbox or LIVE key
     });`


3. ### Endpoint to return access token

   T﻿his access_token is required by client-side.

<script src="https://gist.github.com/rickithadi/9e6bf4f7ee854812229064f2ea5c0a98.js"></script>

4. ### Initialise checkout on client-side

   * C﻿reate checkout with previously obtained access_token and your API key.
   * `createDurianPayOrder` is a method that hits the create-order endpoint.
   * H﻿andle `onSuccess`, `onClose` and `onError` callbacks.



4. ### W﻿ebhook

   A known limitation I've come across is that Durianpay will force a refresh and take users to `redirect_url` if user does not click the (x) button. This results in `onSuccess`, `onClose` and `onError` callbacks not firing, meaning there is a risk of successful payment but fulfilment logic not being executed.

   A﻿ccording to Durianpay, setting up webhook is an optional step, but I highly recommend it. Although it does not fix the refresh, it ensures logic is fired on your backend once payments and/or orders are completed regardless of client status.

   * S﻿et up URL on Durianpay dashboard
   * Signature verification:
   * F﻿ire logic on event, assuming signatures tally:\
   * `if (event === "order.completed") {
     //onSuccess logic here
     }`