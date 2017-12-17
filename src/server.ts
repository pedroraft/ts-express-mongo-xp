import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import setRoutes from './routes';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5000;

dotenv.load({path: '.env'});

app.use(cors());
app.use(compression());
app.use(morgan(isProduction ? 'combined' : 'dev'));
app.use(bodyParser.json());

(<any>mongoose).Promise = global.Promise;
const mongodbURI = isProduction ? process.env.MONGODB_URI : process.env.MONGODB_DEV_URI;
mongoose.connect(mongodbURI, {useMongoClient: true});

setRoutes(app);
app.listen(port, () =>
  console.log(`Connected to MongoDB on: ${mongodbURI}, Running on: http://localhost:${port}`));
