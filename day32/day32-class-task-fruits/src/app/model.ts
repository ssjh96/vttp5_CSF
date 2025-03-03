export interface Product
{
    name: string;
    image: string;
    price: number;
    quantity: number;
    delta: number;
}

export interface lineItem
{
    name: string;
    quantity: number;
    price: string;
    cost: number;
}

export interface PurchaseOrder 
{
    name: string;
    address: string;
    delivery: string;
    lineItems: lineItem[]

}
