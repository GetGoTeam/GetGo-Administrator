import StatisticsTable from "../../components/Layout/DefaultLayout/StatisticTable";

function Statistics() {
  return (
    <>
      <h1>Thống kê</h1>
      <StatisticsTable yesterdayRevenue={2000000} todayRevenue={2100000} canceledTrips={75} completedTrips={1248} />
    </>
  );
}

export default Statistics;
