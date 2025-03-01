// first try on user componenet
export interface userDetails
{
    name: string
    address: string
    email: string
    deliveryDate: string
    availability: boolean[]
    urgent: boolean
}

export interface lineItemDetails
{
    itemName: string
    quantity: number
    unitPrice: number
}

// second try on cart component
export interface lineItem 
{
    item: string
    quantity: number
    unitPrice: number
}
export interface purchaseOrder 
{
    name: string
    address: string
    email: string
    deliveryDate: string
    urgent: boolean
    ts1: boolean
    ts2: boolean
    ts3: boolean
    lineItems: lineItem[]
}