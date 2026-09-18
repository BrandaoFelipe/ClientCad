import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from '../cadastro/cliente';
import { ClienteService } from '../services/cliente.service';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  imports: [FormsModule, MatButtonModule,
    MatCardModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatTableModule,
  ],
  selector: 'app-consulta',
  styleUrl: './consulta.scss',
  templateUrl: './consulta.html',
})
export class Consulta implements OnInit {

  private service = inject(ClienteService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private horizontalPosition = signal<MatSnackBarHorizontalPosition>('center');
  private verticalPosition = signal<MatSnackBarVerticalPosition>('top');
  private durationInSeconds = signal(10);

  clientList: Cliente[] = [];
  clientName: string = "";
  displayedColumns: string[] = ['id', 'name', 'email', 'cpf', 'dataNascimento', 'acoes'];  

  ngOnInit() {
    this.clientList = this.service.findClient('');
  }

  searchClient() {
    this.clientList = this.service.findClient(this.clientName);
  }

  editClient(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } });
  }

  isDeleting(cli: Cliente){
    cli.deletando = true;
  }

  deleteClient(id: string) {
    this.clientList = this.service.deleteClient(id);
    this.showMessage("Cliente deletado com sucesso!", "OK");
  }

    showMessage(message: string, action:string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition(),
      verticalPosition: this.verticalPosition(),
      duration: this.durationInSeconds() * 1000
    });
  }
  
}
