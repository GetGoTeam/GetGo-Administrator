import classes from "./BackDrop.module.scss";
import FadeInOut from "./FadeInOut";

function BackDrop(props) {
  return (
    <FadeInOut show={props.status} duration={300}>
      <div
        className={`${classes["backdrop"]} ${
          props.status ? classes["backdrop--enable"] : classes["backdrop--disable"]
        }`}
      >
        {props.component}
      </div>
    </FadeInOut>
  );
}

export default BackDrop;
