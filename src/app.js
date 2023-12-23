//Imports
import express from 'express';
import winston from 'winston';
import logger from './utils/logger.js';
import config from './config/config.js';
import Handlebars from 'Handlebars';
import session from 'express-session';
import Store from 'express-session';
import cookieParser from 'cookie-parser';
import viewRouter from "./router/view.Router.js"
import productsRouter from "./router/products.Router.js"
import sessionRouter from './router/session.Router.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import cartRouter from "./router/carts.Router.js"
import __dirname from "./utils.js"
import { Server } from 'socket.io';
import cors from 'cors'
import ExpressHandlebars from 'express-handlebars';
import productManager from './dao/mongo/modelsManagers/productosManager.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import initializePassportStrategies from './config/passport.config.js';
import passport from 'passport';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import userRouter from './router/user.Router.js';



export const app = express ();

const PORT = config.app.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://gonzaloezemolina:gonzalo2013@cluster0.n8ds0sl.mongodb.net/ecommerce?retryWrites=true&w=majority",
    // mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl:15000
  }),
    secret: "c0d3rS3cr3t",
    resave: false,
    saveUninitialized: false,
  }))

  app.use(passport.initialize());
  app.use(passport.session());

  initializePassportStrategies()

//Handlebars
app.engine(
    'handlebars',
    ExpressHandlebars.engine({
      handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
  );
app.set("view engine", "handlebars" )
app.set("views", __dirname+ "/views")



//Rutas
app.use("/",viewRouter)
app.use("/api/sessions", sessionRouter);
app.use("/api",productsRouter);
app.use("/api",cartRouter)
app.use("/api/users", userRouter);



//Http
const server = app.listen(PORT, () =>{
    console.log(`Server HTTP is listening on PORT ${server.address().port}`);
})
server.on("error", error => console.log(`Error en el servidor ${error}`))


app.use((req,res,next) =>{
  logger.http(`${req.method} en ${req.url} a las ${new Date().toLocaleString()}`)
  next();
})

app.get('/loggerTest', (req, res) => {
  req.logger.debug('Creando usuario');
  req.logger.info('Registro de información');
  req.logger.warning('Warning');
  req.logger.error('Error');
  req.logger.fatal('Fatal');

  res.send('Prueba de logs realizada');
});



//Swagger
const swaggerSpecificsOptions = {
  definition:{
    openapi:"3.0.1",
    info:{
      title:"ControlStore docs",
      description:"Aplicacion Ecommerce de accesorios de juegos"
    }
  },
  apis:[`${__dirname}/docs/**/*.yml`],
}

const swaggerSpecification = swaggerJSDoc(swaggerSpecificsOptions)
app.use("/apidocs", 
  swaggerUiExpress.serve, 
  swaggerUiExpress.setup(swaggerSpecification)
);


//Mongo
mongoose.set('strictQuery', false)
const conexion = mongoose.connect(config.mongo.URL)