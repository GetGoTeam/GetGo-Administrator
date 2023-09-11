import classes from "./Drivers.module.scss";
import React, { useState, useMemo, useEffect } from "react";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import request from "~utils/request";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "~utils/base";
import format from "date-fns/format";

function numberWithCommas(x) {
  if (!x) return 0;
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function Driver() {
  const [loading, setLoading] = useState(false);
  const token = JSON.stringify(localStorage.getItem("tokenAdmin")).split('"').join("");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [data, setData] = useState([]);

  const getDays = (n) => {
    const date2String = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    };

    let daysValue = [];
    let daysText = [];
    const today = new Date();

    for (let i = n; i >= 0; i--) {
      const prevDay = new Date(today);
      prevDay.setDate(today.getDate() - i);
      prevDay.setHours(0, 0, 0, 0);
      daysValue.push(date2String(prevDay));
      daysText.push(format(prevDay, "dd/MM"));
    }
    return { value: daysValue, text: daysText };
  };

  var days = getDays(2);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const body = {
        startTime: days.value[0],
        endTime: days.value[1],
      };
      await request
        .post("statistic-drivers", body, { headers: headers })
        .then(function (res) {
          setData(res.data);
        })
        .catch(function (error) {
          console.log("Statistic driver error: ", error);
        })
        .finally(function () {
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
    return data.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage, data]);

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
              <div className={`${classes["table-container-name"]} ${classes["item"]}`}>{item.username}</div>
              <div className={`${classes["table-container-complete"]} ${classes["item"]}`}>{item.inishedTrips}</div>
              <div className={`${classes["table-container-cancel"]} ${classes["item"]}`}>{item.canceledTrips}</div>
              <div className={`${classes["table-container-revenue"]} ${classes["item"]}`}>
                {numberWithCommas(item.totalRevenue)}₫
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes["pagination-bar-container"]}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
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

export default Driver;
