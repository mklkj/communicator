import React, {useState} from "react";
import "./MessageField.scss";
import {Message} from "../../../helpers/useApp";

type Props = {
	onChange: { setMessages: (message: any) => void };
	className?: string;
};

const MessageField = (props: Props) => {
	const className = props.className;
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
		setInputValue("");
	};

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
