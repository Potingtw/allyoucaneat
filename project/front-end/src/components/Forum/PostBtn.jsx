// 橫列發文鈕 modal內容
import React, { useState, useRef, useEffect, useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import uuid, { v4 as uuidv4 } from "react-uuid";
import "../../styles/post.css";
import "../../styles/forum_main_right.css";
import "../../styles/forum_main.css";
import axios from "axios";
import PostSuccess from "./PostSuccess";
import LoginButton from "../loginbtn";

function PostBtn() {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  console.log("我是post裡面的uid");
  console.log(uid);
  const [lgShow, setLgShow] = useState(false);
  const [postAlert, setPostAlert] = useState(false);
  const [image, setImage] = useState(null);

  const handleClose = () => {
    setLgShow(false);
    setPosts((prev) => ({ ...prev, faimage: null })); // 重置 faimage 為 null
    setImage(null); // 清除預覽的圖片
  };
  const handleShow = () => setLgShow(true);
  const v4Id = uuid();
  // console.log("我在這" + v4Id);
  const [posts, setPosts] = useState({
    fatitle: "",
    farticle: "",
    faimage: "",
    faid: "",
    fboard: "",
    createTime: "",
    fhashtag: "",
    collect: "",
  });
  useEffect(() => {
    if (posts.avatar) {
      const imageUrl = URL.createObjectURL(posts.avatar);
      const imgElement = document.querySelector(".showimg");
      if (imgElement) {
        imgElement.src = imageUrl;
      }
    }
  }, [posts.avatar]);

  useEffect(() => {
    if (postAlert) {
      setTimeout(() => {
        setPostAlert(0);
      }, 1500);
    }
  }, [postAlert]);

  const handleChange = (e) => {
    if (e.target.name === "faimage") {
      const selectedImage = e.target.files[0];
      setPosts((prev) => ({ ...prev, faimage: selectedImage }));

      // 預覽選擇的圖片
      if (selectedImage) {
        const imageUrl = URL.createObjectURL(selectedImage);
        setImage(imageUrl);
      }
    } else {
      setPosts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  // console.log(posts);

  const handleClick = async (e) => {
    e.preventDefault();
    //全部都要填寫
    const { fatitle, farticle, faimage, fboard, fhashtag } = posts;
    if (!fatitle || !farticle || !faimage || !fboard || !fhashtag) {
      alert("請填寫所有選項");
      return;
    }
    try {
      const currentTime = new Date().toDateString();
      setPosts((prev) => ({ ...prev, createTime: currentTime }));
      // setPosts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      const formData = new FormData();
      formData.append("uid", uid);
      formData.append("userimg", photopath);
      formData.append("fatitle", posts.fatitle);
      formData.append("farticle", posts.farticle);
      formData.append("faimage", posts.faimage);
      formData.append("fboard", posts.fboard);
      formData.append("fhashtag", posts.fhashtag);
      formData.append("createTime", currentTime);
      formData.append("collect", 0);
      formData.append("faid", v4Id);
      console.log("這是posts");
      console.log(posts);

      await axios.post("http://localhost:5789/posts", formData);
      console.log("上傳成功123");
      console.log(posts);
      setPostAlert(1);
      handleClose();
      setImage(null);
      setRefreshPosts(true);
    } catch (err) {
      console.log(err);
    }
  };

  // 先登入才可以發文 uid為null或undefined跳到login btn
  if (!uid) {
    return (
      <>
        <button className="postBtn px-4 fz-3" onClick={handleShow}>
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className=" bg-cover">
            <svg
                      width="42"
                      height="42"
                      viewBox="0 0 43 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.5 0C9.62298 0 0 9.62298 0 21.5C0 33.377 9.62298 43 21.5 43C33.377 43 43 33.377 43 21.5C43 9.62298 33.377 0 21.5 0ZM21.5 8.32258C25.7133 8.32258 29.129 11.7383 29.129 15.9516C29.129 20.1649 25.7133 23.5806 21.5 23.5806C17.2867 23.5806 13.871 20.1649 13.871 15.9516C13.871 11.7383 17.2867 8.32258 21.5 8.32258ZM21.5 38.1452C16.4111 38.1452 11.851 35.8391 8.7994 32.2327C10.4292 29.1637 13.6196 27.0484 17.3387 27.0484C17.5468 27.0484 17.7548 27.0831 17.9542 27.1438C19.0813 27.5079 20.2603 27.7419 21.5 27.7419C22.7397 27.7419 23.9274 27.5079 25.0458 27.1438C25.2452 27.0831 25.4532 27.0484 25.6613 27.0484C29.3804 27.0484 32.5708 29.1637 34.2006 32.2327C31.149 35.8391 26.5889 38.1452 21.5 38.1452Z"
                        fill="#F3F3F3"
                      />
                    </svg>
            </div>
            <div className="w-75 rounded-3 bg-white d-flex align-items-center px-3 py-2">
              想和大家分享...
            </div>
            <div className="IronGray-Light rounded-3 text-white px-3 py-2">發文</div>
          </div>
        </button>
        <Modal
          size="md"
          show={lgShow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="top-15"
          >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body   className="text-center p-5"  >
            <p className="fs-3 fw-bold text-IronGray-Light mb-4" >請先登入才可發文</p>
            <LoginButton />
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <div className="text-center ">{postAlert === 1 && <PostSuccess />}</div>

        <button className="postBtn px-4 fz-3" onClick={handleShow}>
          <div className="d-flex justify-content-between align-items-center py-3">
            <img src={`http://localhost:3000/${photopath}`} className="user-img bg-cover"></img>
            <div
              className="w-75 rounded-3 bg-white text-IronGray d-flex align-items-center px-3 py-2"
              style={{ letterSpacing: "0.12rem" }}>
              想和大家分享...
            </div>
            <div
              className="articleBtn border-0 rounded-3 IronGray-Light text-white px-3 py-2">
              發文
            </div>
          </div>
        </button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="top-5"
        >
          <div className="container mt-0">
            <div className="p-2 d-flex flex-column justify-content-between">
              <Modal.Header closeButton>
                {/* 發文者資訊 */}
                <div className="d-flex align-items-center px-3">
                  <img
                    id="memberpic"
                    src={`http://localhost:3000/${photopath}`}
                  ></img>
                  <div
                    id="memberid"
                    className="py-3 ms-3 fs-4"
                    onChange={handleChange}
                  >
                    {name}
                  </div>
                </div>
              </Modal.Header>
              <Modal.Body className="px-4 py-2">
                {/* 選擇看板 */}
                <div className="mt-4">
                  <Form action="" className="">
                    <select
                      className="form-control form-select fs-5 px-3 py-2"
                      id="billboard"
                      required=""
                      name="fboard"
                      onChange={handleChange}
                    >
                      <option
                        // selected="selected"
                        disabled="disabled"
                        style={{ display: "none" }}
                      >
                        選擇看板
                      </option>
                      {/* <option>請選擇看板</option> */}
                      <option>請選看板</option>
                      <option>閒聊</option>
                      <option>新聞</option>
                      <option>標的</option>
                      <option>請益</option>
                      <option>情報</option>
                      <option>心得</option>
                      <option>其他</option>
                    </select>
                  </Form>
                </div>
                {/* 標題 */}
                <Form action="">
                  <label htmlFor="postTitle" className="" />
                  <input
                    type="text"
                    className="form-control fs-5 p-3"
                    id="postTitle"
                    placeholder="標題"
                    name="fatitle"
                    onChange={handleChange}
                  />
                </Form>
                {/* 文章內容 */}
                <Form>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      cols={10}
                      className="form-control fs-5 mt-4 p-3"
                      placeholder="內容"
                      name="farticle"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                {/* hashtag */}
                <input
                  type="text"
                  defaultValue="#"
                  placeholder="#"
                  id="hashtag"
                  name="fhashtag"
                  onChange={handleChange}
                  className="mt-4 px-3 py-2 rounded-4 fs-4 border-0"
                />
                {/* 圖片上傳 & 取消鈕 & 發文鈕 */}
                <div className="d-flex justify-content-between align-items-center my-4">
                  {/* 圖片上傳 */}
                  <div className="upload__btn-box">
                    <label className="upload__btn rounded-4 text-center text-white px-3 py-2 fs-5 IronGray-Deep fw-normal">
                      上傳圖片
                      <input
                        type="file"
                        multiple=""
                        data-max_length={20}
                        className="upload__inputfile"
                        name="faimage"
                        onChange={handleChange}
                      />
                    </label>
                    {/* 顯示選擇的圖片 */}
                    {image && (
                      <img className="showimg me-2 object-fit-contain" style={{width:"250px"}} src={image} alt="請上傳圖片" />
                    )}
                  </div>
                  {/* 取消鈕 & 發文鈕 */}
                  <div className="">
                    <Button
                      className="fs-5 rounded-3 px-3 py-2"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      取消
                    </Button>
                    <Button
                      className="fs-5 rounded-3 px-3 py-2 ms-4"
                      variant="primary"
                      name="createTime"
                      onClick={handleClick}
                    >
                      發文
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default PostBtn;
