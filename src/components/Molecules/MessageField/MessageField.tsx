import React, { useEffect, useState } from "react";
import "./MessageField.scss";
import { Message } from "../../../helpers/useApp";

type Props = {
	onChange: { setMessages: (message: any) => void };
	className?: string;
	socket: any;
	data: any;
	sender?: string;
	receiver?: string;
};

const MessageField = (props: Props) => {
	const { className, socket, sender, receiver } = props;
	const { setMessages } = props.onChange;

	const [inputValue, setInputValue] = useState("");

	const handleOnClick = async (e: any) => {
		e.preventDefault();
		const message = {
			uid: sender,
			receiver: receiver,
			sender: sender,
			text: inputValue ? inputValue : "👍",
			timestamp: +new Date(),
		};
		socket.emit("add_message", message);
		setInputValue("");
	};

	useEffect(() => {
		if (socket == null) return;

		socket.on("new_message", (data: any) => {
			console.log(data, sender);
			(sender === data.receiver || sender === data.sender) &&
				setMessages((messages: Message[]) => [...messages, data]);
		});
	}, [socket]);

	return (
		<form className={`message-field ${className}`}>
			<input
				className="message-field__input"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="say something nice"
			/>

			<button
				className="message-field__button"
				type="submit"
				onClick={handleOnClick}
			>
				{!inputValue ? "👍" : "Send"}
			</button>
		</form>
	);
};

export default MessageField;
