import classes from "./Filter.module.scss";

function hexToRgb(hex) {
  // Xóa ký tự "#" nếu có
  hex = hex.replace("#", "");

  // Chuyển đổi mã hex thành giá trị RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Trả về kết quả dưới dạng chuỗi mã màu RGB
  return `${r}, ${g}, ${b}`;
}

function Filter(props) {
  const { title, icon, quantity, color } = props;
  const alpha = 0.5;

  return (
    <div
      className={classes["rectangle"]}
      style={{ backgroundImage: `linear-gradient(to right, rgba(${hexToRgb(color)}, ${alpha}), ${color})` }}
    >
      <div className={classes["title"]}>{title}</div>
      <div className={classes["quantity-container"]}>
        <div className={classes["icon"]}>{icon}</div>
        <div className={classes["quantity"]}>{quantity}</div>
      </div>
      <div className={classes["circle1"]}></div>
      <div className={classes["circle2"]}></div>
    </div>
  );
}

export default Filter;
