import React, { useEffect, useState } from "react";
import ARouter from "./Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);

        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return init ? (
    <ARouter isLoggedIn={isLoggedIn} userObj={userObj} />
  ) : (
    "Initializing..."
  );
}

export default App;
