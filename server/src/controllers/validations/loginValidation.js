import Validator from 'validator'
import isEmpty from './is_empty'

const validateLoginInput = (data) => {
  let errors = {}
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  // Check valid email id
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // check email id is present or not
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  // check length of password length between 6 to 20
   if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 chars'
  }
  
  // check length is present or not 
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateLoginInput