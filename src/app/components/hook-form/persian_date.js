import React from "react";
// import DatePicker from "react-datepicker2";
import moment from "moment";
import momentJalaali from "moment-jalaali";

momentJalaali.loadPersian({ dialect: "persian-modern" });

const PersianDatePicker = () => {
  const datePickerOnchange = (date) => {
    const newTimeStamp = new Date(moment(date).format("YYYY/M/D")).getTime();
    if (newTimeStamp.toString() !== "NaN") {
      onChange(newTimeStamp);
    }
  };
  return (
    <div className="datePickerContainer">
      {/* <DatePicker
        isGregorian={false}
        // onChange={(pickedValue) => datePickerOnchange(pickedValue)}
        value={momentJalaali()}
        timePicker={false}
        // min={handledMin}
        // max={handledMax}
      /> */}
    </div>
  );
};

export default PersianDatePicker;
