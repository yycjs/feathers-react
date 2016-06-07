const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');

const app = feathers();

const Sequelize = require('sequelize');
const sequelizeService = require('feathers-sequelize');

const sequelize = new Sequelize('postgres://daffl:@localhost:5432/feathers');
const Submissions = sequelize.define('submissions', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false
  },
  votes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  freezeTableName: true
});

Submissions.sync({ force: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.configure(rest());
app.configure(socketio());
app.configure(hooks());
app.use('/submissions', sequelizeService({
  Model: Submissions,
  // Enable pagination
  paginate: {
    default: 10,
    max: 25
  }
}));
app.use('/', feathers.static(__dirname));
app.use(handler());

app.listen(3030);