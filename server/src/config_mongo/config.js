import dotenv from 'dotenv'
dotenv.config()

const config = () => {
  var objConfig = {}

  // Site configuration
  objConfig.port = process.env.PORT || 3001
  objConfig.host = process.env.HOST || 'localhost'
  objConfig.siteUrl = 'http://localhost:3000'

  // Auth token 
  objConfig.token = {}
  objConfig.token.secret = process.env.JWT_SECRET || 'piQqgR98eAJJtF[92mRoAnV]U3}sUhtPd$z&vW]>h7%Us3R24ZL)Kb3)'
  objConfig.token.token_life = process.env.JWT_SECRET || 48
  objConfig.appSecret = process.env.APP_SECRET || 'eSrrxqt8MVAdJB6Xq9wzJZXdFq89MZo6'


  // MongoDB credentials
  objConfig.database = {}
  objConfig.database.host = process.env.MONGODB_HOST || 'localhost'
  objConfig.database.port = process.env.MONGODB_PORT || 27017
  objConfig.database.db_name = process.env.MONGODB_DB || 'project'

  return objConfig
}

export default { config }