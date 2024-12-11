import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductModel } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';





@Component({
    selector: 'app-home',
    standalone: true,
    imports: [TableModule, CommonModule, DropdownModule, FormsModule, TagModule, ButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    products!: ProductModel[];
    rows: number = 5; // Default number of rows per page
    selectedProduct: any = null; // Stores the product clicked by the user
    productDialog: boolean = false;

    statusOptions = [
        { label: 'In Stock', value: 'in-stock' },
        { label: 'Low Stock', value: 'low-stock' },
        { label: 'Out of Stock', value: 'out-of-stock' }
    ];

    //selectEditProduct: any = null;  // Store the selected product
    isEditing: boolean = false;   // Track whether the product is in edit mode


    constructor(private productService: ProductsService) { }

    ngOnInit() {
        this.productService.getAllProducts().then((products) => (this.products = products));
    }

    onRowClick(event: MouseEvent, product: ProductModel): void {
        // this.selectedProduct = { ...product };  // Create a copy to prevent direct mutation
        // this.isEditing = false;  // Start in view mode
        // Prevents the edit button click from triggering row click
        event.stopPropagation();

        if (!this.selectedProduct || this.selectedProduct.id !== product.id) {
        // Open the modal and show product details
        this.selectedProduct = { ...product };
        this.isEditing = false;  // Ensure it's in view mode when clicking on a row
        }
    }

    // Open the product details in edit mode
    editProduct(product: ProductModel): void {
        this.selectedProduct = { ...product };  // Make a copy of the product
        this.isEditing = true;  // Enable edit mode
    }

    // Toggle edit mode
    toggleEditMode(): void {
        this.isEditing = !this.isEditing;
    }

    // Save the changes to the product
    saveChanges(): void {
        if (this.selectedProduct) {
            const updatedProduct = this.productService.updateProduct(this.selectedProduct);
            
            // Successfully updated product
            console.log('Product updated:', updatedProduct);
            this.isEditing = false;  // Exit edit mode
      
            // You can also update the product list if needed
            this.updateProductInList(updatedProduct);  // Update the product in the frontend list
        }
    }

    // Update the product in the list after saving changes
    updateProductInList(updatedProduct: ProductModel): void {
        const index = this.products.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
    }

    // Cancel edit mode and revert changes
    cancelEdit(): void {
        // Reset to the original product data (you could also store a backup when entering edit mode)
        this.isEditing = false;
    }

    // Close modal and clear selected product
    closeModal(): void {
        this.isEditing = false;
        this.selectedProduct = null;
    }



    getSeverity(status: string | null): string {
        if (status === null) {
            return 'not-selected'; // This will be used for the "not selected" label
        }
        switch (status) {
            case 'in-stock':
                return 'success';
            case 'low-stock':
                return 'warning';
            case 'out-of-stock':
                return 'danger';
            default:
                return 'neutral';
        }
    }
    
    

}
