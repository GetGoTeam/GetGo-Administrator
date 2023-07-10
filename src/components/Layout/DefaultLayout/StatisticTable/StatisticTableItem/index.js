import classes from "./StatisticTableItem.module.scss";

function StatisticsTableItem(props) {
  const { title, icon, data, bgColor, dataColor } = props;

  return (
    <div className={classes["item-container"]}>
      <div className={classes["icon"]} style={{ backgroundColor: `${bgColor}` }}>
        {icon}
      </div>
      <div className={classes["text-container"]}>
        <div className={classes["title"]}>{title}</div>
        <div className={classes["data"]} style={{ color: `${dataColor}` }}>
          {data}
        </div>
      </div>
    </div>
  );
}

export default StatisticsTableItem;
