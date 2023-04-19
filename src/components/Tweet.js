import React from "react";
import { dbService } from "../fbase";

const Tweet = ({ tweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this Tweet?"
    );
    if (confirm) {
      console.log(tweetObj.id);
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };

  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delet Tweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
