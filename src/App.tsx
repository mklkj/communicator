import React from "react";
import "./App.scss";
import Header from "./components/Molecules/Header/Header";
import useHeader from "./components/Molecules/Header/useHeader";
import MessageField from "./components/Molecules/MessageField/MessageField";
import Main from "./components/Organisms/Main/Main";
import useApp from "./helpers/useApp";

const App = () => {
	const { friendsVisible, handleOnHeaderClick } = useHeader();
	const { messages, setMessages, friends } = useApp();

	console.log(messages);
	return (
		<div className="app">
			<Header
				visible={{ friendsVisible }}
				onClick={{
					handleOnHeaderClick: handleOnHeaderClick,
					handleOnSignOutClick: () => {},
				}}
			/>
			<Main data={{ messages, friends }} visible={{ friendsVisible }} />
			<MessageField onChange={{ setMessages }} />
		</div>
	);
};

export default App;
