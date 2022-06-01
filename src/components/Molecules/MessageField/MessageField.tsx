import React, { useRef, useState } from "react";
import "./MessageField.scss";

type Props = {
	onChange: { setMessages: (message: any) => void };
};

const MessageField = (props: Props) => {
	const { setMessages } = props.onChange;
	const dummy = useRef<any>();

	const [inputValue, setInputValue] = useState("");

	const handleOnClick = async (e: any) => {
		const userMessage = (data: { id: number }, text: string) => ({
			id: data?.id,
			avatar: "",
			text,
			uid: true,
		});
		e.preventDefault();
		setMessages((message: any) => [
			...message,
			userMessage({ id: message.length + 1 }, inputValue ? inputValue : "👍"),
		]);
		setInputValue("");
	};

	console.log(inputValue);

	return (
		<div className="message-field">
			<input
				className="message-field-input"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="say something nice"
			/>

			<button
				className="message-field-button"
				type="submit"
				onClick={handleOnClick}
			>
				{!inputValue ? "👍" : "Send"}
			</button>
		</div>
	);
};

export default MessageField;
