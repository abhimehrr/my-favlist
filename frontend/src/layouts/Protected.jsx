import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch, useFetchToken } from "../hooks/useFetch";

const Protected = () => {
  const { token } = useFetchToken();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Verify Login
  useEffect(() => {
    (async () => {
      const res = await useFetch("verify-login", {
        method: "POST",
        authtoken: token,
      });
      setIsLoggedIn(res.isLoggedIn);
    })();
  }, [location]);

  return !isLoggedIn ? (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  ) : (
    <main className="min-h-screen bg-slate-100">
      <Outlet />
    </main>
  );
};

export default Protected;
