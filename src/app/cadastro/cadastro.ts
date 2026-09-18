import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BrasilapiService } from '../services/brasilapi.service';
import { Estado, Municipio } from '../models/brasilapi.models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';


@Component({
  standalone: true,
  imports: [MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, RouterLink,
    NgxMaskDirective, MatSelectModule],
  providers: [provideNgxMask()],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro implements OnInit {

  private service = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private brasilApi = inject(BrasilapiService);
  private _snackBar = inject(MatSnackBar);
  private horizontalPosition = signal<MatSnackBarHorizontalPosition>('center');
  private verticalPosition = signal<MatSnackBarVerticalPosition>('top');
  private durationInSeconds = signal(10);


  cliente: Cliente = Cliente.newClient();
  updating: boolean = false;
  id: string = '';
  states: Estado[] = [];
  cities: Municipio[] = [];

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const queryId = params.get('id');

      if (queryId) {

        this.id = queryId;
        const checkIfClientExists = this.service.findClientById(this.id);

        if (checkIfClientExists) {
          this.updating = true;
          this.cliente = checkIfClientExists;
          if(this.cliente.uf){
            const event = {value: this.cliente.uf}
            this.loadCities(event as MatSelectChange)
          }
        }
      }
    })

    this.loadUfs();
  }

  updateClient() {

    this.service.update(this.cliente);
    this.router.navigate(['/consulta']);
    this.showMessage("Cliente alterado com sucesso", "Ok");

  }

  salvar() {
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newClient();
    this.router.navigate(['/consulta']);
    this.showMessage("Dados salvo com sucesso", "OK");
  }

  showMessage(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition(),
      verticalPosition: this.verticalPosition(),
      duration: this.durationInSeconds() * 1000
    });

  }

  loadUfs() {
    this.brasilApi.listUfs().subscribe({
      next: stateslist => this.states = stateslist,
      error: erro => console.error('an error has occurred: ', erro)
    });
  }

  loadCities(event: MatSelectChange) {
    const uf = event.value;
    this.brasilApi.listCities(uf).subscribe({
      next: citiesList => this.cities = citiesList,
      error: erro => console.error('an error has occurred: ', erro)
    });
  }
}
