import classes from "./sidebarItem.module.scss";

const SidebarItem = (props) => {
  const { title, icon, href, active } = props;

  return (
    <div className={classes["item__border"]}>
      <a className={`${classes["item"]} ${active ? classes["item--active"] : ""}`} href={href}>
        <div className={classes["item__icon"]}>{icon}</div>
        <div className={classes["item__title"]}>{title}</div>
      </a>
    </div>
  );
};

export default SidebarItem;
