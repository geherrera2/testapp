export class InventarioModel {
        provider: string;
        nit: string;
        invoice_number: string;
        inventory_products: ProductosInventarioModel[];

        constructor(data?) {
            this.provider = data?.provider ?? '';
            this.nit = data?.nit ?? '';
            this.invoice_number = data?.invoice_number ?? '';
            this.inventory_products = data?.inventory_products ?? [];
        }
    
}

export class ProductosInventarioModel {
    product_id: string;
    amount: string;
    unit_cost: string;
    total_cost: string;
    name: string;
    product_type_name: string;

    constructor(data?) {
        this.product_id = data?.product_id ?? '';
        this.amount = data?.amount ?? '';
        this.name = data?.name ?? '';
        this.unit_cost = data?.unit_cost ?? '';
        this.total_cost = data?.total_cost ?? '';
        this.product_type_name = data?.product_type_name ?? '';
    }
}