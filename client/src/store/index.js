import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { reducer as formReducer } from "redux-form"
import thunk from "redux-thunk"
import { createPromise } from 'redux-promise-middleware'
import { createEpicMiddleware, combineEpics } from "redux-observable"
//import adminReducer, { adminEpic } from "./admin"
import userReducer, { UserEpic } from "./user"
import productReducer, {productEpic} from "./product" 

// Combine Epics
const rootEpic = combineEpics(UserEpic, productEpic)
 
// Creating Bundled Epic
const epicMiddleware = createEpicMiddleware()

// Use Middleware for call success and error reducer
const middleware = [thunk, createPromise(), epicMiddleware]

// Combine Reducers to return combine reducer
const reducers = combineReducers({
  //admin: adminReducer,
  user:userReducer,
  product: productReducer,
  form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create Store
export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
)

epicMiddleware.run(rootEpic)
