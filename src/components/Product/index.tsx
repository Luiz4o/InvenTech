import './Product.css'

interface IProductRender {
    nameProduct: string;
    description: string;
    qty: number;
    price: number;
    image?: string
}

const Product = ({ nameProduct, description, qty, price, image }: IProductRender) => {



    return (
        <section className='container__product'>
            <p>Produto: {nameProduct}</p>
            <p>Descrição: {description}</p>
            <p>Quantidade: {qty}</p>
            <p>Valor: {price}</p>
            <div>
                {image && <img src={image} alt={nameProduct} />}
            </div>
        </section>
    )

}

export default Product