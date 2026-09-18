import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from '../models/brasilapi.models';

@Service()
export class BrasilapiService {
    
    private http = inject(HttpClient);
    private _baseUrl = 'https://brasilapi.com.br/api';

    listUfs(): Observable<Estado[]>{
        
        return this.http.get<Estado[]>(this._baseUrl + '/ibge/uf/v1');
    }

    listCities(uf: string) :Observable<Municipio[]>{

        const path = '/ibge/municipios/v1/' + uf;
       
        return this.http.get<Municipio[]>(this._baseUrl + path);
    }


}
