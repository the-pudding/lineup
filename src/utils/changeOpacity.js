const changeOpacity = (hex, a) => {
	const c = hex.startsWith("#") ? hex.slice(1) : hex;
	const r = parseInt(c.substring(0, 2), 16);
	const g = parseInt(c.substring(2, 4), 16);
	const b = parseInt(c.substring(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export default changeOpacity;
