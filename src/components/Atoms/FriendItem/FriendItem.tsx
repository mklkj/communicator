import React from "react";
import "./FriendItem.scss";

type Props = {
	value: any;
};

const FriendItem = (props: Props) => {
	const { value } = props;
	return <div className="friend-item">{value}</div>;
};

export default FriendItem;
