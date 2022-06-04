import React, {useEffect, useRef} from "react";
import "./Chat.scss";
import MessageItem from "../../Atoms/Message/MessageItem";
import SidePanel from "../../Molecules/SidePanel/SidePanel";
import MessageField from "../../Molecules/MessageField/MessageField";
import {Message, Person} from "../../../helpers/useApp";
import Header from "../../Molecules/Header/Header";
import useHeader from "../../Molecules/Header/useHeader";

type Props = {
	data: {
		messages: Message[],
		setMessages: (message: any) => void,
		friends: Person[],
	};
};

const Chat = (props: Props) => {
	const { friendsVisible, handleOnHeaderClick } = useHeader();
	const { data } = props;
	const { messages, setMessages, friends } = data;
	const messagesAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const domNode = messagesAreaRef.current || false;
		if (domNode) {
			domNode.scrollTop = domNode.scrollHeight;
		}
	});

	return (
		<div className={`chat ${friendsVisible ? "chat--expanded" : ""}`}>
			<Header
				visible={{ friendsVisible }}
				className={`chat__header`}
				onClick={{
					handleOnHeaderClick: handleOnHeaderClick,
					handleOnSignOutClick: () => {},
				}}
			/>
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
