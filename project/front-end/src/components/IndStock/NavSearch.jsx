import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { StockContext } from "../../../context/StockContext";
import axios from "axios";

let peRatio = "";

const NavSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [redirectToIndStock, setRedirectToIndStock] = useState(false);
  const { setStockInfo } = useContext(StockContext);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputSubmit = (e) => {
    e.preventDefault();
    // console.log(inputValue);
    if (inputValue !== "") {
      axios
        .post("http://localhost:5678/stock2", { data: inputValue })
        .then((res) => {
          setRedirectToIndStock(true);
          const mypeRatio = res.data.indexTrend.pegRatio.fmt; //震幅
          console.log(mypeRatio);
          peRatio = mypeRatio;
        });
      axios
        .post("http://localhost:5678/stock", { data: inputValue })
        .then((res) => {
          setRedirectToIndStock(true);
          // console.log(res.data);
          const shortname = res.data.price.shortName;
          // const website = res.data.summaryProfile.website;
          const regularMarketOpen = res.data.price.regularMarketOpen.fmt; // 開盤
          const regularMarketDayHigh = res.data.price.regularMarketDayHigh.fmt; // 最高
          const regularMarketDayLow = res.data.price.regularMarketDayLow.fmt; // 最低
          const regularMarketPrice = res.data.price.regularMarketPrice.fmt; // 現價
          const regularMarketVolume = res.data.price.regularMarketVolume.fmt; // 成交金額（億）
          const regularMarketPreviousClose =
            res.data.price.regularMarketPreviousClose.fmt; // 昨收
          const averageDailyVolume3Month =
            res.data.price.averageDailyVolume3Month.longFmt;
          const averageDailyVolume10Day =
            res.data.price.averageDailyVolume10Day.longFmt;
          const regularMarketChangePercent =
            res.data.price.regularMarketChangePercent.fmt; // 漲跌幅
          const regularMarketChange = res.data.price.regularMarketChange.fmt; // 漲跌
          const marketCap = res.data.price.marketCap.fmt;
          setStockInfo({
            inputValue,
            shortname,
            website,
            regularMarketOpen,
            regularMarketDayHigh,
            regularMarketDayLow,
            regularMarketPrice,
            regularMarketVolume,
            regularMarketPreviousClose,
            averageDailyVolume3Month,
            averageDailyVolume10Day,
            regularMarketChangePercent,
            regularMarketChange,
            peRatio,
            marketCap,
          });
        })
        .catch((err) => {
          console.log("stock傳送失敗");
          console.log(err);
        });
    } else {
      alert("請輸入股票代碼");
    }
  };

  if (redirectToIndStock) {
    return <Navigate to="/indStock" />;
  }

  return (
    <form id="navSearch" onSubmit={handleInputSubmit}>
      <input
        type="text"
        className="search__input px-3"
        placeholder="搜尋台股代號"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="search__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 15 15"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </form>
  );
};

export default NavSearch;
