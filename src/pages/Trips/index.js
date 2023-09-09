import classes from "./Trips.module.scss";
import React, { useState, useMemo, useEffect } from "react";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import { ToolBtn } from "~components/Layout/DefaultLayout/Button";
import { faStar, faEye } from "@fortawesome/free-solid-svg-icons";
import request from "~utils/request";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "~utils/base";
import { format } from "date-fns";

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function Trips() {
  const [loading, setLoading] = useState(false);
  const token = JSON.stringify(localStorage.getItem("tokenAdmin")).split('"').join("");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await request
        .get("get-all-trips", { headers: headers })
        .then(function (res) {
          const data = res.data;
          setTrips(data);
        })
        .catch(function (error) {
          console.log("Get trips error: ", error);
        })
        .then(function () {
          setLoading(false);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return trips.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage, trips]);

  return (
    <>
      <h1>Đơn hàng</h1>
      <div className={classes["table-container"]}>
        <div className={classes["table-container-title"]}>
          <div className={`${classes["table-container-no"]} ${classes["title"]}`}>STT</div>
          <div className={`${classes["table-container-phone"]} ${classes["title"]}`}>Số điện thoại</div>
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
              <div className={`${classes["table-container-phone"]} ${classes["item"]}`}>{item.phone}</div>
              <div className={`${classes["table-container-time"]} ${classes["item"]}`}>
                {format(new Date(item.createdAt), "dd/MM/yyyy") +
                  " lúc " +
                  format(new Date(item.createdAt), "HH:mm:ss")}
              </div>
              <div
                className={`${classes["table-container-status"]} ${classes["item"]} ${
                  classes[`item-${item.status === "Picking Up" ? "Picking-Up" : item.status}`]
                }`}
              >
                {item.status}
              </div>
              <div className={`${classes["table-container-revenue"]} ${classes["item"]}`}>
                {item.status === "complete" ? numberWithCommas(item.price) + "₫" : "N/A"}
              </div>
              <div className={`${classes["table-container-tools"]} ${classes["item"]}`}>
                <div className={classes["tool-btn"]}>
                  <ToolBtn icon={faStar} disable={item.status === "Arrived" ? false : true} />
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
          totalCount={trips.length}
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

export default Trips;
