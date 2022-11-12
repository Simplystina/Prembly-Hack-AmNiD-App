import axios from "./api"

export const loginUser = async (values) => {
	const res = await axios.post(`users/login`, values);
	console.log(res, "resss")
	return res
};
export const registerUser = async (values) => {

	const res = await axios.post(`users/create`, values,);
	return res
};