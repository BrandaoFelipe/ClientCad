import { Service } from '@angular/core';
import { Cliente } from '../cadastro/cliente';
import { Observable, of } from 'rxjs';
import { C } from '@angular/cdk/keycodes';

@Service()
export class ClienteService {

    static REPO_CLIENTES = "_CLIENTES";

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

    findClient(name: string = ""): Cliente[] {

        const clientList = this.getStorage();
        const nomeBusca = name.trim().toUpperCase();

        if (!nomeBusca) {

            return this.getStorage();
        }
        return clientList.filter(c => c.name?.toUpperCase().includes(nomeBusca));
    }

    findClientById(id: string): Cliente {

        const clientList = this.getStorage();
        const client = clientList.find(c => c.id === id);

        if (!client) {
            throw new Error(`id: ${id} not found`);
        }

        return client;
    }

    salvar(cli: Cliente) {

        const storage = this.getStorage();

        storage.push(cli);

        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }

    update(updatedCli: Cliente) {

        const storage = this.getStorage();
        const index = storage.findIndex(c => c.id === updatedCli.id);

        if (index > -1) {

            storage[index] = updatedCli;
        }

        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }

    deleteClient(id: string): Cliente[] {

        const storage = this.getStorage();
        const newList = storage.filter(c => c.id !== id);

        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(newList));

        return newList;
    }


}
