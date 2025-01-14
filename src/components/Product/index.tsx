import { IProduct } from '../../shared/interface/IProduct'
import './Product.css'

const Product = ({nameProduct,description,qty,price,image}:IProduct) => {

    const imageUrl = image ? URL.createObjectURL(image) : '';

    return(
        <section className='container__product'>
            <p>Produto: {nameProduct}</p>
            <p>Descrição: {description}</p>
            <p>Quantidade: {qty}</p>
            <p>Valor: {price}</p>
            <div>
                {imageUrl && <img src={imageUrl} alt={nameProduct} />}
            </div>
        </section>
    )

}

export default Product