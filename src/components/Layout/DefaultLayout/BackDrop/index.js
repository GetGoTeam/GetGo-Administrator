import classes from "./BackDrop.module.scss";

function BackDrop(props) {
  return (
    <div
      className={`${classes["backdrop"]} ${props.status ? classes["backdrop--enable"] : classes["backdrop--disable"]}`}
    >
      {props.component}
    </div>
  );
}

export default BackDrop;
