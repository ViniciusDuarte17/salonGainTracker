import { Iclient } from "../model/client";

export interface IClientRepository {
    createClient (client: Iclient): Promise<void>
    getUserByEmail(email: string): Promise<Iclient>
}