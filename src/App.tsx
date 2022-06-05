import React, { useContext } from "react";
import "./App.scss";
import Main from "./components/Organisms/Main/Main";
import useApp from "./helpers/useApp";
import { AuthContext } from "./components/Organisms/login/auth";

const App = () => {
  const { messages, setMessages, friends, isLoggedIn, setLogIn } = useApp();
  const { token } = useContext(AuthContext);

  return (
    <div className="app">
      <Main
        type={token ? `chat` : `login`}
        data={{ messages, setMessages, friends, setLogIn }}
      />
    </div>
  );
};

export default App;
