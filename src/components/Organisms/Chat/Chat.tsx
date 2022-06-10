import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import MessageItem from "../../Atoms/Message/MessageItem";
import SidePanel from "../../Molecules/SidePanel/SidePanel";
import MessageField from "../../Molecules/MessageField/MessageField";
import { Message, Person } from "../../../helpers/useApp";
import Header from "../../Molecules/Header/Header";
import useHeader from "../../Molecules/Header/useHeader";
import io from "socket.io-client";

type Props = {
	data: {
		messages: Message[];
		setMessages: (message: any) => void;
		friends: Person[];
		setLogIn: (isLoggedIn: Boolean) => void;
		currentUser?: string;
		setCurrentUser: Function;
		loggedUserData: any;
		setLoggedUserData: Function;
	};
};

const Chat = (props: Props) => {
	const [socket, setSocket] = useState<any>(null);

	const { friendsVisible, handleOnHeaderClick } = useHeader();
	const { data } = props;
	const {
		messages,
		setMessages,
		friends,
		setLogIn,
		currentUser,
		setCurrentUser,
		loggedUserData,
	} = data;
	const messagesAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// currentUser
		const domNode = messagesAreaRef.current || false;
		if (domNode) {
			domNode.scrollTop = domNode.scrollHeight;
		}
	});

	useEffect(() => {
		const newSocket = io(`http://${window.location.hostname}:3001`); // todo: add some token to url?
		setSocket(newSocket);
		return () => {
			newSocket.close();
		};
	}, [setSocket]);

	return (
		<div className={`chat ${friendsVisible ? "chat--expanded" : ""}`}>
			<Header
				visible={{ friendsVisible }}
				className={`chat__header`}
				text={loggedUserData}
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
				socket={socket}
				onChange={{ setMessages }}
				data={currentUser}
			/>
		</div>
	);
};

export default Chat;
