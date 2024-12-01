import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) {}

    public async getAllProducts(): Promise<ProductModel[]>{
        // create an observable object which can request data from the backend:
        const observable = this.http.get<ProductModel[]>(appConfig.productsUrl);
    
        // convert observable to promise and await to the response products:
        const products = await firstValueFrom(observable);
        // return products:
        return products;
    }
  
  
}

