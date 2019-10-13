const AWS = require('aws-sdk')
const uuid = require('uuid/v1')
const { accessKeyId, secretAccessKey } = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  endpoint: 's3-eu-central-1.amazonaws.com',
  signatureVersion: 'v4',
  region: 'eu-central-1'
})

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`

    s3.getSignedUrl('putObject',
      {
        Bucket: 'nagyi-app',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => res.send({ key, url })
    )
  })
}