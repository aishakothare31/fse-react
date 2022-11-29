import React, { useEffect, useState } from "react";
import * as dislikesService from "../../services/dislikes-service";
import * as likesService from "../../services/likes-service";
import clsx from "clsx";

const TuitStats = ({tuit, likeTuit, dislikeTuit}) => {
  // const [dislikedTuit, setDislikedTuit] = useState(false);
  // const [likedTuit, setLikedTuit] = useState(false);
  // useEffect(() => {
  //   const fetchLikesDislikes = () => {
  //     likesService.hasUserLikedTheTuit("me", tuit._id).then((liked) => {
  //       setLikedTuit(liked);
  //     });
  //     dislikesService
  //       .hasUserDislikedTheTuit("me", tuit._id)
  //       .then((disliked) => {
  //         setDislikedTuit(disliked);
  //       });
  //   };

  //   fetchLikesDislikes();
  // }, [tuit]);
  return (
    <div className="row">
      ...
      <div className="col">
        <span onClick={() => likeTuit(tuit)}>
        {
          tuit.stats.likes > 0 &&
          <i className="fa-solid fa-thumbs-up"
             style={{color: 'red'}}></i>
            
        }
        {
          tuit.stats.likes <= 0 &&
          <i className="far fa-thumbs-up"></i>
        }
        {/* <i
          className={clsx("fa-solid", "fa-thumbs-up", "me-1", {
            "ttr-like-unlike-color-red": likedTuit,
          })}
        ></i> */}
        {tuit.stats && tuit.stats.likes}
        </span>
        <span onClick={() => dislikeTuit(tuit)}>
        {
          tuit.stats.dislikes > 0 &&
          <i className= "fa-solid fa-thumbs-down"
             style={{color: 'blue'}}></i>
        }
        {
          tuit.stats.dislikes <= 0 &&
          <i className="far fa-thumbs-down"></i>
        }
        {/* <i
          className={clsx("fa-solid", "fa-thumbs-down", "me-1", {
            "ttr-like-unlike-color-blue": dislikedTuit,
          })}
        ></i> */}
        {tuit.stats && tuit.stats.dislikes}
        </span>
      </div>
      ...
      {/* <div className="col">
        <span onClick={() => dislikeTuit(tuit)}>
        {
          tuit.stats.dislikes > 0 &&
          <i className="fas fa-heart"
             style={{color: 'blue'}}></i>
        }
        {
          tuit.stats.likes <= 0 &&
          <i className="far fa-heart"></i>
        }
        {tuit.stats && tuit.stats.dislikes}
        </span>
      </div> */}
    </div>
  );
}
export default TuitStats

