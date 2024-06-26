

interface Rental {
    id: string;
    value: number;
    description: string;
    
    start_date: Date;
    end_date: Date;
    expected_delivery_date: Date;
    
    product_id: string;  
    user_id: string;
    client_id: string;
    
    created_at: Date;
    updated_at: Date;
    
    
    user: User;
    product: Product;
    client: Client;
    transactions: Transaction[];
}