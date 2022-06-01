import { useState } from "react";
const useApp = () => {
	const [messages, setMessages] = useState<
		{ id: number; avatar: string; uid: string | boolean; text: string }[]
	>([
		{ id: 1, avatar: "", uid: "", text: "ffff" },
		{ id: 2, avatar: "", uid: "", text: "ffff" },
		{ id: 3, avatar: "", uid: "", text: "ffff" },
		{ id: 4, avatar: "", uid: "", text: "ffff" },
		{ id: 5, avatar: "", uid: true, text: "ffff" },
		{ id: 6, avatar: "", uid: "", text: "ffff" },
		{ id: 7, avatar: "", uid: "", text: "ffff" },
		{ id: 8, avatar: "", uid: "", text: "ffff" },
		{ id: 9, avatar: "", uid: "", text: "ffff" },
		{ id: 10, avatar: "", uid: "", text: "ffff" },
		{ id: 11, avatar: "", uid: "", text: "ffff" },
		{ id: 12, avatar: "", uid: "", text: "ffff" },
		{ id: 13, avatar: "", uid: "", text: "ffff" },
	]);
	const [friends, setFriends] = useState<any>(["adam", "michal", "szymon"]);
	return { messages, setMessages, friends };
};

export default useApp;
