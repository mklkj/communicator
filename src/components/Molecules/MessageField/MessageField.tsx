import React, { useEffect, useState } from "react";
import "./MessageField.scss";
import { Message } from "../../../helpers/useApp";

type Props = {
	onChange: { setMessages: (message: any) => void };
	className?: string;
	socket: any,
	data: any;
};

const userMessage = (data: { id: number }, text: string) => ({
	id: data?.id,
	avatar: "",
	text: text,
	uid: true,
});

const MessageField = (props: Props) => {
	const { className, socket } = props;
	const { setMessages } = props.onChange;

	const [inputValue, setInputValue] = useState("");

	const handleOnClick = async (e: any) => {
		e.preventDefault();
		socket.emit("add_message", {
			text: inputValue ? inputValue : "👍",
		});
		setInputValue("");
	};

	useEffect(() => {
		if (socket == null) return;

		socket.on("new_message", (data: any) => {
			setMessages((messages: Message[]) => [...messages, data,]);
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
