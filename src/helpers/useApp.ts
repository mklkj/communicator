import axios from "axios";
import { useState, useEffect } from "react";

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

const useApp = (token: string) => {
	const [isLoggedIn, setLogIn] = useState<Boolean>(false);
	const [loggedUserData, setLoggedUserData] = useState<any>(
		getCookie("user") ? getCookie("user") : ""
	);
	const [type, setType] = useState<"login" | "register" | "chat">(
		getCookie("token") || token ? "chat" : "login"
	);

	console.log(token, "COOKIE");
	useEffect(() => {
		token && setType("chat");
	}, [token]);

	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			avatar: "",
			sender: "62a2de9191de43c94d5a3b9b",
			text: "Litwo! Ojczyzno moja! Ty jesteś jak zdrowie",
		},
		{
			id: 2,
			avatar: "",
			sender: "629cc3afd830cd4d4b7894bd",
			text: "Ile cię trzeba cenić, ten tylko się dowie,\nKto cię stracił",
		},
		{
			id: 3,
			avatar: "",
			sender: "62a2de9191de43c94d5a3b9b",
			text: "Dziś piękność twą w całej ozdobie\nWidzę i opisuję, bo tęsknię po tobie",
		},
		{
			id: 4,
			avatar: "",
			sender: "629cc3afd830cd4d4b7894bd",
			text: "Panno święta, co Jasnej bronisz Częstochowy\nI w Ostrej świecisz Bramie!",
		},
		{
			id: 5,
			avatar: "",
			sender: "62a2de9191de43c94d5a3b9b",
			text: "Ty, co gród zamkowy\nNowogródzki ochraniasz z jego wiernym ludem!",
		},
		{
			id: 5,
			avatar: "",
			sender: "629cc3afd830cd4d4b7894bd",
			text: "Jak mnie dziecko do zdrowia powróciłaś cudem",
		},
		{
			id: 5,
			avatar: "",
			sender: "62a2de9191de43c94d5a3b9b",
			text: "Gdy od płaczącej matki, pod Twoją opiekę\nOfiarowany martwą podniosłem powiekę",
		},
		{
			id: 5,
			avatar: "",
			sender: "629cc3afd830cd4d4b7894bd",
			text: "I zaraz mogłem pieszo, do Twych świątyń progu\nIść za wrócone życie podziękować Bogu",
		},
		{
			id: 5,
			avatar: "",
			sender: "62a2de9191de43c94d5a3b9b",
			text: "Tak nas powrócisz cudem na Ojczyzny łono!...",
		},
		{
			id: 5,
			avatar: "",
			sender: "629cc3afd830cd4d4b7894bd",
			text: "Tymczasem, przenoś moją duszę utęsknioną\nDo tych pagórków leśnych, do tych łąk zielonych,\nSzeroko nad błękitnym Niemnem rozciągnionych",
		},
		{
			id: 5,
			avatar: "",
			sender: "62a2de9191de43c94d5a3b9b",
			text: "Do tych pól malowanych zbożem rozmaitem,\nWyzłacanych pszenicą, posrebrzanych żytem",
		},
		{
			id: 5,
			avatar: "",
			sender: "629cc3afd830cd4d4b7894bd",
			text: "Gdzie bursztynowy świerzop, gryka jak śnieg biała,\nGdzie panieńskim rumieńcem dzięcielina pała,",
		},
		{
			id: 5,
			avatar: "",
			sender: "62a2de9191de43c94d5a3b9b",
			text: "A wszystko przepasane jakby wstęgą, miedzą\nZieloną, na niej zrzadka ciche grusze siedzą",
		},
	]);
	const [friends, setFriends] = useState<Person[]>([]);
	const [currentUser, setCurrentUser] = useState<string>(
		getCookie("userId") as string
	);
	const [currentFriend, setCurrentFriend] = useState<string>();

	useEffect(() => {
		const getUsers = async () => {
			return await axios.get("http://localhost:3005/users/list").then((e) => {
				setFriends(e.data);
				setCurrentFriend(e.data[0]._id);
			});
		};
		try {
			getUsers().then((res) => console.log(res));
		} catch (err) {
			console.log(err);
		}
	}, []);
	console.log(currentUser, currentFriend, "TOKENS");
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
