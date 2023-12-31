import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import "../../styles/member.css";
import "../../styles/forum_main.css";

const MemberTitle = () => {
    const uid = sessionStorage.getItem("uid");
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const photopath = sessionStorage.getItem("photopath");
    const password = sessionStorage.getItem("password");

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

    return (
        <>
            {/* 自選背景顏色 */}
            <div>
                <Form.Label
                    htmlFor="changeBgColor"
                    className="d-none">
                    更改背景顏色
                </Form.Label>
                <Form.Control
                    type="color"
                    id="changeBgColor"
                    defaultValue="#57687C"
                    title="Choose your color"
                    className="border-0 bg-Primary-Gray"
                />
            </div>
            {/* 會員頭像 與 歡迎詞 */}
            <div className="d-flex">
                <div className="memberpic d-flex justify-content-center align-items-center">
                    <img src={`http://localhost:3000/${photopath}`} alt="大頭照" />
                </div>
                <div className="mt-2">
                    <span className="ps-4 py-3 fs-3 fw-bold text-Pink-Deep">{name}</span>
                    <span className="ps-4 py-3 fs-4">歡迎回來！</span>
                </div>
            </div>
        </>
    );
};

export default MemberTitle;