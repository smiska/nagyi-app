require('../models/User')

const mongoose = require('mongoose')
const config = require('../config/keys')

mongoose.Promise = Promise
mongoose.connect(config.mongoURI, { useMongoClient: true })
