export interface IProduct {
    productId?: string
    nameProduct?: string
    qty?: number
    price?: number
    description?: string
    image?: File | undefined | null | {
        data: number[];
    }
}