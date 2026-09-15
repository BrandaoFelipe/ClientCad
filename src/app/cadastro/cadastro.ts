import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  standalone: true,
  imports: [MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, RouterLink],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro implements OnInit {

  private service = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  cliente: Cliente = Cliente.newClient();
  updating: boolean = false;
  id: string = '';

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const queryId = params.get('id');

      if (queryId) {

        this.id = queryId;
        const checkIfClientExists = this.service.findClientById(this.id);

        if (checkIfClientExists) {
          this.updating = true;
          this.cliente = checkIfClientExists;
        }
      }
    });
  }

  updateClient() {

    this.service.update(this.cliente);
    this.router.navigate(['/consulta']);

  }

  salvar() {
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newClient();
    this.router.navigate(['/consulta']);
  }

  clearForm() {
    this.clearForm();
  }

}
