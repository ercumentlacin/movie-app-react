import React from "react";
import "./input.style.css";
interface Props extends React.ComponentPropsWithoutRef<"input"> {
	label?: string;
}

const Input = (props: Props) => {
	return (
		<div className="input-container">
			{props.label && <label htmlFor={props.id}>{props.label}</label>}
			<input {...props} />
		</div>
	);
};

export default Input;
