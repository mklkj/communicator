import { useState, useEffect } from "react";
import { get, post } from "./api";

type Person = {
	_id: string;
	username: string;
};

type Message = {
	id: number;
	avatar: string;
	uid?: string | boolean;
	text: string;
	sender?: string;
	receiver?: string;
};

export const getCookie = (name: string) => {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
};

const useApp = (token: string, isPasswordConfirmed: boolean) => {
	const [isLoggedIn, setLogIn] = useState<Boolean>(false);
	const [loggedUserData, setLoggedUserData] = useState<any>(
		getCookie("user") ? getCookie("user") : ""
	);
	const isToken = getCookie("token") || token ? "chat" : "login";
	const isConfirmed =
		getCookie("isPasswordConfirmed") === undefined ||
		getCookie("isPasswordConfirmed") ||
		isPasswordConfirmed
			? isToken
			: "activate";
	const [type, setType] = useState<"login" | "register" | "chat" | "activate">(
		isConfirmed
	);

	useEffect(() => {
		if (token && !isPasswordConfirmed) {
			setType("activate");
			return;
		}
		token && setType("chat");
	}, [token]);

	const [messages, setMessages] = useState<Message[]>([]);
	const [friends, setFriends] = useState<Person[]>([]);
	const [currentUser, setCurrentUser] = useState<string>(
		getCookie("userId") as string
	);
	const [currentFriend, setCurrentFriend] = useState<string>();

	useEffect(() => {
		const getUsers = async () => {
			return await get("/users/list").then((e) => {
				const filteredCurrent = e.data.filter(
					(el: any) => el._id !== currentUser
				);
				setFriends(filteredCurrent);
				setCurrentFriend(filteredCurrent[0]._id);
			});
		};
		try {
			getUsers();
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		const getMessages = async () => {
			return await post("/user/messages", {
				uid: currentUser,
				friend: currentFriend,
			}).then((e) => {
				setMessages(e.data);
			});
		};
		try {
			if (currentFriend) getMessages();
		} catch (err) {
			console.log(err);
		}
	}, [currentFriend]);

	return {
		messages,
		setMessages,
		friends,
		setFriends,
		isLoggedIn,
		setLogIn,
		currentUser,
		setCurrentUser,
		type,
		setType,
		loggedUserData,
		setLoggedUserData,
		currentFriend,
		setCurrentFriend,
	};
};

export type { Person, Message };
export default useApp;
