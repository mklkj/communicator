import React, { useEffect, useRef } from "react";
import "./Chat.scss";
import MessageItem from "../../Atoms/Message/MessageItem";
import SidePanel from "../../Molecules/SidePanel/SidePanel";
import MessageField from "../../Molecules/MessageField/MessageField";
import { Message, Person } from "../../../helpers/useApp";
import Header from "../../Molecules/Header/Header";
import useHeader from "../../Molecules/Header/useHeader";

type Props = {
	data: {
		messages: Message[];
		setMessages: (message: any) => void;
		friends: Person[];
		setLogIn: (isLoggedIn: Boolean) => void;
		currentUser?: string;
		setCurrentUser: Function;
	};
};

const Chat = (props: Props) => {
	const { friendsVisible, handleOnHeaderClick } = useHeader();
	const { data } = props;
	const {
		messages,
		setMessages,
		friends,
		setLogIn,
		currentUser,
		setCurrentUser,
	} = data;
	const messagesAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// currentUser
		const domNode = messagesAreaRef.current || false;
		if (domNode) {
			domNode.scrollTop = domNode.scrollHeight;
		}
	}, []);

	return (
		<div className={`chat ${friendsVisible ? "chat--expanded" : ""}`}>
			<Header
				visible={{ friendsVisible }}
				className={`chat__header`}
				onClick={{
					handleOnHeaderClick: handleOnHeaderClick,
					handleOnSignOutClick: () => {
						setLogIn(false);
					},
				}}
			/>
			<SidePanel
				options={friends}
				visible={friendsVisible}
				onClick={setCurrentUser}
				className={`chat__friends`}
			/>

			<div ref={messagesAreaRef} className={`chat__messages`}>
				{messages &&
					messages.map((msg) => <MessageItem key={msg.id} message={msg} />)}
			</div>
			<MessageField
				className={"chat__input"}
				onChange={{ setMessages }}
				data={currentUser}
			/>
		</div>
	);
};

export default Chat;
