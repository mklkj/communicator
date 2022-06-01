import React from "react";
import Chat from "../Chat/Chat";
import LogIn from "../LogIn/LogIn";

type Props = {
	data: { messages: any[]; friends: any[] };
	visible: { friendsVisible: boolean };
};

const Main = (props: Props) => {
	const { visible, data } = props;
	return <>{true ? <Chat visible={visible} data={data} /> : <LogIn />}</>;
};

export default Main;
