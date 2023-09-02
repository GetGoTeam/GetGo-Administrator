import classes from "./Login.module.scss";
import { logo } from "~assets/icons";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { colors } from "~utils/base";
import { FormBtn } from "~components/Layout/DefaultLayout/Button";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import request from "~utils/request";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
    },
  },
}));

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (event) => {
    setLoading(true);
    const objLogin = {
      email: email,
      password: password,
    };
    await request
      .post("login", objLogin)
      .then(function (res) {
        localStorage.setItem("token", res.data.token);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Đăng nhập thất bại",
          text: "Email hoặc mật khẩu không chính xác.",
          width: "50rem",
          confirmButtonColor: colors.primary_900,
        });
      })
      .then(function () {
        setLoading(false);
      });
  };

  const enterPress = (e) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", enterPress);
    return () => document.removeEventListener("keydown", enterPress);
  });

  return (
    <div className={classes["container"]}>
      <div className={classes["bg"]} />
      <img src={logo} alt="Logo" className={classes["logo"]} />
      <div className={classes["form-container"]}>
        <div className={classes["textField"]}>
          <CssTextField
            defaultValue={email}
            variant="outlined"
            label={"Email"}
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
            focusColor={colors.primary_900}
          />
        </div>
        <div className={classes["textField"]}>
          <CssTextField
            defaultValue={password}
            variant="outlined"
            label={"Mật khẫu"}
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            focusColor={colors.primary_900}
          />
        </div>
        <FormBtn
          title="Đăng nhập"
          color="white"
          containerStyle={{ width: "100%", height: 50 }}
          textStyle={{ color: "white", fontSize: 18 }}
          onClick={handleConfirm}
        />
      </div>

      <Backdrop sx={{ color: colors.primary_900, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
