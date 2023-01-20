import axios from "axios"

const HOSTNAME = "http://localhost:8000"
const config = {
	headers:{
	  'x-access-token': localStorage.getItem('token'),
	}
  };

export const createProduct = async(data) => {
    try {
       const response = axios.post(`${HOSTNAME}/api/v1/auth/product`, data, config)
       return response;
    }catch(error) {
       throw new Error(error)
    }
}

export const deleteProduct = async(data) => {
    try {
       const response = axios.delete(`${HOSTNAME}/api/v1/auth/product?_id=${data._id}`,config)
       return response;
    }catch(error) {
       throw new Error(error)
    }
}

export const updateProduct = async(data) => {
    try {
       const response = axios.put(`${HOSTNAME}/api/v1/auth/product`, data, config)
       return response;
    }catch(error) {
       throw new Error(error)
    }
}

export const fetchProductById = async(data) => {
    try {
       const response = axios.get(`${HOSTNAME}/api/v1/auth/product-by-id`, config)
       return response;
    }catch(error) {
       throw new Error(error)
    }
}


export const fetchProduct = async(data) => {
   try {
      const response = axios.get(`${HOSTNAME}/api/v1/auth/product`, config)
      return response;
   }catch(error) {
      throw new Error(error)
   }
}

export const purchaseProduct = async(data) => {
   try {
      const response = axios.post(`${HOSTNAME}/api/v1/auth/purchase-product`, data, config)
      return response;
   }catch(error) {
      throw new Error(error)
   }
}

export const depositAmount = async(data) => {
   try {
      const response = axios.post(`${HOSTNAME}/api/v1/auth/deposit`, data, config)
      return response;
   }catch(error) {
      throw new Error(error)
   }
}





