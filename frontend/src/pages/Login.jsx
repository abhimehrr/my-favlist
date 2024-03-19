import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function Login() {
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await useFetch("login", {
      method: "POST",
      body: {
        email,
        password,
      },
    });

    if (res.err) {
      if (res?.errors) {
        setErr(res?.errors[0].msg);
        return;
      }
      setErr(res.msg);
      return;
    }
    
    if (res?.access === "allowed") {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          exp: Date.now() + 1000 * 60 * 60 * 24,
          token: res?.authtoken,
        })
      );
      setErr("");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-[450px] border border-slate-400 mx-auto p-8 rounded-lg">
        <div className="flex items-center justify-center flex-col">
          <div className="text-2xl font-semibold">Login</div>
          <div className="my-4 text-center">
            <div className="text-lg font-medium">Welcome back to ECOMMERCE</div>
            <div className="text-sm">The next gen business marketplace</div>
          </div>

          <div className="w-full relative mt-6">
            <div className="absolute -top-6 text-sm text-red-600">{err}</div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="tracking-wide text-slate-700">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter"
                  className="w-full bg-transparent px-2 py-1 text-lg border border-slate-300 outline-none focus:ring-1 focus:ring-slate-500 rounded transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="tracking-wide text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter"
                    className="w-full bg-transparent px-2 pr-14 py-1 text-lg border border-slate-300 outline-none focus:ring-1 focus:ring-slate-500 rounded transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="underline text-sm text-slate-500 hover:text-slate-700 select-none cursor-pointer transition-all"
                    >
                      Show
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-2">
                <button
                  type="submit"
                  className="w-full tracking-wide py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md transition-all"
                >
                  LOGIN
                </button>
              </div>
              <div className="w-full h-[0.5px] bg-slate-400" />
              <div className="my-2 flex justify-center gap-2">
                <div className="text-slate-700">Don't have an account?</div>
                <Link
                  to="/register"
                  className="text-slate-800 font-medium hover:underline"
                >
                  SIGN UP
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
