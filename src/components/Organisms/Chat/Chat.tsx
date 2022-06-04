import React, { useRef, useState } from "react";
import Message from "../../Atoms/Message/Message";
import SidePanel from "../../Molecules/SidePanel/SidePanel";
import "./Chat.scss";
import MessageField from "../../Molecules/MessageField/MessageField";

type Props = {
	data: { messages: any[]; setMessages: (message: any) => void, friends: any[] };
	visible: { friendsVisible: boolean };
};

const Chat = (props: Props) => {
	const { visible, data } = props;
	const { messages, setMessages, friends } = data;
	const { friendsVisible } = visible;

	return (
		<div className={`chat ${friendsVisible ? "chat--expanded" : ""}`}>
			<SidePanel
				options={friends}
				visible={friendsVisible}
				className={`chat__friends`}
			/>

			<div
				className={`chat__messages`}
            >
				{messages && messages.map((msg) => <Message key={msg.id} message={msg} />)}
			</div>
			<MessageField
                className={"chat__input"}
                onChange={{setMessages}} />
		</div>
	);
};

export default Chat;
