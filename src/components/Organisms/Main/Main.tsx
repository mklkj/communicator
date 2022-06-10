import React from "react";
import Chat from "../Chat/Chat";
import LogIn from "../Login/Login";
import { Message, Person } from "../../../helpers/useApp";

type Props = {
	data: {
		messages: Message[];
		setMessages: (message: any) => void;
		friends: Person[];
		setLogIn: (isLoggedIn: Boolean) => void;
		currentUser?: string;
		setCurrentUser: Function;
		setType: Function;
		loggedUserData: any;
		setLoggedUserData: Function;
	};
	type: "login" | "register" | "chat";
};

const Main = (props: Props) => {
	const { data, type } = props;
	const { setType, setLoggedUserData } = data;
	const children = () => {
		switch (type) {
			case "login":
				return (
					<LogIn
						onChange={() => setType("register")}
						onLogin={setLoggedUserData}
					/>
				);
			case "register":
				return <LogIn register onChange={() => setType("login")} />;
			case "chat":
				return <Chat data={data} />;
		}
	};

	return <>{children()}</>;
};

export default Main;
