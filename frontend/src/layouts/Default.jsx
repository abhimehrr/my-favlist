import { Outlet } from "react-router-dom";

const Default = () => {
  return (
    <main className="min-h-screen bg-slate-100">
      <Outlet />
    </main>
  );
};

export default Default;
