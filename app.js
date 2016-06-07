const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');

const r = require('rethinkdbdash')({
  db: 'feathers'
});
const rethinkdb = require('feathers-rethinkdb');

const app = feathers()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(rest())
  .configure(socketio())
  .configure(hooks())
  .use('/submissions', rethinkdb({
    Model: r,
    name: 'submissions',
    // Enable pagination
    paginate: {
      default: 10,
      max: 25
    }
  }))
  .use('/', feathers.static(__dirname))
  .use(handler());

app.service('submissions').before({
  create(hook) {
    hook.data.votes = 1;
  }
});

app.listen(3030);
