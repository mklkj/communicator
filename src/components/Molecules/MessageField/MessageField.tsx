import React, { useEffect, useState } from "react";
import "./MessageField.scss";
import { Message } from "../../../helpers/useApp";
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

type Props = {
	onChange: { setMessages: (message: any) => void };
	className?: string;
	data: any;
};

const MessageField = (props: Props) => {
	const { className, data } = props;
	const { setMessages } = props.onChange;

	const [inputValue, setInputValue] = useState("");

	const handleOnClick = async (e: any) => {
		const userMessage = (data: { id: number }, text: string) => ({
			id: data?.id,
			avatar: "",
			text,
			uid: true,
		});
		e.preventDefault();
		setMessages((message: Message[]) => [
			...message,
			userMessage({ id: message.length + 1 }, inputValue ? inputValue : "👍"),
		]);
		socket.emit("send_message", { message: inputValue });
		setInputValue("");
	};

	useEffect(() => {
		console.log(socket);
		socket.on("receive_message", (data) => {
			console.log(data.message);
		});
		socket.on("send_message", (data) => {
			console.log(data.message);
		});
	}, [inputValue]);

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
