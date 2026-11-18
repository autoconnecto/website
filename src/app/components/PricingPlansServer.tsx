import { getPublicPlans } from "@/lib/publicPlans";
import PricingExplorer from "@/app/components/PricingExplorer";

export default function PricingPlansServer() {
  const plans = getPublicPlans();
  return <PricingExplorer plans={plans} />;
}
