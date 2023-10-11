import express from 'express';
import handlerbars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';
import userRouter from './routers/user.router.js';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { inicializePassport } from './config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import sessionsRouter from './routers/sessions.router.js';
import environment from './config/environment.js';
import { mailsRouter } from './routers/mails.router.js';
import { mockingProductsRouter } from './routers/mockingproducts.router.js';
import { errorsManagerMiddleware } from './middleware/errorsManager.middleware.js';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import { logsRouter } from './routers/logs.router.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger.config.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlerbars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(cookieParser('B2zdY3B$pHmxW%'));
inicializePassport(app);

app.use(passport.initialize());

mongoose.connect(environment.MONGO_URL);

const spects = swaggerJsDoc(swaggerOptions);

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: environment.MONGO_URL,
			mongoOptions: {
				useNewUrlParser: true,
			},
			ttl: 6000,
		}),
		secret: 'B2zdY3B$pHmxW%',
		resave: true,
		saveUninitialized: true,
	})
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spects));
app.use('/swagger.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(spects);	
})
app.use(loggerMiddleware);
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mails', mailsRouter);
app.use('/api/mockingproducts', mockingProductsRouter);
app.use('/api/loggerTest', logsRouter);
app.use(errorsManagerMiddleware);

export default app;