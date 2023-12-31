import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../styles/member.css";
import "../../styles/forum_main.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
const MemberInfo = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const password = sessionStorage.getItem("password");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/member", { withCredentials: true })
      .then((res) => {
        // setUid(res.data.uid);
        // setName(res.data.name);
        // setEmail(res.data.email);
        // setPassword(res.data.password);
        // setPhotopath(res.data.photopath);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <div className="mt-4 flex-column d-flex ms-5 fs-4 fw-bold">
      <Form>
        {/* 會員編號 */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            會員編號：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              value={uid}
              readOnly
            />
          </Col>
        </Form.Group>
        {/* 姓名 */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            姓名：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              value={name}
              readOnly
            />
          </Col>
        </Form.Group>
        {/* 帳號 (電子信箱) */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            帳號：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              value={email}
              readOnly
            />
          </Col>
        </Form.Group>
        {/* 密碼 */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            密碼：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type={type}
              value={password}
              readOnly
            />
            <span className="" onClick={handleToggle}>
              <Icon className="ps-2" icon={icon} size={25} />
            </span>
          </Col>
        </Form.Group>
      </Form>
      <div className="d-flex mt-1">
        <Link to="/member/edit">
          <button className="memberInfoEdit mt-5  border-0 d-flex justify-content-center align-items-center rounded-3 IronGray-Deep px-4 py-2">
            <span className="text-white fs-5">編輯資料</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MemberInfo;
