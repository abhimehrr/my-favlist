import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="py-6">
      <div className="max-w-[450px] border border-slate-400 mx-auto p-8 rounded-lg">
        <div className="flex items-center justify-center flex-col">
          <div className="text-4xl font-semibold">404</div>
          <div className="my-4 text-center">
            This is not a valid url
            <div className="font-medium mx-2">I'm so sorry!</div>
            <Link
              to="/"
              className="block tracking-wide py-2 mt-8 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md transition-all"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
