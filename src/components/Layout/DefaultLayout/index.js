import Header from "./Header";
import Sidebar from "./Sidebar";
import classes from "./DefaultLayout.module.scss";
import Login from "~pages/Login";

function DefaultLayout({ children, active_index }) {
  return (
    <>
      <div className={classes["layout"]}>
        <Header />
        <div className={classes["container"]}>
          {/* <Login /> */}
          <div className={classes["sidebar"]}>
            <Sidebar active_index={active_index} />
          </div>
          <div className={classes["content"]}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
