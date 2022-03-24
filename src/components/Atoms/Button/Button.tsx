import React, { ReactNode, ReactElement } from "react";
import "./Button.scss";

type Props = {
	children: ReactNode | ReactElement | ReactElement[];
	className?: string;
	onClick: () => void;
};

const Button = (props: Props) => {
	const { children, className, onClick } = props;
	return (
		<div className={`button ${className || ""}`}>
			<button onClick={onClick}>{children}</button>
		</div>
	);
};

export default Button;
