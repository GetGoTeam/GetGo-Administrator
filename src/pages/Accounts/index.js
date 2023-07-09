import classes from "./accounts.module.scss";
import Filter from "../../components/Layout/DefaultLayout/Filter/index";
import { CreateAccountBtn } from "../../components/Layout/DefaultLayout/Button";

const filters = [
  {
    title: "Khách hàng",
    color: "#0094e8",
    icon: <i className="fa-regular fa-user"></i>,
    quantity: 100,
  },
  {
    title: "Tài xế",
    color: "#00E878",
    icon: <i className="fa-solid fa-car"></i>,
    quantity: 100,
  },
  {
    title: "Tổng đài",
    color: "#E8A700",
    icon: <i className="fa-solid fa-headset"></i>,
    quantity: 100,
  },
];

function Accounts() {
  return (
    <>
      <h1>Tài khoản</h1>
      <div className={classes["filter-container"]}>
        {filters.map((item, index) => (
          <Filter key={index} title={item.title} icon={item.icon} color={item.color} quantity={item.quantity}></Filter>
        ))}
      </div>
      <div className={classes["createAccountBtn-container"]}>
        <CreateAccountBtn />
      </div>
    </>
  );
}

export default Accounts;
