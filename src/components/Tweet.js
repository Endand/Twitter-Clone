import React, { useState } from "react";
import { dbService } from "../fbase";
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
    <div className="tweet">
      {editing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Edit your tweet"
            value={newTweet}
            onChange={onChange}
            required
            className="tweet__input"
          />
          <input
            type="submit"
            value="Update"
            className="tweet__button tweet__button--edit"
          />
          <button
            onClick={toggleEditing}
            className="tweet__button tweet__button--cancel"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              alt="attachment"
              className="tweet__image"
            />
          )}
          {isOwner && (
            <div className="tweet__actions">
              <button
                onClick={onDeleteClick}
                className="tweet__button tweet__button--delete"
              >
                Delete
              </button>
              <button
                onClick={toggleEditing}
                className="tweet__button tweet__button--edit"
              >
                Edit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
