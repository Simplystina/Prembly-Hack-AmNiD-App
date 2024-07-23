import axios from 'axios'
import  Router  from 'next/router'

const server = axios.create({
  baseURL: 'https://amnid-5p3h.onrender.com',
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
})

server.interceptors.request.use((config) => {
  let tokenData = localStorage.getItem("token")
 // console.log(tokenData,"token")
 
  
 if (tokenData) {
	//console.log(config)
    config.headers['Authorization'] = `Bearer ${tokenData}`
  }
  return config
})

server.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
   
    if (err.response && err.response.status === 401) {
      console.log(err, "errrrrrrrrr hereeeeeeeeeeee")
      localStorage.clear()
    }
    return Promise.reject(err)
  },
)

export default server


export const loginAndStoreToken = (token, user) => {
	
	localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user))
};


export const logoutUser = ()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
	
	const prevPath = Router.pathname;
	let redirectUrl = `/login?redirect=${prevPath}`;
	Router.push(redirectUrl);
}