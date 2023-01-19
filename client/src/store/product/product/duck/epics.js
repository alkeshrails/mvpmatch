//eslint-disable-next-line
import * as Rx from 'rxjs';
//import { from as fromPromise, Observable} from 'rxjs';
import Observable  from 'rxjs';
import { mergeMap } from "rxjs/operators"
import { combineEpics, ofType } from "redux-observable"

import * as api from "./api"
import * as type from "./action-types"

const createProductEpic = action$ =>
action$.pipe(
  ofType(type.USER_LOGIN),
  mergeMap(action => {
    return Rx.Observable.fromPromise(api.createProduct(action.payload))
      .flatMap(payload => [
      {
        type: type.FETCH_PRODUCT_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Rx.Observable.of({
          type: type.FETCH_PRODUCT_ERROR,
          payload: { error }
        })
      )
  })
)

const deleteProductEpic = action$ =>
action$.pipe(
  ofType(type.USER_LOGIN),
  mergeMap(action => {
    return Rx.Observable.fromPromise(api.createProduct(action.payload))
      .flatMap(payload => [
      {
        type: type.DELETE_PRODUCT_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Rx.Observable.of({
          type: type.DELETE_PRODUCT_ERROR,
          payload: { error }
        })
      )
  })
)


const updateProductEpic = action$ =>
action$.pipe(
  ofType(type.USER_LOGIN),
  mergeMap(action => {
    return Rx.Observable.fromPromise(api.updateProduct(action.payload))
      .flatMap(payload => [
      {
        type: type.UPDATE_PRODUCT_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Rx.Observable.of({
          type: type.UPDATE_PRODUCT_ERROR,
          payload: { error }
        })
      )
  })
)

const fetchProductEpic = action$ =>
action$.pipe(
  ofType(type.USER_LOGIN),
  mergeMap(action => {
    return Rx.Observable.fromPromise(api.fetchProduct(action.payload))
      .flatMap(payload => [
      {
        type: type.FETCH_PRODUCT_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Rx.Observable.of({
          type: type.FETCH_PRODUCT_ERROR,
          payload: { error }
        })
      )
  })
)

export default combineEpics(
  createProductEpic,
  deleteProductEpic,
  updateProductEpic,
  fetchProductEpic
)
