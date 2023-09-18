import React, { useState } from "react";
import "./DateTimePicker.css";

const DateTimePicker = () => {
  const [firstDate, setFirstDate] = useState("2023-09-11");
  const [firstHour, setFirstHour] = useState("00");
  const [firstMinute, setFirstMinute] = useState("00");
  const [firstSecond, setFirstSecond] = useState("00");

  const [secondHours, setSecondHours] = useState("00");
  const [secondMinutes, setSecondMinutes] = useState("00");
  const [secondSeconds, setSecondSeconds] = useState("00");

  const [result, setResult] = useState({
    additionResult: "",
    subtractionResult: "",
  });

  const handleFirstDateChange = (e) => {
    setFirstDate(e.target.value);
  };

  // Input değerlerini düzenleyen fonksiyon
  const handleInputChange = (e, stateSetter) => {
    const value = e.target.value;
    if (value.length === 1 && /^\d$/.test(value)) {
      stateSetter(`0${value}`);
    } else if (value.length === 2 && /^\d\d$/.test(value)) {
      stateSetter(value);
    } else if (value.length === 3 && /^\d\d\d$/.test(value)) {
      stateSetter(value.substring(1));
    } else {
      stateSetter("");
    }
  };

  const handleFirstHourChange = (e) => {
    handleInputChange(e, setFirstHour);
  };

  const handleFirstMinuteChange = (e) => {
    handleInputChange(e, setFirstMinute);
  };

  const handleFirstSecondChange = (e) => {
    handleInputChange(e, setFirstSecond);
  };

  const handleSecondHoursChange = (e) => {
    handleInputChange(e, setSecondHours);
  };

  const handleSecondMinutesChange = (e) => {
    handleInputChange(e, setSecondMinutes);
  };

  const handleSecondSecondsChange = (e) => {
    handleInputChange(e, setSecondSeconds);
  };

  const calculateAdditionResult = () => {
    const firstDateTime = new Date(
      `${firstDate}T${firstHour}:${firstMinute}:${firstSecond}`
    );
    const hours = parseInt(secondHours, 10);
    const minutes = parseInt(secondMinutes, 10);
    const seconds = parseInt(secondSeconds, 10);

    if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
      firstDateTime.setHours(firstDateTime.getHours() + hours);
      firstDateTime.setMinutes(firstDateTime.getMinutes() + minutes);
      firstDateTime.setSeconds(firstDateTime.getSeconds() + seconds);

      const year = firstDateTime.getFullYear();
      const month = String(firstDateTime.getMonth() + 1).padStart(2, "0");
      const day = String(firstDateTime.getDate()).padStart(2, "0");
      const hoursStr = String(firstDateTime.getHours()).padStart(2, "0");
      const minutesStr = String(firstDateTime.getMinutes()).padStart(2, "0");
      const secondsStr = String(firstDateTime.getSeconds()).padStart(2, "0");

      return `${day}-${month}-${year} ${hoursStr}:${minutesStr}:${secondsStr}`;
    } else {
      return "";
    }
  };

  const calculateSubtractionResult = () => {
    const firstDateTime = new Date(
      `${firstDate}T${firstHour}:${firstMinute}:${firstSecond}`
    );
    const hours = parseInt(secondHours, 10);
    const minutes = parseInt(secondMinutes, 10);
    const seconds = parseInt(secondSeconds, 10);

    if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
      firstDateTime.setHours(firstDateTime.getHours() - hours);
      firstDateTime.setMinutes(firstDateTime.getMinutes() - minutes);
      firstDateTime.setSeconds(firstDateTime.getSeconds() - seconds);

      const year = firstDateTime.getFullYear();
      const month = String(firstDateTime.getMonth() + 1).padStart(2, "0");
      const day = String(firstDateTime.getDate()).padStart(2, "0");
      const hoursStr = String(firstDateTime.getHours()).padStart(2, "0");
      const minutesStr = String(firstDateTime.getMinutes()).padStart(2, "0");
      const secondsStr = String(firstDateTime.getSeconds()).padStart(2, "0");

      return `${day}-${month}-${year} ${hoursStr}:${minutesStr}:${secondsStr}`;
    } else {
      return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const additionResult = calculateAdditionResult();
    const subtractionResult = calculateSubtractionResult();
    setResult({ additionResult, subtractionResult });
  };

  return (
    <div className="date-time-picker">
      <h2>TARİH VE SAAT TOPLA</h2>
      <form onSubmit={handleSubmit}>
        <div className="datetime-input">
          <label htmlFor="first-date">Tarih Seçin: </label>
          <input
            type="date"
            id="first-date"
            name="first-date"
            value={firstDate}
            onChange={handleFirstDateChange}
          />

          <label htmlFor="first-hour">Saat Seçin (Saat-Dakika-Saniye): </label>
          <div className="first-time">
            {" "}
            <input
              type="number"
              id="first-hour"
              name="first-hour"
              value={firstHour}
              onChange={handleFirstHourChange}
              min="0"
              max="23"
            />
            <span> : </span>
            <input
              type="number"
              id="first-minute"
              name="first-minute"
              value={firstMinute}
              onChange={handleFirstMinuteChange}
              min="0"
              max="59"
            />{" "}
            <span> : </span>
            <input
              type="number"
              id="first-second"
              name="first-second"
              value={firstSecond}
              onChange={handleFirstSecondChange}
              min="0"
              max="59"
            />
          </div>
        </div>
        <label htmlFor="second-hours">Eklemek İstediğiniz Saati Seçin: </label>
        <div className="time-input">
          <input
            type="number"
            id="second-hours"
            name="second-hours"
            value={secondHours}
            onChange={handleSecondHoursChange}
            min="0"
            max="23"
          />
          <span> : </span>
          <input
            type="number"
            id="second-minutes"
            name="second-minutes"
            value={secondMinutes}
            onChange={handleSecondMinutesChange}
            min="0"
            max="59"
          />
          <span> : </span>
          <input
            type="number"
            id="second-seconds"
            name="second-seconds"
            value={secondSeconds}
            onChange={handleSecondSecondsChange}
            min="0"
            max="59"
          />
        </div>
        <button class="button">HESAPLA</button>
      </form>

      {result && (
        <div className="result">
          <p>Toplama Sonucu: {result.additionResult}</p>
          <p>Çıkarma Sonucu: {result.subtractionResult}</p>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
