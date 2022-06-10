import React from "react";
import "./Message.scss";
import { Message } from "../../../helpers/useApp";

type Props = {
	message: Message;
	value: any;
};

const MessageItem = (props: Props) => {
	const value = props.value;
	const { text, uid, sender } = props.message;

	const messageClass = sender === value ? "sent" : "received";

	return (
		<>
			<div className={`message message--${messageClass}`}>
				<img
					className="message__avatar"
					src={sender === value ? "/male1.jpg" : "/male2.jpg"}
				/>
				<p>{text}</p>
			</div>
		</>
	);
};

export default MessageItem;
