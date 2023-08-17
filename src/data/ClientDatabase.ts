import { Iclient } from "../model/client";
import { IClientRepository } from "../repository/clientRepository";
import { BaseDatabase } from "./BaseDatabase";

export class ClientDatabase extends BaseDatabase implements IClientRepository{
  private static TABLE_NAME = "salon_client";

  public async createClient (client: Iclient): Promise<void> {
    try {
      await this.getConnection().insert(client).into(ClientDatabase.TABLE_NAME)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<Iclient> {
    const result = await this.getConnection()
      .select("*")
      .from(ClientDatabase.TABLE_NAME)
      .where({ email });

    return result[0] as Iclient;
  }

  public async getUserById(id: string): Promise<Iclient> {
    const result = await this.getConnection()
      .select("*")
      .from(ClientDatabase.TABLE_NAME)
      .where({ id });

    return result[0] as Iclient;
  }
}
