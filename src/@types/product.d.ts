

interface Product { 
    id: string;
    name: string;
    category_id: string;
    price: number;
    created_at: Date,
    updated_at: Date,
    category: ProductCategory,
    images: ProductImage[],

}