import classes from "./Header.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Swal from "sweetalert2";
import { colors } from "~utils/base";

function Header() {
  return (
    <div className={classes["header-container"]}>
      <div className={classes["logo-container"]}>
        <a className={classes["logo"]} href="/" style={{ textDecoration: "none" }}>
          Master Admin
        </a>
      </div>
      <div className={classes["navbar-container"]}>
        <div
          className={classes["logout"]}
          onClick={() => {
            Swal.fire({
              title: "Xác nhận đăng xuất?",
              showCancelButton: true,
              cancelButtonText: `Hủy`,
              confirmButtonText: "OK",
              confirmButtonColor: colors.primary_900,
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem("tokenAdmin", "null");
                window.location.reload(false);
              }
            });
          }}
        >
          <i className="fa-solid fa-right-from-bracket fa-lg"></i>
        </div>
      </div>
    </div>
  );
}

export default Header;
