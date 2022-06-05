import React from "react";
import Chat from "../Chat/Chat";
import LogIn from "../login/Login";
import { Message, Person } from "../../../helpers/useApp";

type Props = {
  data: {
    messages: Message[];
    setMessages: (message: any) => void;
    friends: Person[];
    setLogIn: (isLoggedIn: Boolean) => void;
  };
  type: string;
};

const Main = (props: Props) => {
  const { data, type } = props;
  const children = () => {
    switch (type) {
      case "login":
        return <LogIn />;
      case "register":
        return <LogIn register />;
      case "chat":
        return <Chat data={data} />;
    }
  };

  return <>{children()}</>;
};

export default Main;
