import classes from "./Login.module.scss";
import { logo } from "~assets/icons";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { colors } from "~utils/base";
import { FormBtn } from "~components/Layout/DefaultLayout/Button";
import { useState } from "react";

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
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div className={classes["container"]}>
      <div className={classes["bg"]} />
      <img src={logo} alt="Logo" className={classes["logo"]} />
      <div className={classes["form-container"]}>
        <div className={classes["textField"]}>
          <CssTextField
            defaultValue={username}
            variant="outlined"
            label={"Tài khoản"}
            fullWidth
            onChange={(event) => setUsername(event.target.value)}
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
        />
      </div>
    </div>
  );
}
