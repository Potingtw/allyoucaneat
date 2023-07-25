
import React, { useState, useEffect } from "react";
import axios from "axios";

const KeepButton = (props) => {
  const [keeps, setKeeps] = useState([]);
  const [collects, setCollects] = useState(null);
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const faid = props.data;

  useEffect(() => {
    const fetchAllKeep = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        setKeeps(res.data);
        setCollects(res.data.collect);
      } catch (err) {
        console.log("Error in fetchAllKeep: ", err);
      }
    };

    fetchAllKeep();
  }, []);

  const collectClick = async (e) => {
    e.preventDefault();

      if (!uid) {
      // 如果 uid 不存在，則不執行下面的程式碼
      return;
    }

    try {
      const newCollects = collects === 0 || collects === null ? 1 : 0;
      setCollects(newCollects);

      await axios.put(`http://localhost:5789/collect/${faid}`, {
        faid: faid,
        collects: newCollects,
      });

      // Update the keeps array with the new collect value
      setKeeps((prevKeeps) => {
        return prevKeeps.map((keep) => {
          if (keep.faid === faid) {
            return {
              ...keep,
              collect: newCollects,
            };
          }
          return keep;
        });
      });
    } catch (err) {
      console.log("Error in collectClick: ", err);
    }
  };

  return (
    <>
      {/* Render a single img tag based on the collects state */}
      {/* {collects === 0 ? (
        <img src="./img/forum/collect-Article.svg" alt="" onClick={collectClick} />
      ) : (
        <img src="./img/forum/collect.svg" alt="" onClick={collectClick} />
      )} */}

      {/* Render multiple keep buttons based on the keeps state */}
      {keeps.map((keep, index) => (
        <a className="text-decoration-none ms-2" href="#" key={index}>
          <div onClick={collectClick}>
            {keep.collect === 0 ? (
              <img src="public/img/forum/collect-Article.svg" alt="" />
            ) : (
              <img src="public/img/forum/collect.svg" alt="" />
            )}
          </div>
        </a>
      ))}
    </>
  );
};

export default KeepButton;
