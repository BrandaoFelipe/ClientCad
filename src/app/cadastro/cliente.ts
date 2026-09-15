import { v4 as uuid } from "uuid";

export class Cliente{

    id?: string;
    name?: string;
    email?: string;
    cpf?: string;
    dataNascimento?: string;
    deletando: boolean = false;

    static newClient(){
        const cliente = new Cliente();
        cliente.id = uuid();

        return cliente;
    }
}