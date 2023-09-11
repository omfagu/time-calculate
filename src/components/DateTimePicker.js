import React, { useState } from "react";
import "./DateTimePicker.css";

const DateTimePicker = () => {
  // İlk input için state
  const [firstDateTime, setFirstDateTime] = useState(new Date());

  // İkinci input için saat state'i
  const [secondHours, setSecondHours] = useState("00");

  // İkinci input için dakika state'i
  const [secondMinutes, setSecondMinutes] = useState("00");

  // İkinci input için saniye state'i
  const [secondSeconds, setSecondSeconds] = useState("00");

  // Sonucu saklayacak state
  const [result, setResult] = useState("");

  // İlk inputun değişimini ele alacak fonksiyon
  const handleFirstDateTimeChange = (e) => {
    setFirstDateTime(e.target.value);
  };

  // İkinci input için saat değişimini ele alacak fonksiyon
  const handleSecondHoursChange = (e) => {
    setSecondHours(e.target.value);
  };

  // İkinci input için dakika değişimini ele alacak fonksiyon
  const handleSecondMinutesChange = (e) => {
    setSecondMinutes(e.target.value);
  };

  // İkinci input için saniye değişimini ele alacak fonksiyon
  const handleSecondSecondsChange = (e) => {
    setSecondSeconds(e.target.value);
  };

  // İki tarihi toplayarak sonucu hesaplayan fonksiyon
  const calculateAdditionResult = () => {
    // İlk tarihi bir JavaScript Date nesnesine çevirin
    const firstDate = new Date(firstDateTime);

    // İkinci tarihi alın
    const hours = parseInt(secondHours, 10);
    const minutes = parseInt(secondMinutes, 10);
    const seconds = parseInt(secondSeconds, 10);

    // İlk tarihin saatini, dakikasını ve saniyesini güncelleyin
    firstDate.setHours(firstDate.getHours() + hours);
    firstDate.setMinutes(firstDate.getMinutes() + minutes);
    firstDate.setSeconds(firstDate.getSeconds() + seconds);

    // Sonucu döndürün
    return firstDate.toLocaleString();
  };

  // İki tarihi çıkararak sonucu hesaplayan fonksiyon
  const calculateSubtractionResult = () => {
    // İlk tarihi bir JavaScript Date nesnesine çevirin
    const firstDate = new Date(firstDateTime);

    // İkinci tarihi alın
    const hours = parseInt(secondHours, 10);
    const minutes = parseInt(secondMinutes, 10);
    const seconds = parseInt(secondSeconds, 10);

    // İlk tarihin saatini, dakikasını ve saniyesini güncelleyin
    firstDate.setHours(firstDate.getHours() - hours);
    firstDate.setMinutes(firstDate.getMinutes() - minutes);
    firstDate.setSeconds(firstDate.getSeconds() - seconds);

    // Sonucu döndürün
    return firstDate.toLocaleString();
  };

  // Form submit edildiğinde sonuçları hesaplayan fonksiyon
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

        <button type="submit">Hesapla</button>
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
