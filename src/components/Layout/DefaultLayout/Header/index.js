import classes from "./Header.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Header() {
  return (
    <div className={classes["header-container"]}>
      <div className={classes["logo-container"]}>
        <a className={classes["logo"]} href="/" style={{ textDecoration: "none" }}>
          Master Admin
        </a>
      </div>
      <div className={classes["navbar-container"]}>
        <div className={classes["logout"]}>
          <i className="fa-solid fa-right-from-bracket fa-lg"></i>
        </div>
      </div>
    </div>
  );
}

export default Header;
