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


export const getUserProfile = async(values) =>{
	const res = await axios.post('users/get_social_media', values)
	return res
}

export const updateProfile = async(values) =>{
	const res = await axios.patch('users/edit_user_info', values)
	console.log(res)
}
export const updateSocialMediaProfile = async(values) =>{
	const res = await axios.patch('users/edit_social_media', values)
	console.log(res)
}



export const createStore = async(values) =>{
	const res = await axios.post('stores/create', values)
	return res
}

export const getAllStores = async(id) =>{
	console.log(id, "idddddddddddddddd")
	const res = await axios.post('stores/fetch_all', { user_id: id } )
	return res
}
export const updateAStore = async(values) =>{
	
	const res = await axios.patch('stores/edit_store_info', values)
	return res
}

export const updateAStoreSocialMedia = async(values) =>{
	
	const res = await axios.patch('stores/edit_store_social_media', values )
	return res
}


export const getAStore = async(values) =>{
	
	const res = await axios.post('stores/fetch_one', values )
	return res
}

export const searchAVendor = async(search_word)=>{
	
	const res = await axios.post('search/search_vendor', { text: search_word } )
	return res
}
export const rateAVendor = async(values)=>{
	
	const res = await axios.post('ratings/rate_vendor', values )
	return res
}
export const getBankList = async()=>{
	const res = await axios.get('bank/get_banks')
	return res
}
export const getAccountName = async(values)=>{
	const res = await axios.post('bank/get_account_name', values )
	return res
}

export const verify = async(values)=>{
	const res = await axios.post('verify/verify_account', values)
	return res
}

export const getRatings = async(values)=>{
	const res = await axios.post('ratings/get_ratings',values)
	return res
}


export const getVendorRatings = async(values)=>{
	const res = await axios.post('ratings/get_ratings',values)
	return res
}
