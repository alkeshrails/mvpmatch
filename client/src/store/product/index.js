import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"


import productReducer, {   productCreateEpic, productFetchEpic,  ProductUpdateEpic, productDeleteEpic} from "./product"


export const productEpic = combineEpics(
    productCreateEpic,
    productFetchEpic,
    ProductUpdateEpic,
    productDeleteEpic
)

const userProductReducer = combineReducers({
  product: productReducer
})

export default userProductReducer
