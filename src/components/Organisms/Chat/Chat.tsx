import React, {useEffect, useRef} from "react";
import "./Chat.scss";
import MessageItem from "../../Atoms/Message/MessageItem";
import SidePanel from "../../Molecules/SidePanel/SidePanel";
import MessageField from "../../Molecules/MessageField/MessageField";
import {Message, Person} from "../../../helpers/useApp";

type Props = {
	data: { messages: Message[]; setMessages: (message: any) => void, friends: Person[] };
	visible: { friendsVisible: boolean };
};

const Chat = (props: Props) => {
	const { visible, data } = props;
	const { messages, setMessages, friends } = data;
	const { friendsVisible } = visible;
	const messagesAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const domNode = messagesAreaRef.current || false;
		if (domNode) {
			domNode.scrollTop = domNode.scrollHeight;
		}
	});

	return (
		<div className={`chat ${friendsVisible ? "chat--expanded" : ""}`}>
			<SidePanel
				options={friends}
				visible={friendsVisible}
				className={`chat__friends`}
			/>

			<div
				ref={messagesAreaRef}
				className={`chat__messages`}
            >
				{messages && messages.map((msg) => <MessageItem key={msg.id} message={msg} />)}
			</div>
			<MessageField
                className={"chat__input"}
                onChange={{setMessages}} />
		</div>
	);
};

export default Chat;
