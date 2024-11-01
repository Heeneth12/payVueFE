export class StockItem {
    stock_uuid!: string | null;
    stock_name!: string;
    stock_type!: string;
    stock_price!: number;
    stock_unit!: number;
    stock_quantity!: number;
    stock_unit_size!: number;
    updated_at!: Date;
}