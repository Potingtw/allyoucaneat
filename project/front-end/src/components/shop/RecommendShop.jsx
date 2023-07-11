import React, { useContext } from "react";
import { ShopContext } from "../../../context/ShopContext";
import { Link } from "react-router-dom";

export const RecommendShop = () => {
  const { products, cartItems, addToCart } = useContext(ShopContext);
  // console.log(cartItems);

  const filteredCartItems = Object.entries(cartItems).filter(
    (item) => item[1] == 0
  );
  // 前三個沒在購物車的商品
  const firstThreeItems = filteredCartItems.slice(0, 3);
  // console.log(firstThreeItems);

  return (
    <div id="recommend-card">
      <p className="title">您可能也會喜歡：</p>
      <div className="d-flex justify-content-center">
        {firstThreeItems.map((item) => {
          const mypid = item[0];
          // console.log(mypid);
          const book = Object.values(products).filter(
            (product) => product.pid == mypid
          );
          const pid = book[0].pid;
          const pname = book[0].pname;
          const pimage1 = book[0].pimage1;
          const pprice = book[0].pprice;
          return (
            <Link to="" className="card" key={pid}>
              <img src={pimage1} style={{ width: "100px" }} />
              <p className="fw-bold my-4">{pname}</p>
              <p className="mb-3">NT$ {pprice}</p>
              <button
                className="recommend-card-btn"
                onClick={() => {
                  addToCart(pid, 1);
                }}
              >
                加入購物車
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
