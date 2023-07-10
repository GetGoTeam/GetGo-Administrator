import classes from "./StatisticTable.module.scss";
import StatisticsTableItem from "./StatisticTableItem";

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function StatisticsTable(props) {
  const { yesterdayRevenue, todayRevenue, canceledTrips, completedTrips } = props;

  const canceledRate = ((canceledTrips * 100) / (completedTrips + canceledTrips)).toFixed(2);
  const revenueRate = (((todayRevenue - yesterdayRevenue) * 100) / yesterdayRevenue).toFixed(2);

  return (
    <div className={classes["statistics-table"]}>
      <div className={classes["statistics-table-row"]}>
        <StatisticsTableItem
          title="Doanh thu hôm qua"
          data={numberWithCommas(yesterdayRevenue) + "₫"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          bgColor="#C44FCE"
        />
        <StatisticsTableItem
          title="Doanh thu hôm nay"
          data={numberWithCommas(todayRevenue) + "₫"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          bgColor="#685BFD"
        />
        <StatisticsTableItem
          title="Tỷ lệ doanh thu"
          data={(todayRevenue >= yesterdayRevenue ? "+" : "") + revenueRate + "%"}
          icon={<i className="fa-solid fa-percent"></i>}
          bgColor="#F7B925"
          dataColor={todayRevenue >= yesterdayRevenue ? "#05BC39" : "#FE0E0E"}
        />
      </div>
      <div className={classes["statistics-table-row"]}>
        <StatisticsTableItem
          title="Số đơn đã hủy"
          data={numberWithCommas(canceledTrips)}
          icon={<i className="fa-solid fa-x"></i>}
          bgColor="#DF3F61"
        />
        <StatisticsTableItem
          title="Số đơn hoàn thành"
          data={numberWithCommas(completedTrips)}
          icon={<i className="fa-solid fa-check"></i>}
          bgColor="#4FCE89"
        />
        <StatisticsTableItem
          title="Tỷ lệ hủy đơn"
          data={canceledRate + "%"}
          icon={<i className="fa-solid fa-percent"></i>}
          bgColor="#DF3F61"
        />
      </div>
    </div>
  );
}

export default StatisticsTable;
