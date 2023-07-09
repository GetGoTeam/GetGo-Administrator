import classes from "./Button.module.scss";

function CreateAccountBtn() {
  return (
    <div className={classes["createAccountBtn"]}>
      <div className={classes["createAccountBtn__icon"]}>
        <i className="fa-solid fa-plus"></i>
      </div>
      <div className={classes["createAccountBtn__text"]}>THÊM TÀI KHOẢN</div>
    </div>
  );
}

export { CreateAccountBtn };
