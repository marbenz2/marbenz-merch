import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { convertToSubcurrency } from "@/utils/utils";
import { useTheme } from "next-themes";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function Stripe({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const { theme } = useTheme();

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: convertToSubcurrency(amount),
    currency: "eur",
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
}
