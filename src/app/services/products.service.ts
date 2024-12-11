import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { appConfig } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private products: ProductModel[] = [
        { id: 1, name: 'Laptop', price: 1200, stock: 25, status: 'in-stock' },
        { id: 2, name: 'Smartphone', price: 800, stock: 10, status: 'low-stock' },
        { id: 3, name: 'Tablet', price: 500, stock: 0, status: null },
        { id: 4, name: 'Monitor', price: 300, stock: 50, status: 'in-stock' },
        { id: 5, name: 'Keyboard', price: 50, stock: 5, status: null },
        { id: 6, name: 'Mouse', price: 25, stock: 0, status: 'out-of-stock' },
        { id: 7, name: 'Printer', price: 200, stock: 12, status: 'low-stock' },
        { id: 8, name: 'Scanner', price: 150, stock: 30, status: 'in-stock' },
        { id: 9, name: 'Headphones', price: 75, stock: 20, status: null },
        { id: 10, name: 'Speakers', price: 90, stock: 3, status: 'low-stock' },
        { id: 11, name: 'Webcam', price: 60, stock: 0, status: 'out-of-stock' },
        { id: 12, name: 'Charger', price: 40, stock: 18, status: 'in-stock' },
        { id: 13, name: 'Router', price: 120, stock: 25, status: 'in-stock' },
        { id: 14, name: 'External HDD', price: 150, stock: 8, status: 'low-stock' },
        { id: 15, name: 'SSD', price: 100, stock: 0, status: 'out-of-stock' },
        { id: 16, name: 'Graphics Card', price: 700, stock: 6, status: 'low-stock' },
        { id: 17, name: 'Motherboard', price: 250, stock: 20, status: 'in-stock' },
        { id: 18, name: 'CPU', price: 400, stock: 15, status: 'in-stock' },
        { id: 19, name: 'RAM', price: 150, stock: 5, status: 'low-stock' },
        { id: 20, name: 'Power Supply', price: 80, stock: 0, status: 'out-of-stock' }
    ];

    getAllProducts(): Promise<ProductModel[]> {
        return Promise.resolve(this.products);
    }

     // Update a product (simulating an API call)
    updateProduct(updatedProduct: ProductModel): ProductModel {
        // Find the product by id and update it
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
        this.products[index] = updatedProduct;  // Update the product in the array
        }
        return this.products[index];  // Return the updated product
    }


}
    // constructor(private http: HttpClient) {}

    // public async getAllProducts(): Promise<ProductModel[]>{
    //     // create an observable object which can request data from the backend:
    //     const observable = this.http.get<ProductModel[]>(appConfig.productsUrl);

    //     // convert observable to promise and await to the response products:
    //     const products = await firstValueFrom(observable);
    //     // return products:
    //     return products;
    // }

    // // Update a product
    // updateProduct(product: ProductModel): Observable<ProductModel> {
    //     const url = `${this.apiUrl}/${product.id}`;  // Assuming products are identified by `id`
    //     return this.http.put<ProductModel>(url, product);
    // }



