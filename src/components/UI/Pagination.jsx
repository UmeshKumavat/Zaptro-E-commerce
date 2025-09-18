import React from "react";

const getPages = (current, total) => {
  const pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }
  return pages;
};

const Pagination = ({ page, setPage, pageHandler, dynamicPageCount }) => {
  return (
    <div className="mt-10 space-x-4 flex justify-center items-center">
      <button
        disabled={page <= 1}
        onClick={() => pageHandler(page - 1)}
        className={`${
          page === 1 ? "bg-red-400" : "bg-red-500"
        } px-3 py-1 text-white font-semibold rounded-md cursor-pointer `}
      >
        Prev
      </button>

      {getPages(page, dynamicPageCount)?.map((currPage, index) => {
        return <span key={index} 
        onClick={() => typeof currPage === "number" && pageHandler(currPage)}
        className={`${currPage === page ? "font-bold text-red-600": ""} cursor-pointer`}
        >
          {currPage}
        </span>
      })}

      <button
        disabled={page >= dynamicPageCount}
        onClick={() => pageHandler(page + 1)}
        className={`${
          page >= dynamicPageCount ? "bg-red-400" : "bg-red-500"
        } px-3 py-1 text-white font-semibold rounded-md cursor-pointer `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
