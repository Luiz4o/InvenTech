import './Product.css'

interface IProductRender {
    id: string
    nameProduct: string;
    description: string;
    quantity: number;
    price: number;
    image?: string
}

const Product = ({ nameProduct, id, description, quantity, price, image }: IProductRender) => {
    return (
        <section className='container__product'>
            <h3>{nameProduct}</h3>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Descrição:</strong> {description}</p>
            <p><strong>Quantidade:</strong> {quantity}</p>
            <p><strong>Valor:</strong> R${price.toFixed(2)}</p>
            {image && <img src={image} alt={nameProduct} />}
        </section>
    );
}

export default Product