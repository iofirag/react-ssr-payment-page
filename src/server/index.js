import express from "express"
import cors from "cors"
import { routes } from '../shared/routes'
import {RootStore} from '../shared/models/credit-card.model'
import render from './render'

const PORT = 3000;
const app = express()

app.use(cors())

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"))

app.get('/', (req, res, next) => {

  const defaultRoute = routes.find(item => item.path === '/')

  defaultRoute.fetchInitialData()
    .then((_initialDataRes) => {
      const { geonames } = _initialDataRes;
      const store = RootStore.create({
        geonames,
        creditCard: {}
      });

      const context = {}
      const content = render(req.path, store, context);
      res.send(content);
    }).catch(next)
})

app.get('/*', (req, res, next) => {
  res.redirect('/');
})

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));