import React from "react";
import FriendItem from "../../Atoms/FriendItem/FriendItem";
import "./SidePanel.scss";
import {Person} from "../../../helpers/useApp";

type Props = {
	className?: string;
	visible: boolean;
	options: Person[];
};

const SidePanel = (props: Props) => {
	const { className, options, visible } = props;
	return (
		<div className={`side-panel ${className} ${!visible ? `side-panel--hidden` : ``}`}>
			{options.map((friend) => <FriendItem value={friend} />)}
		</div>
	);
};

export default SidePanel;
