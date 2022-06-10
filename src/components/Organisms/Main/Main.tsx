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
		currentFriend: any;
		setCurrentFriend: Function;
	};
	type: "login" | "register" | "chat";
};

const Main = (props: Props) => {
	const { data, type } = props;
	const { setType, setLoggedUserData, setCurrentUser } = data;
	const handleOnLogin = (username: string, id: string) => {
		setLoggedUserData(username);
		setCurrentUser(id);
	};
	const children = () => {
		switch (type) {
			case "login":
				return (
					<LogIn
						onChange={(set) => {
							setType("register");
							set();
						}}
						onLogin={handleOnLogin}
					/>
				);
			case "register":
				return (
					<LogIn
						register
						onChange={(set) => {
							setType("login");
							set();
						}}
					/>
				);
			case "chat":
				return <Chat data={data} />;
		}
	};

	return <>{children()}</>;
};

export default Main;
