import { useState } from 'react';
import PropTypes from 'prop-types';
function Togglable({ children, buttonLabel }) {
	const [visible, setVisible] = useState(false);
	const toggleVisibility = () => {
		setVisible(!visible);
	};
	return (
		<span>
			<div style={{ display: visible ? 'none' : '' }}>
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			<div style={{ display: visible ? ' ' : 'none' }}>
				{children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</span>
	);
}
Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};
export default Togglable;
