import React, { useState, useEffect } from "react";
import axios from "axios";
const HitoHashTags = (props) => {
  const [tags, setTags] = useState([]);
  const faid = props.data;
  useEffect(() => {
    const fetchAllTag = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        // console.log(faidRes.data);
        // console.log(res.data);
        setTags(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTag();
  }, []);
  return (
    <>
      {tags.map((tag, index) => (
        <a
          href="#"
          className="me-3 text-decoration-none IronGray-Light text-white fz-3 rounded-3 px-2 py-1"
          key={"hashtag"+index}
        >
          {tag.fhashtag}
        </a>
      ))}
    </>
  );
};

export default HitoHashTags;
