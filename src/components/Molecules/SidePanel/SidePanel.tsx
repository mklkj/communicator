import React from "react";
import FriendItem from "../../Atoms/FriendItem/FriendItem";
import "./SidePanel.scss";
import { Person } from "../../../helpers/useApp";

type Props = {
	className?: string;
	visible: boolean;
	options: Person[];
	onClick: Function;
};

const SidePanel = (props: Props) => {
	const { className, options, visible, onClick } = props;
	const handleOnClick = (name: string) => {
		onClick(name);
	};
	return (
		<div
			className={`side-panel ${className} ${
				!visible ? `side-panel--hidden` : ``
			}`}
		>
			{options.map((friend, key) => (
				<div key={key} onClick={() => handleOnClick(friend.username)}>
					<FriendItem value={friend} />
				</div>
			))}
		</div>
	);
};

export default SidePanel;
