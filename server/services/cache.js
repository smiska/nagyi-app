const mongoose = require('mongoose')
const util = require('util')
const redis = require('redis')
const redisURL = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisURL)
client.hget = util.promisify(client.hget)

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = async function (options = {}) {
  this.useCache = true
  this.hashKey = JSON.stringify(options.key) || ''
  return this
}

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return await exec.apply(this, arguments)
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  )
  const cachedValue = await client.hget(this.hashKey, key)

  if (cachedValue) {
    console.log('from cache')
    const doc = JSON.parse(cachedValue)

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(d)
  }

  const result = await exec.apply(this, arguments)

  client.hset(this.hashKey, key, JSON.stringify(result))
  console.log('from db')


  return result
}

module.exports = {
  clearCache(hashKey) {
    client.del(JSON.stringify(hashKey))
  }
}