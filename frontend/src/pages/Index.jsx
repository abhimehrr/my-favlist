import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch, useFetchToken } from "../hooks/useFetch";

// Components
import Pagination from "../components/Pagination";
import FavItem from "../components/FavItem";

export default function MyFavList() {
  const { token } = useFetchToken();
  const [items, setItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);

  // Pagination Logic
  const itemsPerPage = 6;
  
  // Fetch and display all categories
  useEffect(() => {
    (async () => {
      const res = await useFetch("get-categories", {
        method: "POST",
        authtoken: token,
      });
      setItems(res?.items);
      setTempItems(res?.items.slice(0, itemsPerPage));
    })();
  }, []);

  return (
    <div className="py-6">
      <div className="max-w-[450px] border border-slate-400 mx-auto p-8 rounded-lg">
        <div className="flex items-center justify-center flex-col">
          <div className="text-2xl font-semibold">
            Please mark your interest!
          </div>
          <div className="text-sm my-4">We will keep you notified.</div>

          <div className="w-full text-lg">
            <div className="my-4 font-medium">My saved interest!</div>
            <div className="flex flex-col gap-2">
              {tempItems?.map((item, i) => (
                <FavItem key={item.itemId} item={item} />
              ))}
            </div>
            {items?.length > itemsPerPage && (
              <div className="mt-4">
                <Pagination
                  data={items}
                  tempData={setTempItems}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
