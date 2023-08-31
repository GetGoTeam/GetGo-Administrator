import classes from "./CreateAccountForm.module.scss";
import { FormBtn } from "~components/Layout/DefaultLayout/Button";

function CreateAccountForm(props) {
  return (
    <div className={classes["form-container"]}>
      <div className={classes["header"]}>
        <div className={classes["title"]}>Thêm tài khoản</div>
        <div
          className={classes["close"]}
          onClick={() => {
            props.setCreateAccountForm(false);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className={classes["body"]}>
        <div className={classes["item-container"]}>
          <div className={classes["text"]}>Loại tài khoản</div>
          <select className={classes["selector"]}>
            <option value="0">Tổng đài</option>
            <option value="1">Khách hàng</option>
            <option value="2">Tài xế</option>
          </select>
        </div>
        <div className={classes["item-container"]}>
          <div className={classes["text"]}>Tài khoản</div>
          <input className={classes["input"]}></input>
        </div>
        <div className={classes["item-container"]}>
          <div className={classes["text"]}>Mật khẩu</div>
          <input className={classes["input"]}></input>
        </div>
        <div className={classes["item-container"]}>
          <div className={classes["text"]}>Xác nhận mật khẩu</div>
          <input className={classes["input"]}></input>
        </div>
        <div className={classes["btn-container"]}>
          <FormBtn
            title="Thêm tài khoản"
            icon={<i className="fa-solid fa-plus"></i>}
            color="white"
            containerStyle={{ width: "100%", height: 50 }}
            textStyle={{ color: "white", fontSize: 18 }}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateAccountForm;
