import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductModel } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, DropdownModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
    products!: ProductModel[];
    rows: number = 5; // Default number of rows per page
    selectedProduct: any = null; // Stores the product clicked by the user


    constructor(private productService: ProductsService) {}

    ngOnInit() {
        this.productService.getAllProducts().then((products) => (this.products = products));
    }
    onRowClick(product: any): void {
        this.selectedProduct = product; // Set the clicked product
    }

    closeModal(): void {
        this.selectedProduct = null; // Clear the selected product to hide the modal
    }

}
