const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'King of kings';
});

app.listen(8080);