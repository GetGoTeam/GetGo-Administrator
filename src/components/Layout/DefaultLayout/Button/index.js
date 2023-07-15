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

function CustomizeBtn(props) {
  const { iconBtn, titleBtn } = props;
  return (
    <div className={classes["customize-btn"]}>
      <div className={classes["customize-btn-icon"]}>
        <img src={iconBtn} alt="none" />
      </div>
      <div className={classes["customize-btn-title"]}>{titleBtn}</div>
    </div>
  );
}

function FormBtn(props) {
  const { icon, title, bgColor, color } = props;
  return (
    <div className={classes["form-btn"]} style={{ backgroundColor: bgColor }}>
      <div className={classes["form-btn-icon"]} style={{ color: color }}>
        {icon}
      </div>
      <div className={classes["form-btn-title"]} style={{ color: color }}>
        {title}
      </div>
    </div>
  );
}

export { CreateAccountBtn, CustomizeBtn, FormBtn };
