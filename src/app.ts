import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import {Routes} from "./routes";

export class App {
  public readonly expressApp: express.Express = express();
  private readonly isProduction = process.env.NODE_ENV === 'production';

  constructor() {
    dotenv.load({path: '.env'});

    this.initDb();
    this.initServer();
  }

  private initDb(): void {
    (<any>mongoose).Promise = global.Promise;
    const mongodbURI = this.isProduction ? process.env.MONGODB_URI : process.env.MONGODB_DEV_URI;
    mongoose.connect(mongodbURI, {useMongoClient: true});
    mongoose.connection.on("connected", () => console.log(`Connected to database ${mongodbURI}`));
    mongoose.connection.on("error", (err) => console.log(`Database error: ${err}`));
  }

  private initServer(): void {
    this.addMiddleware();
    Routes.setRoutes(this.expressApp);
  }

  private addMiddleware(): void {
    this.expressApp.use(cors());
    this.expressApp.use(compression());
    this.expressApp.use(morgan(this.isProduction ? 'combined' : 'dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(helmet())
  }
}
