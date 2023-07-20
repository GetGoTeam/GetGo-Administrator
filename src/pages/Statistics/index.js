import classes from "./Statistics.module.scss";
import SlidingTabs from "../../components/Layout/DefaultLayout/SlidingTabs";
import General from "./General";
import Driver from "./Drivers";

function Statistics() {
  const tab1 = {
    name: "Tổng quan",
    content: <General />,
  };
  const tab2 = {
    name: "Tài xế",
    content: <Driver />,
  };

  return (
    <>
      <h1 className={classes["title"]}>Thống kê</h1>
      <SlidingTabs tab1={tab1} tab2={tab2} />
    </>
  );
}

export default Statistics;
