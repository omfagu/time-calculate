import React, { useState } from "react";
import "./TimeCalculator.css";

const TimeCalculator = () => {
  const [firstHour, setFirstHour] = useState("00");
  const [firstMinute, setFirstMinute] = useState("00");
  const [firstSecond, setFirstSecond] = useState("00");

  const [secondHour, setSecondHour] = useState("00");
  const [secondMinute, setSecondMinute] = useState("00");
  const [secondSecond, setSecondSecond] = useState("00");

  const [result, setResult] = useState("");

  const handleInputChange = (e, stateSetter, maxValue) => {
    let value = e.target.value;

    // Baştaki sıfırları otomatik olarak kaldır
    value = value.replace(/^0+/, "");

    if (
      /^\d+$/.test(value) &&
      parseInt(value) >= 0 &&
      parseInt(value) <= maxValue
    ) {
      stateSetter(value.padStart(2, "0"));
    } else {
      stateSetter("00");
    }
  };

  const calculateAdditionResult = () => {
    const firstHourInt = parseInt(firstHour, 10);
    const firstMinuteInt = parseInt(firstMinute, 10);
    const firstSecondInt = parseInt(firstSecond, 10);

    const secondHourInt = parseInt(secondHour, 10);
    const secondMinuteInt = parseInt(secondMinute, 10);
    const secondSecondInt = parseInt(secondSecond, 10);

    const totalHour = firstHourInt + secondHourInt;
    const totalMinute = firstMinuteInt + secondMinuteInt;
    const totalSecond = firstSecondInt + secondSecondInt;

    const carryMinute = Math.floor(totalSecond / 60);
    const carryHour = Math.floor((totalMinute + carryMinute) / 60);

    return `${totalHour + carryHour} saat ${totalMinute + carryMinute} dakika ${
      totalSecond % 60
    } saniye`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const additionResult = calculateAdditionResult();
    setResult(additionResult);
  };

  return (
    <div className="time-calculator">
      <h2>SAAT TOPLA</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-hour">Birinci Saat: </label>
        <div className="time-input">
          <input
            type="number"
            id="first-hour-input"
            name="first-hour"
            value={firstHour}
            onChange={(e) => handleInputChange(e, setFirstHour, 99)}
            min="0"
            max="99"
          />
          <span> : </span>

          <input
            type="number"
            id="first-minute-input"
            name="first-minute"
            value={firstMinute}
            onChange={(e) => handleInputChange(e, setFirstMinute, 59)}
            min="0"
            max="59"
          />
          <span> : </span>
          <input
            type="number"
            id="first-second-input"
            name="first-second"
            value={firstSecond}
            onChange={(e) => handleInputChange(e, setFirstSecond, 59)}
            min="0"
            max="59"
          />
        </div>
        <label htmlFor="second-hour-input">İkinci Saat: </label>
        <div className="time-input">
          <input
            type="number"
            id="second-hour-input"
            name="second-hour"
            value={secondHour}
            onChange={(e) => handleInputChange(e, setSecondHour, 99)}
            min="0"
            max="99"
          />
          <span> : </span>
          <input
            type="number"
            id="second-minute-input"
            name="second-minute"
            value={secondMinute}
            onChange={(e) => handleInputChange(e, setSecondMinute, 59)}
            min="0"
            max="59"
          />
          <span> : </span>
          <input
            type="number"
            id="second-second-input"
            name="second-second"
            value={secondSecond}
            onChange={(e) => handleInputChange(e, setSecondSecond, 59)}
            min="0"
            max="59"
          />
        </div>
        <button className="calculate-btn">
          <span>Hesapla</span>
        </button>
      </form>
      {result && (
        <div className="result">
          <p>Toplama Sonucu: {result}</p>
        </div>
      )}
    </div>
  );
};

export default TimeCalculator;
