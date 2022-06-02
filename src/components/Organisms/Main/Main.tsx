import React from "react";
import Chat from "../Chat/Chat";
import LogIn from "../LogIn/LogIn";

type Props = {
	data: { messages: any[]; friends: any[] };
	visible: { friendsVisible: boolean };
	type: string;
};

const Main = (props: Props) => {
	const { visible, data, type } = props;
	const children = () => {
		switch (type) {
			case "login":
				return <LogIn />;
			case "register":
				return <LogIn register />;
			case "chat":
				return <Chat visible={visible} data={data} />;
		}
	};

	return <>{children()}</>;
};

export default Main;
