import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import compose from 'koa-compose';
import logger from 'koa-logger';

const app = new Koa();
const router = new Router();

app.use(logger());

router.get('/', (context: any, next: any) => {
  context.body = 'Hello World!';
});

app.use(compose([
  bodyParser(),
  router.routes(),
]));
app.use(router.allowedMethods());
app.listen(process.env.PORT || 8080);
