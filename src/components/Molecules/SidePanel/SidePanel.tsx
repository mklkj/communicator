import React from "react";
import FriendItem from "../../Atoms/FriendItem/FriendItem";
import "./SidePanel.scss";

type Props = {
	className?: string;
	visible: boolean;
	options: any[];
};

const SidePanel = (props: Props) => {
	const { className, options, visible } = props;
	return (
		<div className={`side-panel ${className}`}>
			{visible && options.map((friend) => <FriendItem value={friend} />)}
		</div>
	);
};

export default SidePanel;
