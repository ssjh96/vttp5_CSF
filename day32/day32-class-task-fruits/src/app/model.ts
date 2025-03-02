export interface Product
{
    name: string;
    image: string;
    price: number;
    quantity: number;
    delta: number;
}

export interface Order 
{
    name: string;
    address: string;
    delivery: string;
    lineItems: Product[]

}

