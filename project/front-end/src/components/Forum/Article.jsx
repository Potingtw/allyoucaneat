import React, { useState, useEffect } from "react";
import "../../styles/forum_main_right.css";
import "../../styles/forum_main.css";
import Emoji from "./Emoji";
import { Button, Modal } from "react-bootstrap";
import PostUser from "./PostUser";
import BoardTag from "./BoardTag";
import ArticleContent from "./ArticleContent";
import HitoHashTags from "./HitoHashTags";
import MessageQuantity from "./MessageQuantity";
import EmojiButton from "./EmojiButton";
import KeepButton from "./KeepButton";
import HotNewMessageTabs from "./HotNewMessageTabs";
import NotifyShareDropdown from "./NotifyShareDropdown";
import AddMessage from "./AddMessage";
import ArticleTitle from "./ArticleTitle";
import axios from "axios";

function Article() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [faid, setFaid] = useState([]);
  const [collects, setCollects] = useState(0);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get("http://localhost:5789/posts/");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPost();
  }, []);

  const fetchAllCollect = async () => {
    try {

      const res = await axios.post("http://localhost:5789/posts", {
        faid: faid,
      });
      setCollects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleArticleClick = () => {
    setShowModal(true);
  };

  const handleModalClose = (id) => {
    setFaid(id);
    setShowModal(false);
  };

  // // 全部一起動
  // const collectClick = (e)=>{
  //   e.preventDefault();
  //   if(collects === 0 ){
  //     setCollects(1)
  //   }else{
  //     setCollects(0)
  //   }
  // }
  const collectClick = async (e) => {
    e.preventDefault();

    try {
      if (collects === 0) {
        setCollects(1);
        console.log('有嗎' + faid);
        await axios.put("http://localhost:5789/collect/:faid", {
          faid: faid,
          collects: 1,
        });
      } else {
        setCollects(0);
        await axios.put("http://localhost:5789/collect/:faid", {
          faid: faid,
          collects: 0,
        });
      }
      fetchAllCollect();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-5 py-4">
      {posts.map((post, index) => (
        <div key={index}>
          <div className="articleCont py-4" >
            {/* 用戶 */}
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center text-IronGray-Deep">
                <img className="userImg me-3" src={post.image} alt="" />
                <span className="me-3 mb-1 fz-3">{post.name}</span>
                <span className="me-4 mb-1 fz-3">{post.fboard}</span>
                <span className="me-3 mb-1 fz-4 fw-normal">
                  {" "}
                  {new Date(post.createTime).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
               
              </div>
            </div>
            {/* articleContent */}
            <div className="row mt-3"
              id={post.faid}
              onClick={(e) => {
                // console.log(e.target.id);
                setFaid(e.target.id);
                handleArticleClick()
              }}
            //  style={{ backgroundColor: "black" }}
            >
              <div className="col-9">
                <p className="ellipsis fs-4 fw-bold mt-2 text-IronGray-Deep" id={post.faid}>
                  {post.fatitle}
                </p>
                <p className="line-cut-2 mt-2 fz-3 text-IronGray-Deep" id={post.faid}>
                  {post.farticle}
                </p>
              </div>
              <div className="col-2 d-flex align-items-center">
                <div className="rounded-4" >
                  {/* <img src={post.faimage} alt="" /> */}
                </div>
              </div>
            </div>
            <div className="pe-4 mt-4 d-flex text-IronGray-Deep">
              {/* likeCount */}
              <div className="d-flex me-1">
                <img src="../public/img/forum/likeClick.svg" alt="" />
                <span className="fz-3 fw-normal px-3 d-flex align-content-center">
                  {post.likeCount}
                </span>
              </div>
              {/* messageCount */}
              <div className="me-1">
                <img src="../public/img/forum/chat-left-fill.svg" alt="" />
                <span className="fz-3 fw-normal px-3">25</span>
              </div>
              {/* collectCount */}
              <div className="me-1" onClick={collectClick}>
                <img src={
                  collects !== 0
                    ? "public/img/forum/collect.svg"
                    : "public/img/forum/collect-Article.svg"
                } />
                <span className="fz-3 fw-normal px-3">3</span>
              </div>
            </div>
          </div>
          <hr />
          
          {/* articleIndividual-modal */}
          <Modal show={showModal} onHide={handleModalClose}>
            <div className="px-5 py-3 d-flex flex-column justify-content-between">
              <Modal.Header closeButton>
                <Modal.Title>
                  <div className="d-flex align-items-center">
                    <PostUser />
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="p-4">
                  <div className="p-2 pb-4">
                    {/* 看板 */}
                    <BoardTag data={faid} />
                  </div>
                  <div className="p-3 fs-5">
                    {/* 文章內容 */}
                    <ArticleTitle data={faid} />
                    <ArticleContent data={faid} />
                  </div>
                  <div className="p-3 d-flex">
                    {/* hashtag */}
                    <HitoHashTags data={faid} />
                  </div>
                  <div className="text-secondary fs-5 p-4 d-flex justify-content-between">
                    <div className="d-flex">
                      {/* <Emoji /> */}
                      {/* <EmojiButton data={faid} /> */}
                      <MessageQuantity />
                    </div>
                    <div className="d-flex">
                      <KeepButton data={faid} />
                      <NotifyShareDropdown />
                    </div>
                  </div>
                  <HotNewMessageTabs />
                </div>
              </Modal.Body>
              <Modal.Footer className="p-4 d-flex justify-content-between align-items-center">
                <AddMessage />
              </Modal.Footer>
            </div>
          </Modal>
        </div>
      ))}
    </div>
  );
}

export default Article;

// import React, { useState, useEffect } from "react";
// import Emoji from "./Emoji";
// import { Button, Modal } from "react-bootstrap";
// import PostUser from "./PostUser";
// import BoardTag from "./BoardTag";
// import ArticleContent from "./ArticleContent";
// import HitoHashTags from "./HitoHashTags";
// import MessageQuantity from "./MessageQuantity";
// import EmojiButton from "./EmojiButton";
// import KeepButton from "./KeepButton";
// import HotNewMessageTabs from "./HotNewMessageTabs";
// import NotifyShareDropdown from "./NotifyShareDropdown";
// import AddMessage from "./AddMessage";
// import ArticleTitle from "./ArticleTitle";
// import axios from "axios";

// function Article() {
//   const [showModal, setShowModal] = useState(false);
//   const [posts, setPosts] = useState([]);
// const [faid,setFaid]=useState([]);

//   useEffect(() => {
//     const fetchAllPost = async () => {
//       try {
//         const res = await axios.get("http://localhost:5789/posts");
//         setPosts(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchAllPost();
//   }, []);

//   const handleArticleClick = () => {
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       {posts.map((post, index) => (
//         <div key={index}>
//           <div className="articleCont" onClick={handleArticleClick}>
//             <div className="d-flex justify-content-between px-4">
//               <div className="d-flex align-items-center">
//                 <img
//                   className="userImg"
//                   src="../public/img/forum/user-Img.jpg"
//                   alt=""
//                 />
//                 <span className="me-3 mb-1 fz-3">大神帶你飛</span>
//                 <span className="me-3 mb-1 fz-4">・3小時前</span>
//               </div>
//             </div>

//             <div
//               className="px-4"
//               id={post.faid}
//               onClick={(e) => {
//                 console.log(e.target.id);
//                 setFaid(e.target.id)
//               }}
//               style={{backgroundColor:"black"}}
//             >
//               <p className="fz-1 mt-3" id={post.faid}>{post.fatitle}</p>
//               <p className="ellipsis mt-3 fz-2">{post.farticle}</p>
//             </div>
//             <div className="px-4 mt-3 d-flex">
//               <div className="d-flex">
//                 <img src="../public/img/forum/likeClick.svg" alt="" />
//                 <span className="fz-5 d-flex align-content-center mt-1 mx-1">
//                   {post.likeCount}
//                 </span>
//               </div>
//               <div className="mx-4">
//                 <img src="../public/img/forum/Chat.svg" alt="" />

//                 <span className="fz-5 mx-1">25</span>
//               </div>
//               <div className="mx-4">
//                 <img src="../public/img/forum/collect-Article.svg" alt="" />
//                 <span className="fz-5 mx-1">3</span>
//               </div>
//             </div>
//           </div>
//           <hr className="forumHr mx-4 p-1" />

//           <Modal show={showModal} onHide={handleModalClose}>
//             <div className="container">
//               <div className="p-2 d-flex flex-column justify-content-between">
//                 <Modal.Header closeButton>
//                   <Modal.Title>
//                     <div className="d-flex align-items-center">
//                       <PostUser />
//                     </div>
//                   </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   <div className="p-4">
//                     <div className="p-2 pb-4">
//                       {/* 看板 */}
//                       <BoardTag data={faid} />
//                     </div>
//                     <div className="p-3 fs-5">
//                       {/* 文章內容 */}
//                       {/* {post.fatitle} */}
//                       {/* {post.farticle} */}
//                     </div>
//                     <div className="p-3 d-flex">
//                       {/* hashtag */}
//                       {/* {post.fhashtag} */}
//                     </div>
//                     <div className="text-secondary fs-5 p-4 d-flex justify-content-between">
//                       <div className="d-flex">
//                         {/* <Emoji /> */}
//                         {/* <EmojiButton /> */}
//                         <MessageQuantity />
//                       </div>
//                       <div className="d-flex">
//                         <KeepButton />
//                         <NotifyShareDropdown />
//                       </div>
//                     </div>
//                     <HotNewMessageTabs />
//                   </div>
//                 </Modal.Body>
//                 <Modal.Footer className="p-4 d-flex justify-content-between align-items-center">
//                   <AddMessage />
//                 </Modal.Footer>
//               </div>
//             </div>
//           </Modal>
//         </div>
//       ))}
//     </>
//   );
// }

// export default Article;
