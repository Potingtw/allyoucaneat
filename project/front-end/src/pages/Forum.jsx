import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/forum_individual.css";
import Footer from "../components/Footer.jsx";
import ForumIndividual from "../components/Forum/ForumIndividual";
import SidebarTag from "../components/Forum/SidebarTag.jsx";
import SidebarNews from "../components/Forum/SidebarNews.jsx";
import Post from "../components/Forum/Post.jsx";
import ArticleSort from "../components/Forum/ArticleSort.jsx";
import Billboard from "../components/Forum/Billboard.jsx";
import LineChart from "../components/linechart";
import BackToTop from "../components/Forum/BackToTop";

const Forum = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  console.log("我是uid");
  console.log(uid);
  return (
    <>
      <div id="top"></div>
      <div className="forum" style={{ paddingTop: "9rem" }}>
        <div className="container mt-4">
          <div className="row g-5">
            <div className="col-2">
              <Billboard />
            </div>
            <div className="col-7">
              <ArticleSort />
            </div>
            <div className="col-3">
              <SidebarTag />
              {/* <div style={{width:"10px"}} ><LineChart/></div> */}
              <SidebarNews />
            </div>
          </div>
        </div>
        <a href="#top">
          <BackToTop />
        </a>

        {/* <Post/> */}
      </div>

      <Footer />
    </>
  );
};

export default Forum;
