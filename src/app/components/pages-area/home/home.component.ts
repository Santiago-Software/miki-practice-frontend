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
    selector: 'app-home',
    standalone: true,
    imports: [TableModule, CommonModule, DropdownModule, FormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    products!: ProductModel[];
    rows: number = 5; // Default number of rows per page
    selectedProduct: any = null; // Stores the product clicked by the user
    statusOptions = [
        { label: 'In Stock', value: 'in-stock' },
        { label: 'Low Stock', value: 'low-stock' },
        { label: 'Out of Stock', value: 'out-of-stock' }
    ];
    


    constructor(private productService: ProductsService) { }

    ngOnInit() {
        this.productService.getAllProducts().then((products) => (this.products = products));
    }
    onRowClick(event: MouseEvent, product: ProductModel): void {
        // Prevent the modal from opening if the click is inside the dropdown or a nested element
        if (event.target && event.target instanceof HTMLElement && event.target.closest('p-dropdown')) {
          return; // Do nothing if the click is inside the dropdown
        }
      
        this.selectedProduct = product; // Open modal for this product
    }

    closeModal(): void {
        this.selectedProduct = null; // Clear the selected product to hide the modal
    }

    onStatusChange(product: ProductModel): void {
        console.log('Product status changed:', product);
        // You can handle the logic to update the status or call a service to save the change
    }



    getStatusClass(status: string): string {
        switch (status) {
            case 'in-stock':
                return 'status-in-stock';
            case 'low-stock':
                return 'status-low-stock';
            case 'out-of-stock':
                return 'status-out-of-stock';
            default:
                return '';
        }
    }

}
