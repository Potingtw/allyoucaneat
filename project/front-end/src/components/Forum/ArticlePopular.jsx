import React from "react";
import Billboard from "./Billboard";
import Article from "./Article";
import "../../styles/forum_main_right.css";

function ArticlePopular() {
  return (
    <div className="articlePopular mt-4">
      <Billboard />
      <hr className="forumHr mx-4" />
      <Article />
    </div>
  );
}

export default ArticlePopular;
