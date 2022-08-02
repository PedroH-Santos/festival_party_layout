

enum TypeTransaction {
    WITHDRAW = "withdraw",
    DEPOSIT = "deposit",
}



interface Transaction {
    id: string;
    description: string;
    value: number;
    type: TypeTransaction;
    origin: string;
    created_at: Date;
    updated_at: Date;
}
