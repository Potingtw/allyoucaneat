import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../../styles/finance.css";

const SemiChart = () => {
  const [indexPrice, setIndexPrice] = useState([]);
  const [indexDate, setIndexDate] = useState([]);
  const [color, setColor] = useState();
  const [yrange, setYrange] = useState();
  const [persentage, setPersentage] = useState();
  const [rotate, setRotate] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9453/semi", {});
        // setStockData(res.data); // 將後端回傳的資料存入 stockData 狀態中
        // console.log(res.data);
        //價錢
        const Prices = res.data.indicators.adjclose[0].adjclose;
        // console.log(Prices)
        const FirstPrice = parseFloat(Prices[0]);
        const LastPrice = parseFloat(Prices[Prices.length - 1]);
        const grow = LastPrice - FirstPrice;
        const color = grow >= 0 ? "#f17064" : "#77BE6B";
        //漲幅百分比
        const persentage = (
          ((LastPrice - FirstPrice) / FirstPrice) *
          100
        ).toFixed(2);
        setPersentage(persentage);
        //旋轉箭頭
        const rotate = grow >= 0 ? "rotate(360deg)" : "rotate(180deg)";
        setRotate(rotate);
        // console.log(persentage)
        setColor(color);
        setYrange(FirstPrice);
        // console.log(color)

        // console.log(FirstPrice,LastPrice,grow)
        //日期
        const Dates = res.data.timestamp;
        // console.log("這是DATE回傳的陣列", Dates);

        const myIndexDate = Dates.map((time) => {
          const date = new Date(time * 1000);
          return date.toDateString().slice(4, 10);
        });
        // console.log(myIndexDate)
        setIndexDate(myIndexDate);

        //價錢
        const myIndexPrice = Prices
        .filter((price) => price !== null) // 過濾掉 null 值
        .map((price) => {
          // 取到小數第二位
          return price.toFixed(2);
          // console.log(price);
          // return price;
        });
        // console.log(myIndexPrice)
        setIndexPrice(myIndexPrice);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {},
    },
    series: [
      {
        name: "00878",
        data: indexPrice,
      },
    ],
    xaxis: {
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
      },
      categories: indexDate,
      tickAmount: 10,
    },

    fill: {
      colors: color,
    },
    stroke: {
      curve: "smooth",
      colors: color,
      width: 5,
    },
    yaxis: {
      labels: {
        show: true,
      },
      min: yrange - yrange * 0.1,
      max: yrange + yrange * 0.4,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div
      className="container-fluid mt-3 mb-3 alltag
    "
    >
      <div>

      
        <div  className={`d-flex flex-column eft-tooltip ${showTooltip ? "visible" : "hidden"}`}>
          {/* <h2 className="text-center">測試</h2> */}
          <div className="d-flex  p-2 ">
            <p className="toolbartitle">近三個月漲幅</p>
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="white"
              width={30}
              height={30}
              fill="currentColor"
              className="bi bi-arrow-up"
              viewBox="0 0 16 16"
              style={{ transform: rotate }}
            >
              <path
                fillRule="evenodd"
                color={color}
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
            <h4 style={{ color: color }}>{persentage}%</h4>
          </div>
          <div className="p-1 etf-dis2">

          00878國泰永續高股息是一支台灣股市上市的股票基金，由國泰證券管理，該基金的主要投資策略是追踪台灣高股息公司，並著重於穩健的盈利能力和高股息支付。投資者可以透過交易所買賣這支基金，享受穩定的長期收益和股息分紅，但投資也涉及風險，建議在進行投資前諮詢專業的金融顧問。          </div>
        </div>
        <div className="container-2">
          <button className="stockname etfbutton" onClick={toggleTooltip} style={{color:"white",fontSize:28,backgroundColor:color}}
          >00878國泰永續高股息</button>
          <Chart
            options={options}
            series={options.series}
            type="area"
            width={500}
            height={340}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default SemiChart;