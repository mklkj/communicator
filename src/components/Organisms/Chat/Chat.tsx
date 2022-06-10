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
		currentFriend: any;
		setCurrentFriend: Function;
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
		currentFriend,
		setCurrentFriend,
		loggedUserData,
	} = data;
	const messagesAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
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
						document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
						document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
						document.cookie =
							"currentDate=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
					},
				}}
			/>
			<SidePanel
				options={friends}
				visible={friendsVisible}
				value={currentFriend}
				onClick={setCurrentFriend}
				className={`chat__friends`}
			/>

			<div ref={messagesAreaRef} className={`chat__messages`}>
				{messages &&
					messages.map((msg) => (
						<MessageItem key={msg.id} message={msg} value={currentUser} />
					))}
			</div>
			<MessageField
				className={"chat__input"}
				socket={socket}
				onChange={{ setMessages }}
				sender={currentUser}
				receiver={currentFriend}
				data={currentUser}
			/>
		</div>
	);
};

export default Chat;
