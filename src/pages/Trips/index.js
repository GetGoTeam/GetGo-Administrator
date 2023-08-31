import classes from "./Trip.module.scss";
import React, { useState, useMemo } from "react";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import { ToolBtn } from "~components/Layout/DefaultLayout/Button";
import { faStar, faEye } from "@fortawesome/free-solid-svg-icons";

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

const database = [
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "complete",
    revenue: 30000,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "pending",
    revenue: 0,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "cancel",
    revenue: 0,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "complete",
    revenue: 30000,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "pending",
    revenue: 0,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "cancel",
    revenue: 0,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "complete",
    revenue: 30000,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "pending",
    revenue: 0,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "cancel",
    revenue: 0,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "complete",
    revenue: 30000,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "pending",
    revenue: 0,
  },
  {
    customer: "Trần Văn B",
    driver: "Nguyễn Văn A",
    time: "01/07/2023",
    status: "cancel",
    revenue: 0,
  },
];

function Trips() {
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return database.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage]);

  return (
    <>
      <h1>Đơn hàng</h1>
      <div className={classes["table-container"]}>
        <div className={classes["table-container-title"]}>
          <div className={`${classes["table-container-no"]} ${classes["title"]}`}>STT</div>
          <div className={`${classes["table-container-customer"]} ${classes["title"]}`}>Khách hàng</div>
          <div className={`${classes["table-container-driver"]} ${classes["title"]}`}>Tài xế</div>
          <div className={`${classes["table-container-time"]} ${classes["title"]}`}>Thời gian</div>
          <div className={`${classes["table-container-status"]} ${classes["title"]}`}>Trạng thái</div>
          <div className={`${classes["table-container-revenue"]} ${classes["title"]}`}>Doanh thu</div>
          <div className={`${classes["table-container-tools"]}`} />
        </div>
        <div className={classes["table-container-content"]}>
          {currentTableData.map((item, index) => (
            <div key={index} className={classes["table-container-content-item"]}>
              <div className={`${classes["table-container-checkbox"]} ${classes["item"]}`}></div>
              <div className={`${classes["table-container-no"]} ${classes["item"]}`}>
                {pageSize * (currentPage - 1) + index + 1}
              </div>
              <div className={`${classes["table-container-customer"]} ${classes["item"]}`}>{item.customer}</div>
              <div className={`${classes["table-container-driver"]} ${classes["item"]}`}>{item.driver}</div>
              <div className={`${classes["table-container-time"]} ${classes["item"]}`}>{item.time}</div>
              <div
                className={`${classes["table-container-status"]} ${classes["item"]} ${classes[`item-${item.status}`]}`}
              >
                {item.status === "complete" ? "Hoàn thành" : item.status === "pending" ? "Đang chạy" : "Đã hủy"}
              </div>
              <div className={`${classes["table-container-revenue"]} ${classes["item"]}`}>
                {item.status === "complete" ? numberWithCommas(item.revenue) + "₫" : "N/A"}
              </div>
              <div className={`${classes["table-container-tools"]} ${classes["item"]}`}>
                <div className={classes["tool-btn"]}>
                  <ToolBtn icon={faStar} disable={item.status === "complete" ? false : true} />
                </div>
                <div className={classes["tool-btn"]}>
                  <ToolBtn icon={faEye} />
                </div>
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

export default Trips;
