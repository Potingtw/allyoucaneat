import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import MemberInfo from "./MemberInfo";
import MemberNotice from "./MemberNotice";
import MemberCollect from "./MemberCollect";
import MyArticle from "./MyArticle";
import "../../styles/sidebar.css";
import "../../styles/forum_main.css";

const SidebarTabs = () => {
    const navigate = useNavigate();

    const uid = sessionStorage.getItem("uid");
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const photopath = sessionStorage.getItem("photopath");

    useEffect(() => {
        axios
            .get("http://localhost:3000/member", { withCredentials: true })
            .then((res) => {
                // setName(res.data.name);
                // setPhotopath(res.data.photopath);
            })
            .catch((err) => console.log(err));
    }, []);
    const handleLogout = () => {
        axios
            .post("http://localhost:3000/logout") // 發送 POST 請求到 /logout 路由
            .then((response) => {
                sessionStorage.removeItem("uid");
                sessionStorage.removeItem("name");
                sessionStorage.removeItem("email");
                sessionStorage.removeItem("photopath");
                // 登出成功的處理邏輯
                console.log(response.data); // 可根據需要處理返回的res
                // 進行重定向或其他操作
                alert("您已登出");
                navigate("/");
                // window.location.href = "/";
            })
            .catch((error) => {
                // 登出失敗的處理邏輯
                console.error(error);
                // 進行錯誤處理或其他操作
            });
    };

    return (
        <Tab.Container id="SidebarTabs" defaultActiveKey="MemberInfo">
            {/* 側邊欄 與 內容 */}
            <Row className="vh-100">
                {/* 側邊欄 */}
                <Col sm={3}>
                    <div className="d-flex justify-content-center">
                        <Nav className="flex-column pt-4 fs-5">
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="MemberInfo"
                                    className="d-flex justify-content-center align-items-center IronGray rounded-3 px-4 py-3 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="var(--White)"
                                        className="me-3 bi bi-person-circle"
                                        viewBox="0 0 16 16"
                                        style={{ width: "1.8rem" }}>
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                    <span className="text-white">
                                        會員資訊
                                    </span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="MemberNotice"
                                    className="d-flex justify-content-center align-items-center IronGray rounded-3 px-4 py-3 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="var(--White)"
                                        className="me-3 bi bi-envelope-fill"
                                        viewBox="0 0 16 16"
                                        style={{ width: "1.7rem" }}>
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg>
                                    <span className="text-white">
                                        會員公告
                                    </span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="MemberCollect"
                                    className="d-flex justify-content-center align-items-center IronGray rounded-3 px-4 py-3 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="var(--White)"
                                        className="me-3 bi bi-bar-chart-fill"
                                        viewBox="0 0 16 16"
                                        style={{ width: "1.6rem" }}>
                                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                                    </svg>
                                    <span className="text-white">
                                        我的收藏
                                    </span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="MyArticle"
                                    className="d-flex justify-content-center align-items-center IronGray rounded-3 px-4 py-3 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="var(--White)"
                                        className="me-3 bi bi-pencil-fill"
                                        viewBox="0 0 16 16"
                                        style={{ width: "1.5rem" }}>
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                    <span className="text-white">
                                        我的文章
                                    </span>
                                </Nav.Link>
                            </Nav.Item>
                            <button
                                className="logout border-0 d-flex justify-content-center align-items-center IronGray-Light rounded-3 px-4 py-2 mt-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="var(--IronGray-Deep)"
                                    className="me-3 bi bi-box-arrow-right"
                                    viewBox="0 0 16 16"
                                    style={{ width: "1.7rem" }}>
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg>
                                <span className="fs-5 fw-bold text-IronGray-Deep border-0 IronGray-Light" onClick={handleLogout}>
                                    登出
                                </span>
                            </button>
                        </Nav>
                    </div>
                </Col>
                {/* 內容 */}
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="MemberInfo">
                            <MemberInfo />
                        </Tab.Pane>
                        <Tab.Pane eventKey="MemberNotice">
                            <MemberNotice />
                        </Tab.Pane>
                        <Tab.Pane eventKey="MemberCollect">
                            <MemberCollect />
                        </Tab.Pane>
                        <Tab.Pane eventKey="MyArticle">
                            <MyArticle />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default SidebarTabs;