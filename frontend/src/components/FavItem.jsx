import React, { useState } from "react";
import { useFetch, useFetchToken } from "../hooks/useFetch";

export default function FavItem({ item = {} }) {
  const { token } = useFetchToken();
  const [checked, setChecked] = useState(item?.isFav);

  // Handle Add to Fav
  const handleFav = async (e) => {
    var c = e.target.checked;
    setChecked(c);

    const endpoint = c ? "add-to-fav" : "delete-from-fav";
    const res = await useFetch(endpoint, {
      method: "POST",
      authtoken: token,
      body: {
        itemId: item.itemId,
        item: item.name,
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleFav}
        id={item?.name?.split(" ")?.join("-")}
        placeholder="Enter"
        className="accent-slate-800 size-4 cursor-pointer rounded transition-all"
      />
      <label
        htmlFor={item?.name?.split(" ")?.join("-")}
        className="tracking-wide text-slate-800 select-none cursor-pointer"
      >
        {item?.name}
      </label>
    </div>
  );
}
