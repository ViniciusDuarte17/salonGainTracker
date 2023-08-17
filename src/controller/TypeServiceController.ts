import { Request, Response } from "express";
import { ItypeServiceDTO } from "../model/typeService";
import { TypeServiceBusiness } from "../business/TypeServiceBusiness";

export class TypeServiceController {
  constructor(private typeServiceBusiness: TypeServiceBusiness) {}

  async createTypeServiceController(req: Request, res: Response):Promise<void> {
    try {
      const token = req.headers.authorization as string;

      const inputClientServe: ItypeServiceDTO = {
        typeService: req.body.typeService,
        valueService: Number(req.body.valueService),
        amount: Number(req.body.amount),
      };

      await this.typeServiceBusiness.createTypeService(token, inputClientServe);

      res.status(201).send({ message: "Serviço adicionada com sucesso" });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  async getTypeServiceController(req: Request, res: Response): Promise<void>{
    try {
      const token = req.headers.authorization as string;
      const result = await this.typeServiceBusiness.getTypeService(token)
      res.status(201).send(result);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
