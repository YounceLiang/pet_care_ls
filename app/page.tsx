import { ToastProvider } from "../components/ui/toast";
import { LandingRoot } from "../components/landing/LandingRoot";

export default function Page() {
  return (
    <ToastProvider>
      <LandingRoot />
    </ToastProvider>
  );
}
