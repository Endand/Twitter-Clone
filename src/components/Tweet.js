import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { getStorage, deleteObject, ref } from "@firebase/storage";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this Tweet?"
    );
    if (confirm) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();

      if (tweetObj.attachmentUrl !== "") {
        const storage = getStorage();
        const fileRef = ref(storage, tweetObj.attachmentUrl);
        await deleteObject(fileRef);
      }
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  const test = { tweetObj };
  console.log(test);
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>

          {tweetObj.attachmentUrl && (
            <img src={tweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Tweet</button>
              <button onClick={onDeleteClick}>Delet Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
