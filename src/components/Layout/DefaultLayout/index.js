import Header from "./Header";
import Sidebar from "./Sidebar";
import classes from "./DefaultLayout.module.scss";
import { useState } from "react";

function DefaultLayout({ children, active_index }) {
  const [backdrop, setbackdrop] = useState(false);

  return (
    <>
      <div className={classes["layout"]}>
        <Header />
        <div className={classes["container"]}>
          <Sidebar active_index={active_index} />
          <div className={classes["content"]}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
