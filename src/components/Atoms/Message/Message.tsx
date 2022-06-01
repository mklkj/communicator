import React from "react";
import "./Message.scss";

type Props = {
	message: any;
};

const Message = (props: Props) => {
	const { text, uid, photoURL } = props.message;

	const messageClass = uid === true ? "sent" : "received";

	return (
		<>
			<div className={`message ${messageClass}`}>
				<img
					src={
						photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
					}
				/>
				<p>{text}</p>
			</div>
		</>
	);
};

export default Message;
