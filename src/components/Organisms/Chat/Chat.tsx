import React, { useRef, useState } from "react";
import Message from "../../Atoms/Message/Message";
import SidePanel from "../../Molecules/SidePanel/SidePanel";
import "./Chat.scss";

type Props = {
	data: { messages: any[]; friends: any[] };
	visible: { friendsVisible: boolean };
};

const Chat = (props: Props) => {
	const { visible, data } = props;
	const { messages, friends } = data;
	const { friendsVisible } = visible;

	return (
		<div className={`chat ${friendsVisible ? "chat-visible" : ""}`}>
			<SidePanel
				options={friends}
				visible={friendsVisible}
				className={friendsVisible ? "chat-friends" : ""}
			/>

			<div
				className={`chat-messages ${
					friendsVisible ? "chat-messages-friends" : ""
				}`}
			>
				{messages &&
					messages.map((msg) => <Message key={msg.id} message={msg} />)}
			</div>
		</div>
	);
};

export default Chat;
