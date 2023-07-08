import Header from "./Header";
import Sidebar from "./Sidebar";
import classes from "./DefaultLayout.module.scss";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={classes.container}>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
