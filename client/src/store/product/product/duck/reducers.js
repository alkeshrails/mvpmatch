/* eslint-disable default-case */
import { Record } from "immutable"
import { assign } from "lodash"
import * as type from "./action-types"
import { INIT, LOADING, SUCCESS, ERROR } from "../../../../utils/constants"
import _ from 'lodash'
const InitialStateInterface = {
  phase: INIT,
  error: null,
  products:[],
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
    case type.FETCH_PRODUCT: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.FETCH_PRODUCT_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("products", payload.data)
        .set("error", null)
    }
    case type.FETCH_PRODUCT_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }
 
    default: {
      return state
    }
  }
}
