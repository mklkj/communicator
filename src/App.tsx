import React from "react";
import "./App.scss";
import Main from "./components/Organisms/Main/Main";
import useApp from "./helpers/useApp";

const App = () => {
	const { messages, setMessages, friends } = useApp();

	return (
		<div className="app">
			<Main
				type="chat"
				data={{ messages, setMessages, friends }}
			/>
		</div>
	);
};

export default App;
