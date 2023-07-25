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
4. ### Initialise checkout on client-side

   * C﻿reate checkout with previously obtained access_token and your API key.
   * `createDurianPayOrder` is a method that hits the create-order endpoint.

     ```javascript
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
   * H﻿andle `onSuccess`, `onClose` and `onError` callbacks.
5. ### W﻿ebhook

   A known limitation I've come across is that Durianpay will force a refresh and take users to `redirect_url` if user does not click the (x) button. This results in `onSuccess`, `onClose` and `onError` callbacks not firing, meaning there is a risk of successful payment but fulfilment logic not being executed.

   A﻿ccording to Durianpay, setting up webhook is an optional step, but I highly recommend it. Although it does not fix the refresh, it ensures logic is fired on your backend once payments and/or orders are completed regardless of client status.

   * S﻿et up URL on Durianpay dashboard
   * Signature verification:

     ```javascript
      try {
         let hmac = crypto
           .createHmac(
             "sha256",
             process.env.NODE_ENV === "production"
               ? process.env.LIVE_DPAY_KEY
               : process.env.STAGING_DPAY_KEY
           )
           .update(`${data.id}|${data.amount_str}`)
           .digest("hex");

         const signatureOk = data.signature === hmac;



         if (!signatureOk) {
           console.log("signatures dont tally \n", data.signature, "\n", hmac);
           return res.send("Error, signature verification failed").status(420);
         }
       } catch (e) {
         console.log("cannot get signature", e);
         return res.send("Error, signature verification failed").status(420);
       }
     ```
   * F﻿ire logic on event, assuming signatures tally:

     `if (event === "order.completed") {
     //onSuccess logic here
     }`