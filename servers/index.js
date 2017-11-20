const Models = require('./schema')
module.exports = function (apiRoutes) {
  apiRoutes.get('/customer/find', (req, res) => {
    Models.Customer.find({}, (err, doc) => {
      if (err) {
         console.log(err)
      } else if (doc) {
        res.send(JSON.stringify(doc))
      }
    })
  })
  apiRoutes.post('/customer/save', (req, res) => {
    Models.Customer(req.body)
      .save()
      .then(() => {
        res.status(200).end()
      })
      .catch(() => res.status(500).end())
  })
}
