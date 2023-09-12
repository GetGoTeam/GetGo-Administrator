import classes from "./Option.module.scss";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { colors, text } from "~utils/base";
import { IconBtn } from "~components/Layout/DefaultLayout/Button";
import { faPen, faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import request from "~utils/request";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
    },
  },
}));

function Option() {
  const [editMode, setEditMode] = useState(false);
  const token = JSON.stringify(localStorage.getItem("tokenAdmin")).split('"').join("");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [loading, setLoading] = useState(false);
  const [redis, setRedis] = useState([
    {
      name: "bike_basePrice",
      value: null,
    },
    {
      name: "car_basePrice",
      value: null,
    },
    {
      name: "van_basePrice",
      value: null,
    },
    {
      name: "bike_upTo10Km",
      value: null,
    },
    {
      name: "bike_after10Km",
      value: null,
    },
    {
      name: "car_upTo10Km",
      value: null,
    },
    {
      name: "car_after10Km",
      value: null,
    },
    {
      name: "van_upTo10Km",
      value: null,
    },
    {
      name: "van_after10Km",
      value: null,
    },
    {
      name: "startTimePeakHour",
      value: null,
    },
    {
      name: "endTimePeakHour",
      value: null,
    },
    {
      name: "surchargeIndexLevel1",
      value: null,
    },
    {
      name: "surchargeIndexLevel2",
      value: null,
    },
  ]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await request
        .get("get-redis-calculate-trip", { headers: headers })
        .then(function (res) {
          const data = res.data;
          setRedis([
            {
              name: "bike_basePrice",
              value: data.basePricesRedis["1"],
            },
            {
              name: "car_basePrice",
              value: data.basePricesRedis["4"],
            },
            {
              name: "van_basePrice",
              value: data.basePricesRedis["7"],
            },
            {
              name: "bike_upTo10Km",
              value: data.pricePerKilometerRedis["1"].upTo10Km,
            },
            {
              name: "bike_after10Km",
              value: data.pricePerKilometerRedis["1"].after10Km,
            },
            {
              name: "car_upTo10Km",
              value: data.pricePerKilometerRedis["4"].upTo10Km,
            },
            {
              name: "car_after10Km",
              value: data.pricePerKilometerRedis["4"].after10Km,
            },
            {
              name: "van_upTo10Km",
              value: data.pricePerKilometerRedis["7"].upTo10Km,
            },
            {
              name: "van_after10Km",
              value: data.pricePerKilometerRedis["7"].after10Km,
            },
            {
              name: "startTimePeakHour",
              value: data.startTimePeakHourRedis,
            },
            {
              name: "endTimePeakHour",
              value: data.endTimePeakHourRedis,
            },
            {
              name: "surchargeIndexLevel1",
              value: data.surchargeIndexLevel1Redis,
            },
            {
              name: "surchargeIndexLevel2",
              value: data.surchargeIndexLevel2Redis,
            },
          ]);
        })
        .catch(function (error) {
          console.log("Get redis error: ", error);
        })
        .finally(function () {
          setLoading(false);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const body = redis.reduce((result, item) => {
      result[item.name] = item.value;
      return result;
    }, {});
    await request
      .patch("update-redis-calculate-trip", body, { headers: headers })
      .then(function (res) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log("Patch redis error: ", error);
      })
      .finally(function () {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Giá trị nhập không hợp lệ.",
          width: "50rem",
          confirmButtonColor: colors.primary_900,
        });
      });
  };

  return (
    <>
      <div className={classes["titleContainer"]}>
        <h1 className={classes["title"]}>Cài đặt</h1>
        {editMode ? (
          <div className={classes["btnContainer"]}>
            <div className={classes["btn"]}>
              <IconBtn
                title="Hủy"
                iconLeft={faXmark}
                width={120}
                bgColor={text.color_400}
                onClick={() =>
                  Swal.fire({
                    title: "Các thay đổi sẽ không được lưu. Xác nhận hủy?",
                    showCancelButton: true,
                    cancelButtonText: `Hủy`,
                    confirmButtonText: "OK",
                    confirmButtonColor: colors.primary_900,
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setEditMode(false);
                      window.location.reload(false);
                    }
                  })
                }
              />
            </div>
            <div className={classes["btn"]}>
              <IconBtn
                title="Lưu"
                iconLeft={faFloppyDisk}
                width={120}
                onClick={() =>
                  Swal.fire({
                    title: "Xác nhận lưu?",
                    showCancelButton: true,
                    cancelButtonText: `Hủy`,
                    confirmButtonText: "OK",
                    confirmButtonColor: colors.primary_900,
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleSave();
                    }
                  })
                }
              />
            </div>
          </div>
        ) : (
          <IconBtn title="Chỉnh sửa" iconLeft={faPen} width={120} onClick={() => setEditMode(true)} />
        )}
      </div>
      {!loading && (
        <div className={classes["textFieldContainer"]}>
          {redis.map((item, index) => (
            <div className={classes["textField"]} key={index}>
              <CssTextField
                defaultValue={item.value}
                variant="outlined"
                label={item.name}
                fullWidth
                onChange={(event) =>
                  setRedis(
                    redis.map((x) =>
                      x.name === item.name ? { ...x, value: parseFloat(event.target.value) } : { ...x }
                    )
                  )
                }
                focusColor={colors.primary_900}
                size="small"
                disabled={!editMode}
              />
            </div>
          ))}
        </div>
      )}
      <Backdrop sx={{ color: colors.primary_900, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Option;
