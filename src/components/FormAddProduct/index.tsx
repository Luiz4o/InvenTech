import { useState } from 'react'
import { TypeEnum } from '../Button'
import Field from '../Field'
import './Form.css'
import { IProduct } from '../../shared/interface/IProduct'
import Button from '../Button'

interface FormAddProductProps {
    onAddProduct: (Product: IProduct) => void
    title:string
}

const FormAddProduct = (props: FormAddProductProps) => {

    const [nameProduct, setNameProduct] = useState('')
    const [qty, setQty] = useState(0)

    const onSave = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const productData = {
            nameProduct,
            qty
        };

        props.onAddProduct(productData)
                setNameProduct('')
                setQty(0)

    };

    return (
        <section className="formulario">
            <form onSubmit={onSave}>
                <h2>{props.title}</h2>
                <Field 
                    required={false}
                    label="ID do produto"
                    placeholder="Digite o nome do produto" 
                    value={nameProduct}
                    onChange={value => setNameProduct(value)}
                />
                <Field 
                    required={false}
                    label="Quantidade atual no estoque"
                    placeholder="Digite a quantidade de produtos que tem no estoque" 
                    value={qty} 
                    onChange={value => setQty(value ? parseFloat(value):0)}
                    type='number'
                />
                <Button typeEnum={TypeEnum.ACTION} >
                    Registrar
                </Button>
            </form>
        </section>
    )
}

export default FormAddProduct