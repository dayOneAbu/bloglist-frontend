import axios from 'axios';
import { getStorageItem, removeStorageItem } from '../utils/storageHelpers';
const baseUrl = 'http://localhost:3003/api';

const getAll = async () => {
	const res = await axios.get(`${baseUrl}/blogs`);
	return res.data;
};
const LogUserIn = async (data) => {
	const res = await axios.post(`${baseUrl}/login/`, data);
	return res.data;
};
const LogUserOut = async () => {
	removeStorageItem('loggedUserToken');
	removeStorageItem('loggedUser');
};
const getLoggedUser = async () => {
	const token = getStorageItem('loggedUserToken');
	const config = {
		headers: { Authorization: `bearer ${token}` },
	};
	const res = await axios.get(`${baseUrl}/users/me`, config);
	return res.data;
};
const addNewPost = async (data) => {
	const token = getStorageItem('loggedUserToken');
	const config = {
		headers: { Authorization: `bearer ${token}` },
	};
	const res = await axios.post(`${baseUrl}/blogs/`, data, config);
	return res.data;
};
const addLike = async (id, data) => {
	const token = getStorageItem('loggedUserToken');
	const config = {
		headers: { Authorization: `bearer ${token}` },
	};
	const res = await axios.put(`${baseUrl}/blogs/${id}`, data, config);
	return res.data;
};
const deletePost = async (id) => {
	const token = getStorageItem('loggedUserToken');
	const config = {
		headers: { Authorization: `bearer ${token}` },
	};
	const res = await axios.delete(`${baseUrl}/blogs/${id}`, config);
	return res.data;
};

export {
	addLike,
	getAll,
	deletePost,
	LogUserIn,
	LogUserOut,
	getLoggedUser,
	addNewPost,
};
