import axios from 'axios'


const server = axios.create({
  baseURL: 'https://amnid-production.up.railway.app/',
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
})

server.interceptors.request.use((config) => {
  let tokenData = localStorage.getItem("token")
  console.log(tokenData,"token")
 
 if (tokenData) {
	console.log(config)
    config.headers['Authorization'] = `Bearer ${tokenData}`
  }
  return config
})

server.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
   
    /*if (err.response && err.response.status === 401) {
      localStorage.clear()
    }*/
    return Promise.reject(err)
  },
)

export default server

export const logoutUser = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expiry_time");
	localStorage.removeItem("remember_me ");

	// destroyCookie(null, 'token')
	// destroyCookie(null, 'expiry_time')
	// destroyCookie(null, 'remember_me')

	const prevPath = Router.pathname;
	let redirectUrl = prevPath.match(/admin/g) ? "/auth/admin" : "/auth/driver";
	redirectUrl += `/login?redirect=${prevPath}`;
	Router.push(redirectUrl);
};
export const loginAndStoreToken = (token) => {
	//console.log(token, "the error")
	localStorage.setItem("token", token);
};