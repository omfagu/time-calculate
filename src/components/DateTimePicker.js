import React, { useState } from "react";
import "./DateTimePicker.css";

const DateTimePicker = () => {
  const [firstDateTime, setFirstDateTime] = useState(new Date());

  const [secondHours, setSecondHours] = useState("00");

  const [secondMinutes, setSecondMinutes] = useState("00");

  const [secondSeconds, setSecondSeconds] = useState("00");

  const [result, setResult] = useState("");

  const handleFirstDateTimeChange = (e) => {
    setFirstDateTime(e.target.value);
  };

  const handleSecondHoursChange = (e) => {
    setSecondHours(e.target.value);
  };

  const handleSecondMinutesChange = (e) => {
    setSecondMinutes(e.target.value);
  };

  const handleSecondSecondsChange = (e) => {
    setSecondSeconds(e.target.value);
  };

  const calculateAdditionResult = () => {
    const firstDate = new Date(firstDateTime);

    const hours = parseInt(secondHours, 10);
    const minutes = parseInt(secondMinutes, 10);
    const seconds = parseInt(secondSeconds, 10);

    firstDate.setHours(firstDate.getHours() + hours);
    firstDate.setMinutes(firstDate.getMinutes() + minutes);
    firstDate.setSeconds(firstDate.getSeconds() + seconds);

    return firstDate.toLocaleString();
  };

  const calculateSubtractionResult = () => {
    const firstDate = new Date(firstDateTime);

    const hours = parseInt(secondHours, 10);
    const minutes = parseInt(secondMinutes, 10);
    const seconds = parseInt(secondSeconds, 10);

    firstDate.setHours(firstDate.getHours() - hours);
    firstDate.setMinutes(firstDate.getMinutes() - minutes);
    firstDate.setSeconds(firstDate.getSeconds() - seconds);

    return firstDate.toLocaleString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const additionResult = calculateAdditionResult();
    const subtractionResult = calculateSubtractionResult();
    setResult({ additionResult, subtractionResult });
  };

  return (
    <div className="date-time-picker">
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-datetime">İlk Tarih ve Saat Seçin: </label>
        <input
          type="datetime-local"
          id="first-datetime"
          name="first-datetime"
          value={firstDateTime}
          onChange={handleFirstDateTimeChange}
          step="1"
        />

        <label htmlFor="second-time">Saat, Dakika ve Saniye Seçin: </label>
        <div className="second-time-inputs">
          <input
            type="number"
            id="second-hours"
            name="second-hours"
            value={secondHours}
            onChange={handleSecondHoursChange}
            min="0"
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

        <button class="button" type="submit">
          Hesapla
        </button>
      </form>

      {result && (
        <div>
          <p>Toplama Sonucu: {result.additionResult}</p>
          <p>Çıkarma Sonucu: {result.subtractionResult}</p>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
