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

export const createStore = async(values) =>{
	const res = await axios.post('stores/create', values)
	return res
}

export const updateProfile = async() =>{
	const res = await axios.patch()
}