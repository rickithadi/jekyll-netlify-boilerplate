---
layout: post
title: Setting up payments with Durianpay
meta_description: durianpay integration, expo react native
author: hadi_rickit
date: 2023-07-25 10:51:06
intro_paragraph: >-
  Durianpay is an Indonesian payment processor similar to global players like
  Stripe and Square. It's a quick and easy way to get into the Indonesian market
  with a relatively low barrier to entry and good developer support.


  In this article, I will be talking about integrating checkout into an expo project. The main difference between this and Stripe Checkout is that this is not a purely client-side implementation. I will be spinning up a backend to return an access token as well as fire some logic on successful payment.


  **P﻿rerequisites**
categories: ""
---
# **H﻿ow to integrate Durianpay Checkout**

1. ### Pull in Durianpay script in HTML file

   * (expo only) Since I'm using expo, I need to run `expo customize:web` to expose an HTML file, which I can then use to pull in Durianpay. 
   * P﻿aste this script into the head of your HTML file to pull in the library:\
     `<script type="text/javascript" src="https://js.durianpay.id/0.1.39/durianpay.min.js"></script>`


2. L﻿oad library via Window API
3. S﻿et up server to listen and create access key
4. A﻿PI call to hit server and receive key
5. C﻿reate checkout with key
6. H﻿andle callbacks
7. W﻿ebhook