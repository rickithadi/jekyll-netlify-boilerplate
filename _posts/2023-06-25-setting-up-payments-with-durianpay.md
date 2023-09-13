---
layout: post
title: Setting up payments with Durianpay 💰
meta_description: Discover the hassle-free way to streamline your payment process with Durianpay! Learn step-by-step how to set up secure and efficient payments in our comprehensive guide. Optimize your transactions today!
author: hadi_rickit
date: 2023-08-25 13:42:22
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

<img alt="durianpay payment screen" title="durianpay payment screen" src="
 https://rickithadi.com/assets/img/uploads/payment.png">

  </p>

1. ### Pull in Durianpay script in HTML file

- Since I'm using expo, I need to run `expo customize:web` to expose an HTML file, which I can then use to pull in Durianpay. If you're not using expo, you can skip this point. Just use your index.html
- Paste this script into the head of your HTML file to pull in the library:

<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%;"><a href="https://gist.github.com/rickithadi/8d89fc9c257ff7cc582da2914ef6167b" data-iframely-url="//iframely.net/IZvjrIN"></a></div></div><script async src="//iframely.net/embed.js"></script>

<br><br>

2. ### Set up server

   - Spin up a node.js server and pull in `dpay-node-sdk` via your package manager of choice.
   - Initialise Durianpay like so:\
      `const dpay = new Durianpay({
  secret_key: "your_secret_key", // Use your Sandbox or LIVE key
});`
     <br><br>

3. ### Create endpoint to return access token

   This /create-order endpoint will generate an access token which the client will use to initialise the checkout.

<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%;"><a href="https://gist.github.com/rickithadi/9e6bf4f7ee854812229064f2ea5c0a98" data-iframely-url="//iframely.net/2Ah3zLz"></a></div></div><script async src="//iframely.net/embed.js"></script>
<br><br>

4.  ### Initialise checkout on client-side

- Create checkout with previously obtained access_token and your API key.
- `createDurianPayOrder` is a method that hits the create-order endpoint via POST request.

<br>
<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%;"><a href="https://gist.github.com/rickithadi/4207a58a04d1d8bf7e9885b485c61ef1" data-iframely-url="//iframely.net/GQdamwZ"></a></div></div><script async src="//iframely.net/embed.js"></script>

- Be sure to handle `onSuccess`, `onClose` and `onError` callbacks.
  <br><br>

5.  ### Webhook

A known limitation I've come across is that Durianpay will force a refresh and take users to `redirect_url` if user does not click the (x) button. This results in `onSuccess`, `onClose` and `onError` callbacks not firing, meaning there is a risk of successful payment but fulfilment logic not being executed.
<br>

<br>
<p align="center">

<img alt="payment success screen, durianpay" title="payment success screen, durianpay" src="
 https://rickithadi.com/assets/img/uploads/payment-success.png
">

</p>
According to Durianpay, setting up a webhook is an optional step. I highly recommend it. Although it does not fix the refresh, it ensures logic is fired on your backend once payments and/or orders are completed regardless of client status.

- Set up your webhook URL on Durianpay dashboard. Listen to `order.completed` event

- This URL should be whatever route your webhook is sitting on. In my case I have the route set up like so
  `app.post("/api/dpay/webhook", DurianpayWebhook);`

- Therefore my webhook url is `https://yourServerDomain/api/dpay/webhook`

<br>
<p align="center">
<img alt="durianpay dashboard, webhooks" title="durianpay dashboard, webhooks" src="https://res.cloudinary.com/drxewzlaa/image/upload/v1694570584/Screenshot_2023-09-12_at_9.29.45_PM_ncgcuy.png"  >
</p>
<br>

6.  ### Webhook Signature Verification (optional)

- Your webhook will work without verifying event signatures but it is highly encouraged to make sure the events are actually yours:

<br>
<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%;"><a href="https://gist.github.com/rickithadi/a646ce4bf232edd8dbd472221373ad5a" data-iframely-url="//iframely.net/KWahL1k"></a></div></div><script async src="//iframely.net/embed.js"></script>
<br>

- Fire logic on event, assuming signatures tally:

`if (event === "order.completed") {
//onSuccess logic here
}`

In this use case I am adding a user to a lobby on successful payment, alter this accordingly to suit your needs.

5.  ### Deployment

I have this backend deployed via [fly.io](https://fly.io/) and the frontend on [vercel](https://vercel.com). Fly has been very impressive so far, similar to heroku but less salesforce bloat and a better experience all around.

6.  ### Final thoughts

Durianpay has an overall decent developer experience. What it lacks in documentation clarity has been more than made up for with prompt response to techincal queries. They even went as far as to add my team to a whatsapp group with some of their engineers which was and continues to be invaluable

The business impact has been fantastic, the ability to enter the indonesian market and gain access to the many country specific payment options proves to be extremely useful.

Seeing how bigger players like stripe, square and xendit all have rather high barriers to entry and or a lack of support for the market, I would recommend Durianpay to any startup looking to break into the space.

<br>
<p align="center">
<img alt="Playard lobby screen" title="Playard lobby screen" src="https://res.cloudinary.com/drxewzlaa/image/upload/v1694570480/app.playard.id_Lobby_lobbyId_9T9rO78enscpy1tkHgkn_iPhone_12_Pro_uv7gvi.png">
</p>
<br>
Come have a look at [Playard's](https://playard.id) implementation of Durianpay. Users pay for a slot in a curated game of sport catered to their needs and preferences. There are also wallet, payout and lobby monetisation features, all of which are powered by durianpay.

<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@playard.id/video/7277083991520431365" data-video-id="7277083991520431365" data-embed-from="oembed" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@playard.id" href="https://www.tiktok.com/@playard.id?refer=embed">@playard.id</a> <p>Nguji skill pemain basket lapang umum. Ternyata rame banget!! 🔥 <a title="basketball" target="_blank" href="https://www.tiktok.com/tag/basketball?refer=embed">#basketball</a> <a title="basketballchallenge" target="_blank" href="https://www.tiktok.com/tag/basketballchallenge?refer=embed">#basketballchallenge</a> <a title="bandung" target="_blank" href="https://www.tiktok.com/tag/bandung?refer=embed">#bandung</a> <a title="basketbandung" target="_blank" href="https://www.tiktok.com/tag/basketbandung?refer=embed">#basketbandung</a> </p> <a target="_blank" title="♬ Laugh Now Cry Later - Drake" href="https://www.tiktok.com/music/Laugh-Now-Cry-Later-6862934328339335170?refer=embed">♬ Laugh Now Cry Later - Drake</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

Join a game, sweat it out and make some friends in the process 😎
