import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/loginpage.css";
import "../../styles/forum_main.css";

const EnterEmail = (props) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/loginpage");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // props.handlePass();
    await props.fetchMessage();
  };

  return (
    <>
      <div className="mt-10_5rem d-flex align-items-center justify-content-center">
        <form
          action="http://localhost:3333/sendEmail"
          method="post"
          onSubmit={handleSubmit}
          id="memberLogin"
          className="card p-4 rounded-4 drop-shadow-20"
        >
          <div className="card-body fw-bold px-5 text-IronGray-Deep">
            <div className="">
              <label
                htmlFor="email"
                className="d-flex justify-content-center m-auto py-3 fs-3"
              >
                忘記密碼
              </label>
              <input
                type="email"
                name="email"
                className="member-inp border-1 rounded-2"
                placeholder="請輸入 Email"
              />
            </div>
            <div className="d-flex flex-column justify-content-around">
              <button
                type="submit"
                // onClick={handlePass}
                className="btn btn-login py-2 mb-4 mt-4"
              >
                發送驗證信
              </button>
              <button onClick={handleClose} className="btn btn-login py-2 mb-4">
                取消
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="mt-10_5rem align-items-center justify-content-center"
        style={{ display: "none" }}
      >
        <form
          action="http://localhost:3333/sendEmail"
          method="post"
          id="memberLogin"
          className="card p-4 rounded-4 drop-shadow-20"
        >
          <div className="card-body fw-bold px-5 text-IronGray-Deep">
            <div className="">
              <label
                htmlFor="email"
                className="d-flex justify-content-center m-auto py-3 fs-3"
              >
                忘記密碼
              </label>
              <input
                type="email"
                name="email"
                className="member-inp border-1 rounded-2"
                placeholder="請輸入 Email"
              />
            </div>
            <div className="d-flex flex-column justify-content-around">
              <button
                type="submit"
                // onClick={handlePass}
                className="btn btn-login py-2 mb-4 mt-4"
              >
                發送驗證信
              </button>
              <button onClick={handleClose} className="btn btn-login py-2 mb-4">
                取消
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EnterEmail;
