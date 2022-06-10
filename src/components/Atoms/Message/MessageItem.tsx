import React from "react";
import "./Message.scss";
import { Message } from "../../../helpers/useApp";

type Props = {
	message: Message;
};

const MessageItem = (props: Props) => {
	const { text, uid } = props.message;

	const messageClass = uid ? "sent" : "received";

	return (
		<>
			<div className={`message message--${messageClass}`}>
				<img
					className="message__avatar"
					src={uid ? "/male1.jpg" : "/male2.jpg"}
				/>
				<p>{text}</p>
			</div>
		</>
	);
};

export default MessageItem;
