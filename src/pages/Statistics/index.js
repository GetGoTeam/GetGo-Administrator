import StatisticsTable from "../../components/Layout/DefaultLayout/StatisticTable";
import Chart from "react-apexcharts";
import classes from "./Statistics.module.scss";

function Statistics() {
  const revenueList = [1000000, 1200000, 1400000, 1100000, 1500000, 2000000, 2100000];
  const todayRevenue = revenueList[revenueList.length - 1] | 0;
  const yesterdayRevenue = revenueList[revenueList.length - 2] | 0;

  const state = {
    options: {
      colors: [todayRevenue >= yesterdayRevenue ? "#05BC39" : "#FE0E0E", "#4576b5"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["20/6", "21/6", "22/6", "23/6", "24/6", "25/6", "26/6"],
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: revenueList,
      },
    ],
  };

  return (
    <>
      <h1>Thống kê</h1>
      <StatisticsTable
        yesterdayRevenue={yesterdayRevenue}
        todayRevenue={todayRevenue}
        canceledTrips={75}
        completedTrips={1248}
      />
      <div className={classes["chart-container"]}>
        <Chart options={state.options} series={state.series} type="area" width="100%" height="400" />
      </div>
    </>
  );
}

export default Statistics;
