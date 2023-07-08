import classes from "./Sidebar.module.scss";
import SidebarItem from "./SidebarItem";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const items = [
  { title: "Thống kê", icon: <i className="fa-solid fa-chart-line"></i>, href: "/" },
  { title: "Tài khoản", icon: <i className="fa-solid fa-user"></i>, href: "/accounts" },
  { title: "Đơn hàng", icon: <i className="fa-solid fa-car-side"></i>, href: "/trips" },
  { title: "Báo cáo", icon: <i className="fa-solid fa-flag"></i>, href: "/reports" },
];

function Sidebar(props) {
  const { active_index } = props;

  return (
    <div className={classes["sidebar"]}>
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          title={item.title}
          icon={item.icon}
          href={item.href}
          active={active_index === index ? true : false}
        ></SidebarItem>
      ))}
    </div>
  );
}

export default Sidebar;
