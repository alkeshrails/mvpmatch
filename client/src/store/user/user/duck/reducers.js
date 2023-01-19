/* eslint-disable default-case */
import { Record } from "immutable"
import { assign } from "lodash"
import * as type from "./action-types"
import { INIT, LOADING, SUCCESS, ERROR } from "../../../../utils/constants"
import _ from 'lodash'
const InitialStateInterface = {
  phase: INIT,
  error: null,
  data: [] ,
  loginMessage:'',
  loginStatus:false,
  users:[],
}

class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    super(assign(desiredValues))
  }
}

export default function(state = new InitialState(), action = {}) {
  switch (action.type) {

    

    //user login action
    case type.USER_LOGIN: {
      return state
      .set("phase", LOADING)
      .set("error", null)
      .set('loginStatus',false)
      .set('loginMessage','')
    }
    case type.USER_LOGIN_SUCCESS: {
      const { payload } = action
      localStorage.setItem('token', _.get(payload,'token',''));
      return state
        .set("phase", SUCCESS)
        .set("data", payload.data)
        .set("error", null)
        .set('loginStatus',payload.status)
        .set('loginMessage',payload.message)
    }
    case type.USER_LOGIN_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }


       //user register action
    case type.REGISTER_USER: {
      return state
      .set("phase", LOADING)
      .set("error", null)
      .set('loginStatus',false)
      .set('loginMessage','')
    }
    case type.REGISTER_USER_SUCCESS: {
      const { payload } = action
      localStorage.setItem('token', payload.token);
      return state
        .set("phase", SUCCESS)
        .set("data", payload.data)
        .set("error", null)
        .set('loginStatus',payload.status)
        .set('loginMessage',payload.message)
    }
    case type.REGISTER_USER_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

    case type.INIT_PHASE: {
      return state.set("orderMessage", '').set("phase", INIT)
    }
   
   
    default: {
      return state
    }
  }
}
