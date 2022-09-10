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
		isPasswordConfirmed: boolean;
	};
	type: "login" | "register" | "chat" | "activate";
};

const Main = (props: Props) => {
	const { data, type } = props;
	const { setType, setLoggedUserData, setCurrentUser, loggedUserData } = data;
	const handleOnLogin = (username: string, id: string) => {
		setLoggedUserData(username);
		setCurrentUser(id);
	};
	const children = () => {
		switch (type) {
			case "login":
				return (
					<LogIn
						logged={loggedUserData}
						onChange={(type, set) => {
							setType(type);
							set();
						}}
						onLogin={handleOnLogin}
					/>
				);
			case "register":
				return (
					<LogIn
						logged={loggedUserData}
						register
						onChange={(type, set) => {
							setType(type);
							set();
						}}
					/>
				);
			case "activate":
				return (
					<LogIn
						// register
						activate
						logged={loggedUserData}
						onChange={(type, set) => {
							setType(type);
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
