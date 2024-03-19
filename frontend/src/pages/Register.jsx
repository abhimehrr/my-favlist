import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

// Components
import OtpForm from "../components/OtpForm";

export default function Register() {
  const [err, setErr] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

  // Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await useFetch("register", {
      method: "POST",
      body: {
        name,
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
    setErr("");
    setShowOtpInput(true);
  };

  // Handle Verify Account
  const handleVerifyAccount = async () => {
    const res = await useFetch("verify-otp", {
      method: "POST",
      body: {
        email,
        otp,
      },
    });
    if (res.err) {
      setErr(res.msg);
      return;
    }
    setErr("");
    navigate("/login", { replace: true });
  };

  return (
    <Fragment>
      {!showOtpInput ? (
        <div className="py-6">
          <div className="max-w-[450px] border border-slate-400 mx-auto p-8 rounded-lg">
            <div className="flex items-center justify-center flex-col">
              <div className="text-2xl font-semibold">Create your account</div>

              <div className="w-full relative mt-8">
                <div className="absolute -top-5 text-sm text-red-600">
                  {err}
                </div>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="name"
                      className="tracking-wide text-slate-700"
                    >
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter"
                      className="w-full bg-transparent px-2 py-1 text-lg border border-slate-300 outline-none focus:ring-1 focus:ring-slate-500 rounded transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="email"
                      className="tracking-wide text-slate-700"
                    >
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
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter"
                      className="w-full bg-transparent px-2 py-1 text-lg border border-slate-300 outline-none focus:ring-1 focus:ring-slate-500 rounded transition-all"
                    />
                  </div>
                  <div className="my-2">
                    <button
                      type="submit"
                      className="w-full tracking-wide py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md transition-all"
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>
                  <div className="w-full h-[0.5px] bg-slate-400" />
                  <div className="my-2 flex justify-center gap-2">
                    <div className="text-slate-700">Have an account?</div>
                    <Link
                      to="/"
                      className="text-slate-800 font-medium hover:underline"
                    >
                      LOGIN
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-6">
          <div className="max-w-[450px] border border-slate-400 mx-auto p-8 rounded-lg">
            <div className="flex items-center justify-center flex-col">
              <div className="text-2xl font-semibold">Verify your email</div>
              <div className="my-4 text-center">
                Enter the 8 digit code you have received on
                <span className="font-medium mx-2">
                  {email.slice(0, 2)}
                  ***
                  {email.slice(email?.length - 10, email?.length)}
                </span>
              </div>

              <div className="w-full mb-4 mt-6 relative">
                <div className="absolute -top-6 left-1 text-sm text-red-600">
                  {err}
                </div>
                <OtpForm length={8} setOTP={setOtp} />
                <div className="mt-8">
                  {otp && (
                    <button
                      onClick={handleVerifyAccount}
                      className="w-full tracking-wide py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md transition-all"
                    >
                      VERIFY
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
