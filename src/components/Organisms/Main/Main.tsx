import React from "react";
import Chat from "../Chat/Chat";
import Login from "../Login/Login";

type Props = {
	data: { messages: any[]; setMessages: (message: any) => void, friends: any[] };
	visible: { friendsVisible: boolean };
	type: string;
};

const Main = (props: Props) => {
	const { visible, data, type } = props;
	const children = () => {
		switch (type) {
			case "login":
				return <Login />;
			case "register":
				return <Login register />;
			case "chat":
				return <Chat visible={visible} data={data} />;
		}
	};

	return <>{children()}</>;
};

export default Main;
