"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Timer, Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [timeLeft, setTimeLeft] = useState(31 * 60);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const isCheckoutPage = pathname === "/checkout";
  const isShopPage = pathname === "/shop";

  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/") || pathname === "/admin-dashboard" || pathname.startsWith("/admin-dashboard/");
  const isCarDetailPage = pathname.startsWith("/shop/") && pathname !== "/shop";

  // Track favorites count from localStorage
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem("savedCars");
        if (stored) {
          const parsed = JSON.parse(stored);
          setFavCount(Array.isArray(parsed) ? parsed.length : 0);
        } else {
          setFavCount(0);
        }
      } catch { setFavCount(0); }
    };
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  useEffect(() => {
    if (!isCheckoutPage) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) { clearInterval(timer); return 0; }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isCheckoutPage]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const navLinks = [
    { name: "Buy Cars", href: "/shop", desc: "Find your perfect vehicle today" },
    { name: "Sell or Trade", href: "/sell-or-trade", desc: "Get the best value for your car" },
    { name: "Financing", href: "/finance", desc: "Simple and fast loan approvals" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        {showBanner && !isCarDetailPage && !isDashboard && (
          <div className="w-full bg-primary">
            <div className="max-w-custom mx-auto flex items-center justify-center py-[16px] px-[20px] relative">
              <p className="text-[16px] md:text-[18px] text-white font-medium text-center">
                <a href="/pre-qualify" className="font-medium underline">The BEST car</a>
                &nbsp; deals in Canada.
              </p>
              <button onClick={() => setShowBanner(false)} className="absolute text-white right-4 p-1 hover:opacity-60 transition-opacity">
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        <header className="w-full h-[50px] md:h-[70px] shadow-[0px_4px_23px_0px_#0000000F] bg-white">
          <div className="max-w-custom h-full mx-auto flex items-center justify-between px-[20px] lg:px-[0px]">
            <a href="/" className="flex justify-start items-center">
              <img src="/logo.png" alt="Autobon Logo" width={320} height={60} className="object-contain w-[100px] h-[40px] md:w-[160px] md:h-[40px]" />
            </a>

            <nav className="hidden lg:block">
              <ul className="flex cursor-pointer gap-6 xl:gap-10 text-nowrap text-[14px] xl:text-[16px] text-black justify-center items-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="transition-colors duration-300 hover:text-primary active:text-primary hover:underline">{link.name}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Right: Favourites (only on shop) + Auth */}
            <div className="hidden lg:flex items-center gap-4">
              {isCheckoutPage && (
                <div className="flex items-center gap-2 text-primary px-4 py-2">
                  <Timer size={23} className="animate-pulse" />
                  <span className="font-mono font-semibold text-[15px]">{formatTime(timeLeft)}</span>
                </div>
              )}
              {/* Favourites — shown only on shop page, styled like clutch.ca */}
              {isShopPage && (
                <a
                  href="/shop?view=favourites"
                  className="flex items-center gap-1.5 lg:gap-2 text-gray-600 hover:text-primary transition-colors px-2 lg:px-3 py-1.5"
                  title="View Favourites"
                >
                  <Heart size={20} className="text-gray-400" />
                  <span className="text-[13px] xl:text-[15px] font-medium">
                    Favourites ({favCount})
                  </span>
                </a>
              )}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-black px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100"
                  >
                    <span className="max-w-[120px] truncate text-gray-500">{user.name?.split(" ")[0]}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={"text-gray-400 transition-transform duration-200 " + (showUserMenu ? "rotate-180" : "")}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {showUserMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                      <div className="absolute right-0 top-full mt-3 w-[260px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-1 z-50">
                        <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45" />
                        <a href={user.role === "ADMIN" ? "/admin-dashboard" : "/dashboard"} className="block px-6 py-4 text-[15px] text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100" onClick={() => setShowUserMenu(false)}>My account</a>
                        <a href="/dashboard/my-orders" className="block px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100" onClick={() => setShowUserMenu(false)}>
                          <span className="block text-[15px] text-gray-700">My orders</span>
                          <span className="block text-[13px] text-gray-400 mt-0.5">View pending orders</span>
                        </a>
                        <a href="/dashboard/my-cars" className="block px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100" onClick={() => setShowUserMenu(false)}>
                          <span className="block text-[15px] text-gray-700">My cars</span>
                          <span className="block text-[13px] text-gray-400 mt-0.5">Cars you listed for sale</span>
                        </a>
                        <button onClick={async () => { setShowUserMenu(false); await logout(); router.push("/"); }} className="block w-full text-left px-6 py-4 text-[15px] text-gray-700 hover:bg-gray-50 transition-colors">Sign out</button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <a href="/login" className="flex items-center justify-center text-black px-8 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95">Sign In</a>
              )}
            </div>

            {/* Mobile: Burger */}
            <div className="flex lg:hidden items-center gap-2">
              {isShopPage && (
                <a
                  href="/shop?view=favourites"
                  className="relative p-2 text-gray-600"
                  aria-label="View Favourites"
                >
                  <Heart size={22} className="text-gray-600" />
                  {favCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white box-content">
                      {favCount}
                    </span>
                  )}
                </a>
              )}
              <button className="p-2" onClick={() => setIsOpen(true)}>
                <Menu size={24} className="text-gray-800" />
              </button>
            </div>
          </div>

          <div className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden z-[1] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)} />

          <div className={`fixed top-0 right-0 h-full w-[320px] bg-white z-[120000] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Autobon Logo" width={220} height={40} className="object-contain w-[80px] h-[30px] md:w-[220px] md:h-[40px]" />
                {isCheckoutPage && (
                  <div className="flex items-center gap-1 text-primary px-3 py-1">
                    <Timer size={14} className="animate-pulse" />
                    <span className="font-mono font-bold text-[12px]">{formatTime(timeLeft)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {user ? (
                  <button onClick={async () => { setIsOpen(false); await logout(); router.push("/"); }} className="text-[14px] font-medium bg-red-500 text-white px-5 py-2 rounded-full">Sign Out</button>
                ) : (
                  <a href="/login" className="text-[16px] font-medium bg-black text-white px-6 py-2 rounded-full" onClick={() => setIsOpen(false)}>Sign In</a>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1"><X size={24} className="text-gray-500" /></button>
              </div>
            </div>

            <div className="h-max overflow-y-auto p-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block p-4 rounded-[5px] transition-all active:scale-[0.98] border border-primary bg-primary/10">
                  <span className="block text-[16px] font-medium text-black">{link.name}</span>
                  <span className="block text-[11px] text-text mt-1">{link.desc}</span>
                </a>
              ))}
              {user && (
                <div className="border-t border-gray-100 pt-4 mt-1 flex flex-col gap-1">
                  <a href={user.role === "ADMIN" ? "/admin-dashboard" : "/dashboard"} onClick={() => setIsOpen(false)} className="block px-4 py-3 text-[15px] text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">My account</a>
                  <a href="/dashboard/my-orders" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="block text-[15px] text-gray-700">My orders</span>
                    <span className="block text-[12px] text-gray-400 mt-0.5">View pending orders</span>
                  </a>
                  <a href="/dashboard/my-cars" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="block text-[15px] text-gray-700">My cars</span>
                    <span className="block text-[12px] text-gray-400 mt-0.5">Cars you listed for sale</span>
                  </a>
                </div>
              )}
            </div>

            <div className="p-5 flex-1 border-t border-gray-100">
              {isCheckoutPage && (
                <div className="mb-4 p-3 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <Timer size={16} className="animate-pulse" />
                    <span className="font-mono font-bold">Time left: {formatTime(timeLeft)}</span>
                  </div>
                </div>
              )}
              <a href="/contact-us" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center bg-primary text-white py-4 rounded-full font-semibold shadow-lg shadow-primary/20">Contact Us</a>
              <div className="mt-[3rem] flex justify-center items-center gap-2 flex-col">
                <p className="text-sm">24/7 Support</p>
                <a href="tel:9058003100" className="text-primary hover:underline lg:ml-2">905-800-3100</a>
              </div>
            </div>
          </div>
        </header>
      </div>
      {showBanner && !isCarDetailPage && !isDashboard ? (
        <div className="h-[104px] md:h-[124px]" />
      ) : (
        <div className="h-[50px] md:h-[70px]" />
      )}
    </>
  );
};

export default Header;
