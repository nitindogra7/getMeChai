"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import MobileSidebar from "./feed/MobileSidebar";

const Footer = () => {
  const { data: session } = useSession();
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();
  const getActiveTab = () => {
    if (pathname === "/home") return "home";
    if (pathname === "/dashboard") return "dashboard";
    if (
      pathname?.startsWith("/") &&
      pathname !== "/home" &&
      pathname !== "/dashboard"
    )
      return "profile";
    return "home";
  };

  const router = useRouter();

  return (
    <div className=" flex items-center justify-center">
    {!session?.user &&  <footer
        className={`flex gap-3 sm:gap-6 items-center flex-wrap md:flex-nowrap justify-center md:justify-between py-6 w-[85%] mx-auto border-t border-zinc-100 ${session?.user && "mb-10"} md:mb-0`}
      >
        <span className="text-zinc-400 text-sm font-medium tracking-wide">
          &copy; 2026 Get Me a Chai
        </span>

        <ul className="flex font-medium gap-6 md:gap-8 text-sm text-zinc-600">
          <li className="hover:text-zinc-900 cursor-pointer transition-colors duration-150">
           <Link href={"/about"}> About </Link>
          </li>
          <li className="hover:text-zinc-900 cursor-pointer transition-colors duration-150">
            <Link href={"/faq"}> Help </Link>
          </li>
          <li className="hover:text-zinc-900 cursor-pointer transition-colors duration-150">
            <Link href={"/privacy-policy"}> Privacy </Link>
          </li>
          <li className="hover:text-zinc-900 cursor-pointer transition-colors duration-150">
            <Link href={"/terms"}> Terms </Link>
          </li>
        </ul>

        <ul className="flex gap-4 items-center">
          <Link href="https://github.com/nitindogra7" target="_blank" rel="noopener noreferrer">
            <li className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 cursor-pointer transition-colors duration-150 text-zinc-600 hover:text-zinc-900">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </li>
          </Link>
          <Link href="https://www.linkedin.com/in/nitin-dogra-025497255/" target="_blank" rel="noopener noreferrer">
            <li className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 cursor-pointer transition-colors duration-150 text-zinc-600 hover:text-zinc-900">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </li>
          </Link>
        </ul>
      </footer>
       }
      {session?.user && (
        <>
          {showSidebar && (
            <MobileSidebar
              onClose={() => {
                setShowSidebar(false);
              }}
            />
          )}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-stone-200 h-14 z-20">
            <ul className="flex justify-around items-center h-full px-4 list-none m-0 p-0">
              {[
                { icon: "home", label: "home" },
                { icon: "search", label: "tasks" },
                { icon: "dashboard", label: "dashboard" },
                { icon: "person", label: "profile" },
              ].map(({ icon, label }) => (
                <li key={label}>
                  <button
                    onClick={() => {
                      if (label === "home") router.push("/home");
                      if (label === "tasks") setShowSidebar(true);
                      if (label === "dashboard") router.push("/dashboard");
                      if (label === "profile")
                        router.push(`/${session?.user?.name}`);
                    }}
                    className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${
                      getActiveTab() === label ||
                      (label === "tasks" && showSidebar)
                        ? "text-amber-500"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    <span className="material-symbols-outlined !text-[22px]">
                      {icon}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Footer;
