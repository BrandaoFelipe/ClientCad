import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro implements OnInit {

  private service = inject(ClienteService);
  private route = inject(ActivatedRoute);

  cliente: Cliente = Cliente.newClient();
  updating: boolean = false;

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        const checkIfClientExists = this.service.findClientById(id);

        if (checkIfClientExists) {
          this.updating = true;
          this.cliente = checkIfClientExists;
        }
      }
    });
  }

  salvar() {
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newClient();
  }

}
