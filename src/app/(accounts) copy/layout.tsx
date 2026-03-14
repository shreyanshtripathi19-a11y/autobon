"use client";

import Footer from "@/components/accounts/layouts/footer";
import Header from "@/components/accounts/layouts/header";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Autobon",
//   description: "",
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname === "/accounts/cars/trade";

  return (
    <div className="bg-white">
      <Header />
      <main className=" w-full min-h-[80vh] md:max-w-3/4 md:mx-auto">
        {!hideHeader && (
          <h2 className="mb-4 mt-8 font-semibold text-2xl">Account Dashboard</h2>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
