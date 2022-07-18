

interface Dress { 
    id: string;
    name: string;
    category_id: string;
    price: number;
    created_at: Date,
    updated_at: Date,
    category: DressCategory,
    images: DressImages[],

}