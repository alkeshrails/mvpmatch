import * as type from './action-types'


export const createProduct = data => (
{
  type: type.CREATE_PRODUCT,
  payload: data
})

export const deleteProduct = data => (
{
  type: type.DELETE_PRODUCT,
  payload: data
})

export const fetchProduct = data => (
{
  type: type.FETCH_PRODUCT,
  payload: data
})

export const updateProduct = data => (
  {
    type: type.UPDATE_PRODUCT,
    payload: data
  })









