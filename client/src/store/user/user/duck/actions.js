import * as type from './action-types'


export const userLogin = data => (
{
  type: type.USER_LOGIN,
  payload: data
})

export const registerUser = data => (
{
  type: type.REGISTER_USER,
  payload: data
})

export const initPhase = data => (
{
  type: type.INIT_PHASE,
  payload: data
})










