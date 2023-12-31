import React from 'react';
import { Button } from 'react-bootstrap'; // Import the necessary components from react-bootstrap
import lion from "/img/rookie/lion.svg";
import bear from "/img/rookie/bear.svg";
import owl from "/img/rookie/owl.svg";

function RookieQuizResult(props) {
  const calculateScorePercentage = () => {
    const scorePercentage = (props.score / props.totalScore) * 100;
    return scorePercentage.toFixed(2);
  };

  const renderResultDescription = () => {
    const score = props.score;
    let resultDescription = '';

    if (score >= 13) {
      resultDescription = `
        <div class="row">
          <div class="col-4 p-4 d-flex justify-content-center">
            <div class="">
              <img style="height: 8rem;" src="/img/rookie/owl.svg">
              <div class="d-flex justify-content-center text-IronGray-Deep fs-2 mt-4" style="font-weight:bold; font-size: 2rem;">
                <div class="text-center">
                  <div class="fs-1 ">保守型</div>  
                  <div>投資人</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-8 text-IronGray-Deep ">
            <div class="fs-4 fw-bold mb-2">
              特色：
            </div>
            <div class="fs-5">
              保守型投資人對於風險的承受度低，較偏向於保本型的投資。
            </div>
            <div class="fs-4 fw-bold mt-3 mb-2">
              適合商品：
            </div>
            <div class="fs-5">
              投資組合會選擇波動度較小的產品，例如政府債券型基金、有固定配息的收益型債券基金；投資股票上，股價波動小、有穩定現金配息的高殖利率的股票較適合此類投資人。
            </div>
          </div>
        </div>
      `;
    } else if (score >= 6 && score <= 12) {
      resultDescription = `
        <div class="row">
          <div class="col-4 p-4 d-flex justify-content-center">
            <div class="">
              <img style="height: 8rem;" src="/img/rookie/bear.svg">
              <div class="d-flex justify-content-center text-IronGray-Deep fs-2 mt-4" style="font-weight:bold; font-size: 2rem;">
                <div class="text-center">
                  <div class="fs-1 ">穩健型</div>  
                  <div>投資人</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-8 text-IronGray-Deep ">
            <div class="fs-4 fw-bold mb-2">
              特色：
            </div>
            <div class="fs-5">
              穩健型投資人可承受的風險範圍較保守型投資人大，並且在能承受的範圍內進行穩定的投資。
            </div>
            <div class="fs-4 fw-bold mt-3 mb-2">
              適合商品：
            </div>
            <div class="fs-5">
              在投資組合上，選擇區域型、產業型或是指數股票型基金(ETF)，以整體面向的表現作調整，達到穩健成長的目的；股票則建議大型股，並研究基本面、獲利能力及市場消息等面向做為參考。
            </div>
          </div>
        </div>
      `;
    } else if (score >= 3 && score <= 5) {
      resultDescription = `
      <div class="row">
        <div class="col-4 p-4 d-flex justify-content-center">
          <div class="">
            <img style="height: 8rem;" src="/img/rookie/lion.svg">
            <div class="d-flex justify-content-center text-IronGray-Deep fs-2 mt-4" style="font-weight:bold; font-size: 2rem;">
              <div class="text-center">
                <div class="fs-1 ">積極型</div>  
                <div>投資人</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8 text-IronGray-Deep ">
          <div class="fs-4 fw-bold mb-2">
            特色：
          </div>
          <div class="fs-5">
            積極型投資人追求高報酬，相對也能忍受較大程度的風險波動，較不害怕虧損，甚至願意逢低加碼買進。
          </div>
          <div class="fs-4 fw-bold mt-3 mb-2">
            適合商品：
          </div>
          <div class="fs-5">
            投資組合中，股票選擇短期內有話題性的股票，以期待不久股價能飆漲賺取報酬；另外，也可以購買波動幅度較大的基金，例如新興市場基金，以滿足短期內追求報酬的需求。
          </div>
        </div>
      </div>
      `;
    }

    return { __html: resultDescription };
  };

  return (
    <div className="p-4 pt-2">
      <div className='quizScore fs-3 mb-3'>
        總分: {props.score}<br />
      </div>
      <div dangerouslySetInnerHTML={renderResultDescription()}></div>
      <Button className='next-button d-flex m-auto mt-5 px-3 py-2 fs-4' onClick={props.tryAgain}>
        再試一次
      </Button>
    </div>
  );
}

export default RookieQuizResult;
