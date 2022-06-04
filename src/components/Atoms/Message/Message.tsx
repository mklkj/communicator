import React from "react";
import "./Message.scss";

type Props = {
	message: any;
};

const Message = (props: Props) => {
	const { text, uid } = props.message;

	const messageClass = uid === true ? "sent" : "received";

	return (
		<>
			<div className={`message message--${messageClass}`}>
				<img
					className="message__avatar"
					src={"https://i.pravatar.cc/40?u=" + uid}
				/>
				<p>{text}</p>
			</div>
		</>
	);
};

export default Message;
