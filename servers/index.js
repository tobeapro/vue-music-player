const Models = require('./schema')
module.exports = function (apiRoutes) {
  apiRoutes.get('/user/find', (req, res) => {
    setTimeout(function () {
      res.status(500).end()
    }, 2000)
    Models.User.find({}, (err, doc) => {
      if (err) {
         console.log(err)
      } else if (doc) {
        res.send(JSON.stringify(doc))
      }
    })
  })
  apiRoutes.post('/user/query', (req, res) => {
    setTimeout(function () {
      res.status(500).end()
    }, 2000)
    Models.User.find(req.body, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        res.send(JSON.stringify(doc))
      }
    })
  })
  apiRoutes.post('/user/save', (req, res) => {
    setTimeout(function () {
      res.status(500).end()
    }, 2000)
    Models.User(req.body)
      .save()
      .then(() => {
        res.status(200).end()
      })
      .catch(() => res.status(500).end())
  })
  apiRoutes.post('/musicList/save', (req, res) => {
    setTimeout(function () {
      res.status(500).end()
    }, 2000)
    Models.Music.find(req.body, (err, res2) => {
      if (err) {
        res.status(500).end()
      } else {
        if (res2.length === 0) {
          Models.Music(req.body)
            .save()
            .then(() => {
              res.status(200).end()
            })
            .catch(() => {
              res.status(500).end()
            })
        } else {
          res.status(202).end()
        }
      }
    })
  })
  apiRoutes.post('/musicList/del', (req, res) => {
    setTimeout(function () {
      res.status(500).end()
    }, 2000)
    Models.Music.find(req.body)
      .remove()
      .then(() => {
        res.status(200).end()
      })
      .catch(() => res.status(500).end())
  })
  apiRoutes.get('/musicList/getList', (req, res) => {
    setTimeout(function () {
      res.status(500).end()
    }, 2000)
    Models.Music.find({}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        res.send(JSON.stringify(doc))
      }
    })
  })
  apiRoutes.post('/musicList/saveList', (req, res) => {
    setTimeout(function () {
      res.status(500).end()
    }, 2000)
    if (Object.prototype.toString.call(req.body) === '[object Array]') {
      req.body.forEach(item => {
        Models.Music(item)
          .save()
          .catch(() => {
            res.status(500).end()
          })
      })
      res.status(200).end()
    } else {
      res.status(202).send('参数有误').end()
    }
  })
}
