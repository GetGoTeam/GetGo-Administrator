import classes from "./Header.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { colors } from "./../../../../utils/colors";

function Header() {
  return (
    <div className={classes.container}>
      <a className={classes.logo} href="/" style={{ textDecoration: "none" }}>
        Master Admin
      </a>
      <div className={classes.logout}>
        <i class="fa-solid fa-right-from-bracket fa-lg" style={{ color: "#FF9494" }}></i>
      </div>
    </div>
  );
}

export default Header;
