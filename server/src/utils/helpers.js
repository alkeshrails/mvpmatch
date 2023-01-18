import _ from "lodash"
import Jwt from "jsonwebtoken"
import Config from "../config_mongo/config"

// Genrate random string
const randomString = (length) => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

// A function which check value like isEmpty
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

// Create jwt token using user information
const createJwtAuthToken = user => {
  const contents = {
    _id: _.get(user, "_id", ""),
    name: _.get(user, "name", ""),
    mail: _.get(user, "mail", ""),
    createdAt: Date.now()
  }
  const options = {
    key: Config.config().token.secret,
    expires: "50m",
    verifyOptions: { algorithms: ["HS256"] }
  }

  const token = Jwt.sign(contents, options.key, {
    algorithm: options.verifyOptions.algorithms[0],
    expiresIn: options.expires
  })

  return token
}

//Verfication token and decode token return user information
const getMe = token => {
  try {
    const decodedToken = Jwt.verify(token,  Config.config().token.secret)
    console.log({ decodedToken })
    return decodedToken
  } catch(error) {
    console.log({error})
    return false
  }
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  Jwt.verify(token, Config.config().token.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const helper = { randomString, isEmpty, createJwtAuthToken, verifyToken, getMe }

export default helper