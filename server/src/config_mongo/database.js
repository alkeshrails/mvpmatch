import mongoose from 'mongoose'
import Config from './config'

const host = process.env.MONGODB_HOST || Config.config().database.host
const port = process.env.MONGODB_PORT || Config.config().database.port
const db = process.env.MONGODB_DB || Config.config().database.db_name

// Construct the URI from different parts
const mongodb_uri = 'mongodb://' + host + ':' + port + '/' + db

mongoose.connect(mongodb_uri,{ useUnifiedTopology: true, useNewUrlParser: true }, error => {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(`🐞 🐛 Failed to connect to mongodb\n\n\n${error} 🐛 🐞`)
    process.exit(1)
  }
  // eslint-disable-next-line no-console
  console.log(`🙌 💾 ${mongodb_uri} connected successfully 💽 🙌`)
})

export default mongoose