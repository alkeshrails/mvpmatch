import productReducer from "./duck/reducers"
import deleteProductEpic from "./duck/epics"
import updateProductEpic from "./duck/epics"
import fetchProductEpic from "./duck/epics"
import createProductEpic from "./duck/epics"

export const productDeleteEpic = deleteProductEpic
export const ProductUpdateEpic = updateProductEpic
export const productFetchEpic = fetchProductEpic
export const productCreateEpic = createProductEpic

export default productReducer
