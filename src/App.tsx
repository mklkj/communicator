import React from "react";
import "./App.scss";
import Main from "./components/Organisms/Main/Main";
import useApp from "./helpers/useApp";

const App = () => {
	const { messages, setMessages, friends, isLoggedIn, setLogIn } = useApp();

	return (
		<div className="app">
			<Main
				type={ isLoggedIn ? `chat` : `login` }
				data={{ messages, setMessages, friends, setLogIn }}
			/>
		</div>
	);
};

export default App;
