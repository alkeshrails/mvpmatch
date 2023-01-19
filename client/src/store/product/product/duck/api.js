import axios from "axios"

const HOSTNAME = "http://localhost:8000"



 export const createProduct = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/product`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

 export const deleteProduct = data => {
 	return new Promise(async (resolve, reject) => {
     axios.delete(`${HOSTNAME}/api/v1/auth/product`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

export const updateProduct = data => {
	return new Promise(async (resolve, reject) => {
	axios.put(`${HOSTNAME}/api/v1/auth/register`, data)
	 .then(function (response) {
	   resolve(response.data);
	 })
	 .catch(function (error) {
	   reject(error);
	 });
  })
}

export const fetchProduct = data => {
	return new Promise(async (resolve, reject) => {
	axios.get(`${HOSTNAME}/api/v1/auth/register`, data)
	 .then(function (response) {
	   resolve(response.data);
	 })
	 .catch(function (error) {
	   reject(error);
	 });
  })
}



