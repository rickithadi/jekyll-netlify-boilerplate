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

   * Since I'm using expo, I need to run `expo customize:web` to expose an HTML file, which I can then use to pull in Durianpay. If you're not using expo, you can skip this pointer.
   * P﻿aste this script into the head of your HTML file to pull in the library:\
     `<script type="text/javascript" src="https://js.durianpay.id/0.1.39/durianpay.min.js"></script>`
2. ### S﻿et up server

   * S﻿pin up a node.js server and pull in `dpay-node-sdk` via your package manager of choice.
   * I﻿nitialise Durianpay like so:\
     `const dpay = new Durianpay({
       secret_key: "your_secret_key", // Use your Sandbox or LIVE key
     });`
3. ### Endpoint to return access token

   T﻿his access token is required by client-side.

   ```javascript
   app.post("/create-order", (req, res) => {
     // const { order_ref_id, customer_ref_id, email, amount } = req.body;
     console.log(req.body);
     const {
       order_ref_id,
       customer_ref_id,
       email,
       amount,
       lobbyImage,
       lineItemText,
       metadata,
     } = req.body;

     var options = {
       amount,
       currency: "IDR",
       metadata,
       order_ref_id,
       customer: {
         customer_ref_id,
         email,
       },
       items: [
         {
           name: lineItemText,
           qty: 1,
           price: amount,
           logo: lobbyImage,
         },
       ],
     };
     // Create Orders
     return dpay.orders
       .create(options)
       .then((resp) => {
         console.log("created order 💰", resp);
         // order_id = resp.order_id;
         const { id, access_token, metadata } = resp;
         console.log(metadata);
         res.json({ data: { id, access_token, metadata } });
       })
       .catch((error) => {
         console.log(error.err + " | " + JSON.stringify(error.data));
         return error;
       });
   });
   ```
4. C﻿reate checkout with previously obtained access_token and your API key, createDurianPayOrder here is a method that hits the create-order endpoint \
   \
   h﻿andle onSuccess, onClose and onError callbacks

   * ```javascript
          const {
                             data: { access_token, id },
                           } = await createDurianPayOrder();
                           console.log(access_token, id);
                           // @ts-ignore
                           let dpay = await window.Durianpay.init({
                             locale: "id",
                             environment: "production", // Value should be 'production' for both sandbox and live mode
                             access_key: access_token,
                             // access_key:'dp_test_XXXXXXXXX',                  
                             order_info: {
                               id,
                               customer_info: {
                                 id: currentUser.uid,
                                 email: currentUser.email,
                               },
                             },

                             onClose: function (response: any) {
                               console.log('closed', response)
                             
                             },
                             onSuccess: function (response: any) {
                               // this happens after the payment is completed successfully
                               console.log("success", response);
                            
                             },
                             onFailure: function (error: any) {
                               console.log("paymentFailed", error);
                             
                             },
                           });
                           dpay.checkout();
     ```


5. W﻿ebhook

   1. s﻿et up url on dpay dashboard

s﻿ignature verification

f﻿ire logic on event