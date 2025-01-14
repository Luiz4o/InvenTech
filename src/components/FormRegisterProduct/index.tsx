import { useState } from 'react'
import Botao, { TypeEnum } from '../Button'
import Field from '../Field'
import './Form.css'
import { IProduct } from '../../shared/interface/IProduct'
import Button from '../Button'
import FieldImage from '../FieldImage'

interface FormProps {
    onAddProduct: (Product: IProduct) => void
    title:string
}

const Form = (props: FormProps) => {

    const [nameProduct, setNameProduct] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] =  useState<File | null>(null)

    const handleImageChange = (file: File | null) => {
        setImage(file); // Atualiza o estado com o arquivo
    };

    const onSave = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const productData: IProduct = {
            nameProduct,
            description,
            price,
            image
        };

        props.onAddProduct(productData);
                setNameProduct('');
                setDescription('');
                setPrice(0);
                setImage(null);

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
                    required={true}
                    label="Nome do produto"
                    placeholder="Digite o nome do produto" 
                    value={nameProduct}
                    onChange={value => setNameProduct(value)}
                />
                <Field 
                    required={true}
                    label="Descrição"
                    placeholder="Descreva o produto" 
                    value={description}
                    onChange={value => setDescription(value)}
                />
                <Field 
                    required={true}
                    label="Valor"
                    placeholder="Digite o valor do produto" 
                    value={price} 
                    onChange={value => setPrice(value ? parseFloat(value):0)}
                    type='number'
                />
                <FieldImage 
                    required={true}
                    label="Upload de imagem"
                    placeholder="Selecione uma imagem" 
                    value={image ? image.name : ''}
                    onChange={handleImageChange}
                    type='file'
                />
                <Button typeEnum={TypeEnum.ACTION}>
                    Registrar
                </Button>
            </form>
        </section>
    )
}

export default Form