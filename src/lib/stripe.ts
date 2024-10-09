import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRETKEY ?? "" , {
    apiVersion: "2024-09-30.acacia",
    typescript: true
})