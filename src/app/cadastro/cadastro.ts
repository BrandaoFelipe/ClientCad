import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';

@Component({
  imports: [MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro {

  private service = inject(ClienteService);

  cliente: Cliente = Cliente.newClient();

  salvar() {
    this.service.salvar(this.cliente);
  }

}
