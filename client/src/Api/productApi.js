import axios from "axios"

const HOSTNAME = "http://localhost:8000"
const config = {
	headers:{
	  'x-access-token': localStorage.getItem('token'),
	}
  };

  //Create product
export const createProduct = async(data) => {
    try {
       const response = axios.post(`${HOSTNAME}/api/v1/auth/product`, data, config)
       return response;
    }catch(error) {
       throw new Error(error)
    }
}

//Delete product
export const deleteProduct = async(data) => {
    try {
       const response = axios.delete(`${HOSTNAME}/api/v1/auth/product?_id=${data._id}`,config)
       return response;
    }catch(error) {
       throw new Error(error)
    }
}

//Update product
export const updateProduct = async(data) => {
    try {
       const response = axios.put(`${HOSTNAME}/api/v1/auth/product`, data, config)
       return response;
    }catch(error) {
       throw new Error(error)
    }
}

//Get product by Id
export const fetchProductById = async(data) => {
    try {
       const response = axios.get(`${HOSTNAME}/api/v1/auth/product-by-id`, config)
       return response;
    }catch(error) {
       throw new Error(error)
    }
}

//Get all product
export const fetchProduct = async(data) => {
   try {
      const response = axios.get(`${HOSTNAME}/api/v1/auth/product`, config)
      return response;
   }catch(error) {
      throw new Error(error)
   }
}

//Purchase product
export const purchaseProduct = async(data) => {
   try {
      const response = axios.post(`${HOSTNAME}/api/v1/auth/purchase-product`, data, config)
      return response;
   }catch(error) {
      throw new Error(error)
   }
}

//Deposit amount
export const depositAmount = async(data) => {
   try {
      const response = axios.post(`${HOSTNAME}/api/v1/auth/deposit`, data, config)
      return response;
   }catch(error) {
      throw new Error(error)
   }
}





