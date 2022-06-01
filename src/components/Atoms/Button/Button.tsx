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
		<button className={`button ${className || ""}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
