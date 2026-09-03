import { Service } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Service()
export class ClienteService {

    static REPO_CLIENTES = "_CLIENTES";

    salvar(cli: Cliente) {

        const storage = this.getStorage();
        storage.push(cli);

        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }

    getStorage(): Cliente[] {

        const clientRepository = localStorage.getItem(ClienteService.REPO_CLIENTES);

        if (clientRepository) {
            const client: Cliente[] = JSON.parse(clientRepository);

            return client;
        }

        const clients: Cliente[] = [];
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clients))

        return clients;
    }
}
