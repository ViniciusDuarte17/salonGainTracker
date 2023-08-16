import { BaseError } from "../error/BaseError";
import { Iclient, clientInputDTO, clientLogintDTO } from "../model/client";
import { IAuthenticator, IHashManger, IIDGenerator } from "../ports/Ports";
import { IClientRepository } from "../repository/clientRepository";

export class ClientBusiness {
  constructor(
    private clientDatabase: IClientRepository,
    private idGenerator: IIDGenerator,
    private hashManager: IHashManger,
    private authenticator: IAuthenticator
  ) {}

  async createClient(client: clientInputDTO) {
    const id = this.idGenerator.generate();

    const hashPassword = await this.hashManager.hash(client.password);

    if (!client.name || !client.email || !client.password) {
      throw new BaseError("É necessário preencher todos os compos", 422);
    }
    
    const newClient: Iclient = {
      id,
      name: client.name,
      email: client.email,
      password: hashPassword,
    };

    await this.clientDatabase.createClient(newClient);

    const accessToken = this.authenticator.generateToken({ id });

    return accessToken;
  }

  async login (client: clientLogintDTO) {
    const clientFromDb = await this.clientDatabase.getUserByEmail(client.email)
    
    if (!client.email || !client.password) {
      throw new BaseError("É necessário preencher todos os compos", 422);
    }

    if(!clientFromDb) {
      throw new BaseError("email inválido!", 401)
    }

    const hashCompare = await this.hashManager.compare(client.password, clientFromDb.password)

    if (!hashCompare) {
      throw new BaseError("Invalid Password!", 401);
    }

    const accessToken = await this.authenticator.generateToken({id: clientFromDb.id})

    return accessToken
  }
}
