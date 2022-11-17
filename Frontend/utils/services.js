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

export const updateProfile = async(values) =>{
	const res = await axios.patch('users/edit_user_info', values)
	console.log(res)
}
export const getAllStores = async(id) =>{
	console.log(id, "idddddddddddddddd")
	const res = await axios.post('stores/fetch_all', { user_id: id } )
	return res
}

export const searchAVendor = async(search_word)=>{
	
	const res = await axios.post('search/search_vendor', { text: search_word } )
	return res
}