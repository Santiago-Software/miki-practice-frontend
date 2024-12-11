import { Component } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
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
    originalProducts: ProductModel[] = []; // To keep the original order
    

    statusOptions = [
        { label: 'In Stock', value: 'in-stock' },
        { label: 'Low Stock', value: 'low-stock' },
        { label: 'Out of Stock', value: 'out-of-stock' }
    ];

    isEditing: boolean = false;   // Track whether the product is in edit mode


    constructor(private productService: ProductsService) { }

    ngOnInit() {
        this.productService.getAllProducts().then((products) => {
            this.products = [...products]; // Displayed products
            this.originalProducts = [...products]; // Preserve original order
        });
    }

    onRowClick(event: MouseEvent, product: ProductModel): void {
        // Prevents the edit button click from triggering row click
        event.stopPropagation();

        if (!this.selectedProduct || this.selectedProduct.id !== product.id) {
        // Open the modal and show product details
        this.selectedProduct = { ...product };
        this.isEditing = false;  // Ensure it's in view mode when clicking on a row
        }
    }
    resetSort(table: Table): void {
        this.products = [...this.originalProducts]; // Reset products to original order
        table.clear(); // This clears sorting and filtering
    }
    
    // Custom sort function for status
    customSort(event: any): void {      
        // Map status values to their corresponding numeric order
        const statusOrder: Record<string, number> = {
          'in-stock': 1,
          'low-stock': 2,
          'out-of-stock': 3,
          'not-selected': 4, // This corresponds to null in the database
        };
      
        const sortMeta = event.multiSortMeta;
      
        event.data.sort((a: any, b: any) => {
          for (const meta of sortMeta) {
            const field = meta.field; // Field being sorted
            const order = meta.order; // Sorting order: 1 (asc) or -1 (desc)
      
            let value1 = a[field];
            let value2 = b[field];
      
            // If the field is 'status', handle null as 'not-selected'
            if (field === 'status') {
              value1 = value1 === null ? 'not-selected' : value1;
              value2 = value2 === null ? 'not-selected' : value2;
      
              value1 = statusOrder[value1] || 0; // Map to numeric value
              value2 = statusOrder[value2] || 0; // Map to numeric value
            }
      
            // Default sorting for other fields (e.g., name, price)
            if (field !== 'status') {
              if (value1 < value2) {
                return order * -1;
              } else if (value1 > value2) {
                return order * 1;
              }
            }
      
            // If values are equal, perform tie-breaking logic for "status"
            if (value1 === value2 && field === 'status') {
              return 0; // If status is equal, no need to further compare
            }
      
            // If the values are equal, move to the next sort field
            if (value1 !== value2) {
              return order * (value1 < value2 ? -1 : 1);
            }
          }
          return 0; // Return 0 if all values are equal
        });
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
            this.productService.updateProduct(this.selectedProduct).subscribe(
                (updatedProduct: ProductModel) => {
                    // Successfully updated product
                    console.log('Product updated:', updatedProduct);
                    this.isEditing = false;  // Exit edit mode
                    
                    // You can also update the product list if needed
                    this.updateProductInList(updatedProduct);  // Update the product in the frontend list
                },
                (error) => {
                    console.error('Error updating product:', error);
                }
            );
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
