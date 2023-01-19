import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"


import userReducer, {   userLoginEpic, userRegisterEpic } from "./user"


export const UserEpic = combineEpics(
  userLoginEpic,
  userRegisterEpic
)

const userRegisterReducer = combineReducers({
 
  user: userReducer
 
})

export default userRegisterReducer
