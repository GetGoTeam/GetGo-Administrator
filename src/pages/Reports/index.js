import classes from "./Reports.module.scss";
import React, { useState, useMemo } from "react";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import { ToolBtn } from "~components/Layout/DefaultLayout/Button";
import { faPaperPlane, faEye } from "@fortawesome/free-solid-svg-icons";

const database = [
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
  {
    id: "123456789",
    customer: "Nguyễn Văn A",
    driver: "Trần Văn B",
    reason: "Vi phạm giao thông",
  },
];

function Reports() {
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return database.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage]);

  return (
    <>
      <h1>Báo cáo</h1>
      <div className={classes["table-container"]}>
        <div className={classes["table-container-title"]}>
          <div className={`${classes["table-container-no"]} ${classes["title"]}`}>STT</div>
          <div className={`${classes["table-container-id"]} ${classes["title"]}`}>ID đơn hàng</div>
          <div className={`${classes["table-container-customer"]} ${classes["title"]}`}>Khách hàng</div>
          <div className={`${classes["table-container-driver"]} ${classes["title"]}`}>Tài xế</div>
          <div className={`${classes["table-container-reason"]} ${classes["title"]}`}>Lý do</div>
          <div className={`${classes["table-container-tools"]}`} />
        </div>
        <div className={classes["table-container-content"]}>
          {currentTableData.map((item, index) => (
            <div key={index} className={classes["table-container-content-item"]}>
              <div className={`${classes["table-container-checkbox"]} ${classes["item"]}`}></div>
              <div className={`${classes["table-container-no"]} ${classes["item"]}`}>
                {pageSize * (currentPage - 1) + index + 1}
              </div>
              <div className={`${classes["table-container-id"]} ${classes["item"]}`}>{item.id}</div>
              <div className={`${classes["table-container-customer"]} ${classes["item"]}`}>{item.customer}</div>
              <div className={`${classes["table-container-driver"]} ${classes["item"]}`}>{item.driver}</div>
              <div className={`${classes["table-container-reason"]} ${classes["item"]}`}>{item.reason}</div>
              <div className={`${classes["table-container-tools"]} ${classes["item"]}`}>
                <div className={classes["tool-btn"]}>
                  <ToolBtn icon={faPaperPlane} />
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

export default Reports;
