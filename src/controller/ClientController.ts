import { Request, Response } from "express";
import { clientInputDTO, clientLogintDTO } from "../model/client";
import { ClientBusiness } from "../business/ClientBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class ClientController {
  constructor(private clientBusiness: ClientBusiness) {}

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const clientInput: clientInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const token = await this.clientBusiness.createClient(clientInput);

      res.status(200).send({ token });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }

  async login (req: Request, res: Response): Promise<void> {
      try {
        
        const loginData: clientLogintDTO = {
          email: req.body.email,
          password: req.body.password
        }

        const token = await this.clientBusiness.login(loginData)

        res.status(200).send({ token });

      } catch (error: any) {
        res.status(400).send({ error: error.message });
      }

      await BaseDatabase.destroyConnection();
  }
}
