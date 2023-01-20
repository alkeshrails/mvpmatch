import axios from "axios"
const HOSTNAME = "http://localhost:8000"

const config = {
	headers:{
	  'x-access-token': localStorage.getItem('token'),
	}
  };


 export const LogIn = async(data) => {
     try {
        const response = axios.post(`${HOSTNAME}/api/v1/auth/login`, data)
        return response;
     }catch(error) {
        throw new Error(error)
     }
}

 export const signUp = data => {
   try {
      const response = axios.post(`${HOSTNAME}/api/v1/auth/register`, data)
      return response;
   }catch(error) {
      throw new Error(error)
   }
}

export const getMe = async(data) => {
   try {
      const response = axios.get(`${HOSTNAME}/api/v1/auth/getMe`, config)
      return response;
   }catch(error) {
      throw new Error(error)
   }
}






