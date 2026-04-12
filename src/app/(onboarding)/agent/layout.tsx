import { OnboardingNav, Footer } from "@/components/Nav";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OnboardingNav />
      <main className="min-h-[70vh] bg-slate-50">{children}</main>
      <Footer />
    </>
  );
}
