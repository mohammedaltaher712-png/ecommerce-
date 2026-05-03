import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51TQJKXRljnWhtYTUBScpUs7yo5r9sesliDibFmbXVLzkCBLmFYMBM3SRFxasWYRkv5cX5X6AC7Z0ef5rDiJ4r9Ql0064iuZcZl"
);