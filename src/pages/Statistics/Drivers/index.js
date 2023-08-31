import classes from "./Driver.module.scss";
import React, { useState, useMemo } from "react";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

const database = [
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
  {
    name: "Tran Bao Long",
    complete: 12,
    cancel: 2,
    revenue: 380000,
  },
];

function Driver() {
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return database.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage]);

  return (
    <>
      <div className={classes["table-container"]}>
        <div className={classes["table-container-title"]}>
          <div className={`${classes["table-container-no"]} ${classes["title"]}`}>STT</div>
          <div className={`${classes["table-container-name"]} ${classes["title"]}`}>Tài xế</div>
          <div className={`${classes["table-container-complete"]} ${classes["title"]}`}>Số đơn hoàn thành</div>
          <div className={`${classes["table-container-cancel"]} ${classes["title"]}`}>Số đơn đã hủy</div>
          <div className={`${classes["table-container-revenue"]} ${classes["title"]}`}>Doanh thu</div>
        </div>
        <div className={classes["table-container-content"]}>
          {currentTableData.map((item, index) => (
            <div key={index} className={classes["table-container-content-item"]}>
              <div className={`${classes["table-container-no"]} ${classes["item"]}`}>
                {pageSize * (currentPage - 1) + index + 1}
              </div>
              <div className={`${classes["table-container-name"]} ${classes["item"]}`}>{item.name}</div>
              <div className={`${classes["table-container-complete"]} ${classes["item"]}`}>{item.complete}</div>
              <div className={`${classes["table-container-cancel"]} ${classes["item"]}`}>{item.cancel}</div>
              <div className={`${classes["table-container-revenue"]} ${classes["item"]}`}>
                {numberWithCommas(item.revenue)}₫
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes["pagination-bar-container"]}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={database.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default Driver;
