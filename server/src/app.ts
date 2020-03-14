import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Controller } from "./main.controller";
import mongoose from "mongoose";
import bluebird from "bluebird";
import connectMongo from "connect-mongo";
import session from "express-session";
const MongoStore = connectMongo(session);

dotenv.config();
class App {
	public app: any;
	public pokeController: Controller;

	constructor() {
		this.app = express();
		this._setConfig();
		this._setMongoConfig();

		//Setup App Middleware
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));

		// app.use(userInViews());

		this.pokeController = new Controller(this.app);
	}

	private _setConfig() {
		this.app.use(bodyParser.json({ limit: "50mb" }));
		this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
		this.app.use(cors());
	}

	private _setMongoConfig() {
		mongoose.Promise = bluebird;

		// mongoose.connect(`${process.env.MONGO_URL}`, {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true
		// });
		new MongoStore({ url: `${process.env.MONGO_URL}` });
	}
}

export default new App().app;
