import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";
import Tweet from "../components/Tweet";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuid } from "uuid";
import "../css/Home.css";
import "../css/Navigation.css";
import "../css/Tweet.css";
const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuid()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachmentClick = () => {
    setAttachment("");
  };

  return (
    <div className="home-container">
      <form onSubmit={onSubmit} className="form-container">
        <div className="form-header">
          <textarea
            className="tweet-input"
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={100}
          />
        </div>
        <div className="form-body">
          <input
            className="file-input"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          <input className="submit-button" type="submit" value="Tweet" />
        </div>
        {attachment && (
          <div className="form-footer">
            <img
              className="attachment-preview"
              src={attachment}
              alt="attachment"
            />
            <button className="clear-button" onClick={onClearAttachmentClick}>
              Clear
            </button>
          </div>
        )}
      </form>
      <div className="tweets-container">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
