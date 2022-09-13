const setStorageItem = (key, token) => {
	return localStorage.setItem(key, JSON.stringify(token));
};
const getStorageItem = (key) => {
	return JSON.parse(localStorage.getItem(key));
};
const removeStorageItem = (key) => {
	return localStorage.removeItem(key);
};

export { setStorageItem, getStorageItem, removeStorageItem };
