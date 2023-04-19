import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService, firebaseInstance } from "../fbase";
import "../css/Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  };

  return (
    <div className="auth-container">
      <h2>{newAccount ? "Create Account" : "Sign In"}</h2>
      <form onSubmit={onSubmit}>
        <input
          className="auth-input"
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          className="auth-input"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          className="auth-button"
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <p className="auth-error">{error}</p>}
      </form>
      <span onClick={toggleAccount} className="auth-toggle">
        {newAccount ? "Already have an account? Sign In" : "Create new account"}
      </span>
      <div className="auth-social-container">
        <p className="auth-social-text">Or sign in with</p>
        <button
          onClick={onSocialClick}
          name="google"
          className="auth-social-button"
        >
          <i className="fab fa-google auth-social-icon"></i>
          Google
        </button>
      </div>
    </div>
  );
};
export default Auth;
