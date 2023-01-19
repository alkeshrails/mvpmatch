//eslint-disable-next-line
import * as Rx from 'rxjs';
//import { from as fromPromise, Observable} from 'rxjs';
import Observable  from 'rxjs';
import { mergeMap } from "rxjs/operators"
import { combineEpics, ofType } from "redux-observable"

import * as api from "./api"
import * as type from "./action-types"
import axios from 'axios';



const loginUserEpic = action$ =>
action$.pipe(
  ofType(type.USER_LOGIN),
  mergeMap(action => {
    return Rx.Observable.fromPromise(api.loginUser(action.payload))
      .flatMap(payload => [
      {
        type: type.USER_LOGIN_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Rx.Observable.of({
          type: type.USER_LOGIN_ERROR,
          payload: { error }
        })
      )
  })
)

const registerUserEpic = action$ =>
action$.pipe(
  ofType(type.REGISTER_USER),
  mergeMap(action => {
    return Rx.Observable.fromPromise(api.registerUser(action.payload))
      .flatMap(payload => [
      {
        type: type.REGISTER_USER_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Rx.Observable.of({
          type: type.REGISTER_USER_ERROR,
          payload: { error }
        })
      )
  })
)

export default combineEpics(
  registerUserEpic , 
  loginUserEpic , 
  )
