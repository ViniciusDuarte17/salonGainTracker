import express from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { TypeServiceDatabase } from "../data/TypeServiceDatabase";
import { ClientDatabase } from "../data/ClientDatabase";
import { TypeServiceBusiness } from "../business/TypeServiceBusiness";
import { TypeServiceController } from "../controller/TypeServiceController";

export const clientTypeService = express.Router();

const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

const typeServiceDatabase = new TypeServiceDatabase()
const clientDatabase = new ClientDatabase()
const typeServiceBusiness = new TypeServiceBusiness(clientDatabase, typeServiceDatabase, authenticator, idGenerator)
const typeServiceController = new TypeServiceController(typeServiceBusiness)


clientTypeService.post("/",(res, req) => typeServiceController.createTypeServiceController(res, req));