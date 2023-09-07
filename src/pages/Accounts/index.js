import React, { useState, useMemo, useEffect } from "react";
import classes from "./accounts.module.scss";
import Filter from "~components/Layout/DefaultLayout/Filter/index";
import { CreateAccountBtn, CustomizeBtn } from "~components/Layout/DefaultLayout/Button";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import { ic_view, ic_edit } from "~assets/icons";
import CreateAccountForm from "~components/Layout/DefaultLayout/Form/CreateAccountForm";
import BackDrop from "~components/Layout/DefaultLayout/BackDrop";
import { faLock, faLockOpen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import request from "~utils/request";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "~utils/base";
import Swal from "sweetalert2";

const customizeOptions = [
  { icon: faLockOpen, title: "Mở khóa" },
  { icon: faLock, title: "Khóa" },
  { icon: faTrashCan, title: "Xóa" },
];

function Accounts() {
  const [checkAll, setCheckAll] = useState(false);
  const [createAccountForm, setCreateAccountForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = JSON.stringify(localStorage.getItem("tokenAdmin")).split('"').join("");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [customers, setCustomers] = useState([]);
  const [customersLength, setCustomersLength] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const [driversLength, setDriversLength] = useState(0);
  const [hotlines, setHotlines] = useState([]);
  const [hotlinesLength, setHotlinesLength] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("customer");

  useEffect(() => {
    currentData.forEach((element) => {
      if (element.isChecked === false) {
        setCheckAll(false);
        return;
      }
      setCheckAll(true);
    });
  }, [currentData]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // Get customers
      try {
        await request
          .get("get-all/customer", { headers: headers })
          .then(function (res) {
            const data = res.data;
            setCustomers(data);
            setCustomersLength(data.length);
            setCurrentData(data.map((item) => ({ ...item, isChecked: false })));
          })
          .catch(function (error) {
            console.log("Get customers error: ", error);
          });

        // Get drivers
        await request
          .get("get-all/driver", { headers: headers })
          .then(function (res) {
            const data = res.data;
            setDrivers(data);
            setDriversLength(data.length);
          })
          .catch(function (error) {
            console.log("Get drivers error: ", error);
          });

        // Get hotlines
        await request
          .get("get-all/hotline", { headers: headers })
          .then(function (res) {
            const data = res.data;
            setHotlines(data);
            setHotlinesLength(data.length);
          })
          .catch(function (error) {
            console.log("Get hotlines error: ", error);
          });
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filters = [
    {
      title: "Khách hàng",
      color: "#0094e8",
      icon: <i className="fa-regular fa-user"></i>,
      quantity: customersLength,
    },
    {
      title: "Tài xế",
      color: "#00E878",
      icon: <i className="fa-solid fa-car"></i>,
      quantity: driversLength,
    },
    {
      title: "Tổng đài",
      color: "#E8A700",
      icon: <i className="fa-solid fa-headset"></i>,
      quantity: hotlinesLength,
    },
  ];

  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return currentData.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage, currentData]);

  async function updateAccountStatus(status) {
    try {
      setLoading(true);
      currentData.forEach(async (element) => {
        if (element.isChecked) {
          const body = {
            id: element._id,
            blocked: status,
          };
          await request.patch(`update-status/${currentFilter}`, body, { headers: headers }).catch(function (error) {
            console.log("Update account status error: ", error);
          });
        }
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Tài khoản</h1>
      <div className={classes["filter-container"]}>
        {filters.map((item, index) => (
          <Filter
            key={index}
            title={item.title}
            icon={item.icon}
            color={item.color}
            quantity={item.quantity}
            onClick={() => {
              if (index === 0) {
                setCurrentData(customers.map((item) => ({ ...item, isChecked: false })));
                setCurrentFilter("customer");
              } else if (index === 1) {
                setCurrentData(drivers.map((item) => ({ ...item, isChecked: false })));
                setCurrentFilter("driver");
              } else {
                setCurrentData(hotlines.map((item) => ({ ...item, isChecked: false })));
                setCurrentFilter("hotline");
              }
            }}
          />
        ))}
      </div>
      <div className={classes["createAccountBtn-container"]}>
        <div
          onClick={() => {
            setCreateAccountForm(true);
          }}
        >
          <CreateAccountBtn />
        </div>
      </div>
      <div className={classes["customize-container"]}>
        <div className={classes["customize-container-left"]}>
          <div className={classes["customize-container-left-filter"]}>
            <input type="text" name="filter" id="" placeholder="Tìm kiếm" />
          </div>
          <div className={classes["customize-container-left-select"]}>
            <input
              type="checkbox"
              checked={checkAll}
              onChange={(e) => {
                setCheckAll(e.target.checked);
                setCurrentData(currentData.map((item) => ({ ...item, isChecked: e.target.checked })));
              }}
            />
            <p>Chọn tất cả</p>
          </div>
        </div>
        <div className={classes["customize-container-right"]}>
          {customizeOptions.map((item, index) => (
            <CustomizeBtn
              key={index}
              iconBtn={item.icon}
              titleBtn={item.title}
              onClick={() => {
                if (index === 0) {
                  Swal.fire({
                    title: "Xác nhận mở khóa tài khoản?",
                    showCancelButton: true,
                    cancelButtonText: `Hủy`,
                    confirmButtonText: "OK",
                    confirmButtonColor: colors.primary_900,
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      updateAccountStatus(false);
                      window.location.reload(false);
                    }
                  });
                } else if (index === 1) {
                  Swal.fire({
                    title: "Xác nhận khóa tài khoản?",
                    showCancelButton: true,
                    cancelButtonText: `Hủy`,
                    confirmButtonText: "OK",
                    confirmButtonColor: colors.primary_900,
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      updateAccountStatus(true);
                      window.location.reload(false);
                    }
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className={classes["table-container"]}>
        <div className={classes["table-container-title"]}>
          <div className={`${classes["table-container-checkbox"]}`} />
          <div className={`${classes["table-container-no"]} ${classes["title"]}`}>STT</div>
          <div className={`${classes["table-container-name"]} ${classes["title"]}`}>Họ và Tên</div>
          <div className={`${classes["table-container-dob"]} ${classes["title"]}`}>Ngày Sinh</div>
          <div className={`${classes["table-container-phone"]} ${classes["title"]}`}>Số Điện Thoại</div>
          <div className={`${classes["table-container-account"]} ${classes["title"]}`}>Loại Tài Khoản</div>
          <div className={`${classes["table-container-status"]} ${classes["title"]}`}>Trạng Thái</div>
          <div className={`${classes["table-container-tools"]}`} />
        </div>
        <div className={classes["table-container-content"]}>
          {currentTableData.map((item, index) => (
            <div key={index} className={classes["table-container-content-item"]}>
              <div className={`${classes["table-container-checkbox"]} ${classes["item"]}`}>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={(e) => {
                    setCurrentData(
                      currentData.map((x) => (x._id === item._id ? { ...x, isChecked: e.target.checked } : { ...x }))
                    );
                  }}
                />
              </div>
              <div className={`${classes["table-container-no"]} ${classes["item"]}`}>
                {pageSize * (currentPage - 1) + index + 1}
              </div>
              <div className={`${classes["table-container-name"]} ${classes["item"]}`}>{item.username}</div>
              <div className={`${classes["table-container-dob"]} ${classes["item"]}`}>{item.dob}</div>
              <div className={`${classes["table-container-phone"]} ${classes["item"]}`}>{item.phone}</div>
              <div className={`${classes["table-container-account"]} ${classes["item"]}`}>{item.role}</div>
              <div
                className={`${classes["table-container-status"]} ${classes["item"]} ${
                  classes[`item-status${item.blocked ? "-blocked" : ""}`]
                }`}
              >
                {item.blocked ? "Bị khóa" : "Bình thường"}
              </div>
              <div className={`${classes["table-container-tools"]} ${classes["item"]}`}>
                <div className={classes["btn-customize"]}>
                  <img src={ic_edit} alt="none" />
                </div>
                <div className={classes["btn-customize"]}>
                  <img src={ic_view} alt="none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes["pagination-bar-container"]}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={currentData.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <BackDrop
        status={createAccountForm}
        component={<CreateAccountForm setCreateAccountForm={setCreateAccountForm} />}
      />

      <Backdrop sx={{ color: colors.primary_900, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Accounts;
