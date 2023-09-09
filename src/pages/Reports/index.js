import classes from "./Reports.module.scss";
import React, { useState, useMemo, useEffect } from "react";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import { ToolBtn } from "~components/Layout/DefaultLayout/Button";
import { faPaperPlane, faEye } from "@fortawesome/free-solid-svg-icons";
import request from "~utils/request";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "~utils/base";
import { Tooltip } from "@mui/material";

function Reports() {
  const [loading, setLoading] = useState(false);
  const token = JSON.stringify(localStorage.getItem("tokenAdmin")).split('"').join("");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [reports, setReports] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await request
          .get("get-all-reports", { headers: headers })
          .then(function (res) {
            setReports(res.data);
          })
          .catch(function (error) {
            console.log("Get reports error: ", error);
          });

        await request
          .get("get-all/customer", { headers: headers })
          .then(function (res) {
            setCustomers(res.data);
          })
          .catch(function (error) {
            console.log("Get customers error: ", error);
          });

        await request
          .get("get-all/driver", { headers: headers })
          .then(function (res) {
            setDrivers(res.data);
          })
          .catch(function (error) {
            console.log("Get drivers error: ", error);
          });
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return reports.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage, reports]);

  function arr2str(arr) {
    var str = "";
    for (let i = 0; i < arr.length; i++)
      if (i < arr.length - 1) str += arr[i] + ", ";
      else str += arr[i];
    return str;
  }

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      const truncatedStr = str.substring(0, maxLength);
      const lastSpaceIndex = truncatedStr.lastIndexOf(",");
      const truncatedWithEllipsis = truncatedStr.substring(0, lastSpaceIndex);
      return truncatedWithEllipsis + "...";
    }
  }

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
              <div className={`${classes["table-container-id"]} ${classes["item"]}`}>{item.trip}</div>
              <div className={`${classes["table-container-customer"]} ${classes["item"]}`}>
                {!loading &&
                  (() => {
                    const foundCustomer = customers.find((e) => e._id === item.customer);
                    return foundCustomer ? foundCustomer.username : null;
                  })()}
              </div>
              <div className={`${classes["table-container-driver"]} ${classes["item"]}`}>
                {!loading &&
                  (() => {
                    const foundDriver = drivers.find((e) => e._id === item.driver);
                    return foundDriver ? foundDriver.username : null;
                  })()}
              </div>
              <Tooltip title={arr2str(item.reasons)} placement="top">
                <div className={`${classes["table-container-reason"]} ${classes["item"]}`}>
                  {truncateString(arr2str(item.reasons), 30)}
                </div>
              </Tooltip>
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
          totalCount={reports.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Backdrop sx={{ color: colors.primary_900, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Reports;
