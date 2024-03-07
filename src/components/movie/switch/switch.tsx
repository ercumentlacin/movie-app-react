import { ComponentPropsWithoutRef } from "react";
import "./switch.style.css";
interface Props extends ComponentPropsWithoutRef<"input"> {}

const Switch = (props: Props) => {
	return (
		<label className="switch">
			<input type="checkbox" {...props} />
			<span className="slider round" />
		</label>
	);
};

export default Switch;
