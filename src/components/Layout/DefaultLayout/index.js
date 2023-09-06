import Header from "./Header";
import Sidebar from "./Sidebar";
import classes from "./DefaultLayout.module.scss";
import Login from "~pages/Login";

function DefaultLayout({ children, active_index }) {
  const token = JSON.stringify(localStorage.getItem("tokenAdmin")).split('"').join("");

  return (
    <>
      <div className={classes["layout"]}>
        {token !== "null" && <Header />}
        <div className={classes["container"]}>
          {token !== "null" ? (
            <>
              <div className={classes["sidebar"]}>
                <Sidebar active_index={active_index} />
              </div>
              <div className={classes["content"]}>{children}</div>
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
