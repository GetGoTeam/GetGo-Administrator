import classes from "./General.module.scss";
import StatisticsTable from "~components/Layout/DefaultLayout/StatisticTable";
import Chart from "react-apexcharts";
import request from "~utils/request";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "~utils/base";
import { useState, useEffect } from "react";
import format from "date-fns/format";

function General() {
  const [loading, setLoading] = useState(false);
  const token = JSON.stringify(localStorage.getItem("tokenAdmin")).split('"').join("");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [finishTrip, setFinishTrip] = useState(0);
  const [cancelTrip, setCancelTrip] = useState(0);
  const [totalTrip, setTotalTrip] = useState(0);
  const [revenues, setRevenues] = useState([]);

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

  var days = getDays(7);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await request
          .get("get-finish-trips", { headers: headers })
          .then(function (res) {
            setFinishTrip(res.data.length);
          })
          .catch(function (error) {
            console.log("Get finish trips error: ", error);
          });

        await request
          .get("get-cancel-trips", { headers: headers })
          .then(function (res) {
            setCancelTrip(res.data.length);
          })
          .catch(function (error) {
            console.log("Get cancel trips error: ", error);
          });

        await request
          .get("get-all-trips", { headers: headers })
          .then(function (res) {
            setTotalTrip(res.data.length);
          })
          .catch(function (error) {
            console.log("Get total trips error: ", error);
          });

        const tmp = [];
        for (let i = 0; i < days.value.length - 1; i++) {
          const body = {
            startTime: days.value[i],
            endTime: days.value[i + 1],
          };
          await request
            .post("calculate-trips-by-time", body, { headers: headers })
            .then(function (res) {
              tmp.push(res.data.totalPrice);
            })
            .catch(function (error) {
              console.log("Get revenue error: ", error);
            });
        }
        setRevenues(tmp);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const state = {
    options: {
      colors: [revenues[revenues.length - 1] >= revenues[revenues.length - 2] ? "#05BC39" : "#FE0E0E", "#4576b5"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: days.text,
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: revenues,
      },
    ],
  };

  return (
    <>
      {!loading && (
        <>
          <StatisticsTable
            yesterdayRevenue={revenues[revenues.length - 2] | 0}
            todayRevenue={revenues[revenues.length - 1] | 0}
            canceledTrips={cancelTrip}
            completedTrips={finishTrip}
            totalTrips={totalTrip}
          />
          <div className={classes["chart-container"]}>
            <Chart options={state.options} series={state.series} type="area" width="100%" height="400" />
          </div>
        </>
      )}
      <Backdrop sx={{ color: colors.primary_900, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default General;
