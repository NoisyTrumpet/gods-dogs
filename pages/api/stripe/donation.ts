import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// Environment State
const isDev = process.env.NODE_ENV === "development";
const devUrl = "http://localhost:3000";
const prodUrl = "https://gods-dogs.vercel.app/";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, price, type } = req.query;

  let sessionOptions = {};
  let success = isDev ? `${devUrl}/thank-you/` : `${prodUrl}/thank-you/`;
  let cancel = isDev ? `${devUrl}/donate/` : `${prodUrl}/donate/`;

  if (id) {
    // Use pre-defined product
    sessionOptions = {
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: id,
          quantity: 1,
        },
      ],
      mode: type === "one-time" ? "payment" : "subscription",
      success_url: success,
      cancel_url: cancel,
    };
  } else if (price) {
    // Use custom price
    sessionOptions = {
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Custom Donation",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: type === "one-time" ? "payment" : "subscription",
      success_url: success,
      cancel_url: cancel,
    };
  }

  const session = await stripe.checkout.sessions.create(sessionOptions);

  if (isDev) {
    // Return Response from Stripe
    res.status(200).json({ session });
  }
  // Redirect to Stripe Checkout
  res.redirect(303, session.url);
};
