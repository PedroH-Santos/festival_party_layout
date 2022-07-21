

interface Rental {
    id: string;
    value: Number;
    description: string;
    start_date: Date;
    end_date: Date;
    expected_delivery_date: Date;
    dress_id: string;  
    user_id: string;
    created_at: Date;
    updated_at: Date;
    user: User;
}