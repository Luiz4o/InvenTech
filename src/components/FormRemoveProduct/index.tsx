import { useState } from 'react'
import Botao, { TypeEnum } from '../Button'
import Field from '../Field'
import './Form.css'
import { IProduct } from '../../shared/interface/IProduct'
import Button from '../Button'

interface FormRemoveProductProps {
    onAddProduct: (Product: IProduct) => void
    title:string
}

const FormRemoveProduct = (props: FormRemoveProductProps) => {

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

        // try {
        //     const response = await fetch('url', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(productData),
        //     });

        //     if (response.ok) {
        //         props.onAddProduct(productData);
        //         setNameProduct('');
        //         setDescription('');
        //         setPrice(0);
        //         setImage('');
        //     } else {
        //         console.error('Erro ao enviar os dados', response);
        //     }
        // } catch (error) {
        //     console.error('Erro de conexão', error);
        // }
    };

    return (
        <section className="formulario">
            <form onSubmit={onSave}>
                <h2>{props.title}</h2>
                <Field 
                    required={false}
                    label="Nome do produto"
                    placeholder="Digite o nome do produto" 
                    value={nameProduct}
                    onChange={value => setNameProduct(value)}
                />
                <Field 
                    required={false}
                    label="Quantidade"
                    placeholder="Digite a quantidade de produtos" 
                    value={qty} 
                    onChange={value => setQty(value ? parseFloat(value):0)}
                    type='number'
                />
                <Button typeEnum={TypeEnum.ACTION}>
                    Registrar
                </Button>
            </form>
        </section>
    )
}

export default FormRemoveProduct