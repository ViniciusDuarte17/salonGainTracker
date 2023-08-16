import { Iclient } from "../model/client";
import { BaseDatabase } from "./BaseDatabase";

export class ClientDatabase extends BaseDatabase {
  private static TABLE_NAME = "salon_client";

  public async createClient (client: Iclient): Promise<void> {
    try {
      await this.getConnection().insert(client).into(ClientDatabase.TABLE_NAME)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}