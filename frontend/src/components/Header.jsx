import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

// Navlinks
import { firstNavLinks, secondNavLinks } from "../assets/navlinks";

export default function Header() {
  return (
    <Fragment>
      <header className="bg-slate-100">
        <nav className="mx-10 py-4 space-y-1">
          <div className="flex justify-end">
            <ul className="flex items-center gap-6">
              {firstNavLinks?.map(({ name, link }, i) => (
                <li key={i}>
                  <Link
                    to={link}
                    className="tracking-wide text-slate-700 hover:text-slate-900 hover:underline transition-all"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold group">
              <Link to={"/"} className="hover:text-slate-600 transition-all">
                ECOMMERCE
              </Link>
            </div>
            <ul className="flex items-center gap-6">
              {secondNavLinks?.map(({ name, link }, i) => (
                <li key={i}>
                  <Link
                    to={link}
                    className="font-medium text-lg tracking-wide text-slate-700 hover:text-slate-900 hover:underline transition-all"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  to={"#"}
                  className="font-medium tracking-wide group text-slate-700 hover:text-slate-900 hover:underline transition-all"
                >
                  <Search
                    strokeWidth={1.5}
                    size={22}
                    className="hover:scale-110 transition-all"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="font-medium tracking-wide group text-slate-700 hover:text-slate-900 hover:underline transition-all"
                >
                  <ShoppingCart
                    strokeWidth={1.5}
                    size={22}
                    className="hover:scale-110 transition-all"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="flex items-center justify-center gap-4 bg-slate-200 py-2">
        <ChevronLeft size={24} strokeWidth={1.5} className="cursor-pointer" />
        <span>Get 10% off on business sign up</span>
        <ChevronRight size={24} strokeWidth={1.5} className="cursor-pointer" />
      </div>
    </Fragment>
  );
}
