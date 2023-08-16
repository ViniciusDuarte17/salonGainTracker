import express from "express";
import { ClientController } from "../controller/ClientController";
import { ClientDatabase } from "../data/ClientDatabase";
import { ClientBusiness } from "../business/ClientBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export const clientRouter = express.Router();

const idGenerator = new IdGenerator()
const hashManager = new HashManager()
const authenticator = new Authenticator()

const clientDatabase = new ClientDatabase()
const clientBusiness = new ClientBusiness(clientDatabase,idGenerator, hashManager, authenticator)
const clientController = new ClientController(clientBusiness)

clientRouter.post("/signup",(res, req) =>  clientController.signup(res, req));
clientRouter.post("/login",(res, req) =>  clientController.login(res, req));