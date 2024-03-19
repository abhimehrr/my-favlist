import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Pagination({
  data = [],
  tempData = () => {},
  itemsPerPage = 5,
}) {
  const [pageIndex, setPageIndex] = useState(1);

  // Handle Next
  const handleNext = () => {
    if (Math.ceil(data.length / itemsPerPage) === pageIndex) return;
    setPageIndex((pre) => pre + 1);
  };
  // Handle Previous
  const handlePrev = () => {
    if (pageIndex === 1) return;
    setPageIndex((pre) => pre - 1);
  };

  // Paginate
  useEffect(() => {
    var skip = itemsPerPage * (pageIndex - 1);
    var temp = [];
    var ts = data;
    for (let i = skip; i < pageIndex * itemsPerPage; i++) {
      if (ts[i] === undefined) {
        break;
      }
      temp.push(ts[i]);
    }
    tempData(temp);
  }, [pageIndex]);

  return (
    <div className="flex items-center gap-2 select-none">
      <div className="flex items-center">
        <ChevronsLeft
          onClick={() => setPageIndex(1)}
          size={22}
          strokeWidth={1.5}
          className={`transition-all hover:scale-125 ${
            pageIndex === 1
              ? "cursor-not-allowed text-slate-300"
              : "cursor-pointer text-slate-500 hover:text-slate-800"
          }`}
        />
        <ChevronLeft
          onClick={handlePrev}
          size={22}
          strokeWidth={1.5}
          className={`transition-all hover:scale-125 ${
            pageIndex === 1
              ? "cursor-not-allowed text-slate-300"
              : "cursor-pointer text-slate-500 hover:text-slate-800"
          }`}
        />
      </div>
      <div className="flex items-center gap-2">
        {[...Array(7)].map((_, i) => {
          if (pageIndex + i > Math.ceil(data.length / itemsPerPage)) {
            return;
          }
          return (
            <button
              key={i}
              onClick={() => setPageIndex(pageIndex + i)}
              className={`px-1 w-5 font-medium ${
                pageIndex ? "text-slate-500" : "text-slate-800"
              } hover:text-slate-800 transition-all hover:scale-125`}
            >
              {pageIndex + i}
            </button>
          );
        })}
        {data?.length > itemsPerPage &&
          pageIndex < Math.ceil(data.length / itemsPerPage) - itemsPerPage && (
            <span className="text-xl">...</span>
          )}
      </div>
      <div className="flex items-center">
        <ChevronRight
          onClick={handleNext}
          size={22}
          strokeWidth={1.5}
          className={`transition-all hover:scale-125 ${
            Math.ceil(data.length / itemsPerPage) === pageIndex
              ? "cursor-not-allowed text-slate-300"
              : "cursor-pointer text-slate-500 hover:text-slate-800"
          }`}
        />
        <ChevronsRight
          onClick={() => setPageIndex(Math.ceil(data.length / itemsPerPage))}
          size={22}
          strokeWidth={1.5}
          className={`transition-all hover:scale-125 ${
            Math.ceil(data.length / itemsPerPage) === pageIndex
              ? "cursor-not-allowed text-slate-300"
              : "cursor-pointer text-slate-500 hover:text-slate-800"
          }`}
        />
      </div>
    </div>
  );
}
