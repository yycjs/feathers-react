title: Feathers + React
output: index.html
theme: theme
controls: false
logo: theme/logo.png

-- centered

<img src="img/feathers-logo.png" alt="Feathers logo" style="margin-top: 2em;" />
<h2>+</h2>
<img src="img/react-logo.png" alt="React logo" style="width: 250px;" />

--

## So what is it?

> A batteries-included, modular JavaScript library for creating real-time applications.

- Out-of-the-box service-oriented REST and real-time APIs
- Universally usable in NodeJS, React Native and the browser
- Supports 15+ databases, 3+ ORMs
- Works with any client side stack
- Drop-in replacement for Express 4
- JWT authentication

-- centered

## Where it fits in

<img src="img/feathers-venn.jpeg" alt="Where Feathers fits in" style="margin-top: 1em; width: 70%;" />

--

## Services

> CRUD resources that can be used like an Express middleware:

```javascript
const feathers = require('feathers');
const app = feathers();

const myService = {
  find(params) {},
  get(id, params) {},
  create(data, params) {},
  update(id, data, params) {},
  patch(id, data, params) {},
  remove(id, params) {},
  setup(app, path) {}
}

// Use it in your application at the `/todos` endpoint
app.use('/todos', myService);
```

-- centered

## Hooks

> Pluggable middleware that runs before and after a service method:


<img src="img/feathers-hooks.png" alt="Feathers hooks" style="width: 60%;" />

--

## Implementing Hooks

```javascript
const hooks = require('feathers-hooks');

app.configure(hooks());
app.service('todos').before({
  create(hook) {
    hook.data.createdAt = new Date();
  }
}).after({
  create(hook) {
    return sendEmail(hook.data)
      .then(() => hook);
  }
});
```

-- presenter

![David Luecke](http://gravatar.com/avatar/a14850281f19396480bdba4aab2d52ef?s=200)

## David Luecke

* [<i class="fa fa-github"></i> daffl](https://github.com/daffl)
* [<i class="fa fa-twitter"></i> @daffl](http://twitter.com/daffl)


[yycjs.com/feathers-react](http://yycjs.com/feathers-react)
