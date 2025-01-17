import { useState } from 'react'
import { TypeEnum } from '../Button'
import Field from '../Field'
import './Form.css'
import { IProduct } from '../../shared/interface/IProduct'
import Button from '../Button'
import FieldImage from '../FieldImage'
import axios from 'axios'

interface FormProps {
    onAddProduct: (Product: IProduct) => void
    title:string
}

const FormEditProduct = (props: FormProps) => {

    const [productId, setProductId] = useState('')
    const [nameProduct, setNameProduct] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] =  useState<File | null>(null)

    const handleImageChange = (file: File | null) => {
        setImage(file); // Atualiza o estado com o arquivo
    };

    const onSave = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (!image) {
            console.error('Imagem é obrigatória');
            return;
        }

        const formData = new FormData();
        formData.append('productId', productId)
        formData.append('nameProduct', nameProduct)
        formData.append('description', description)
        formData.append('price', price.toString())
        formData.append('image', image)


        try {
            const response = await axios.post('http://localhost:8000/products', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', 
                },
              })
              if (response.status === 201) {
                console.log('Produto criado com sucesso', response.data);
    
                setProductId('')
                setNameProduct('')
                setDescription('')
                setPrice(0)
                setImage(null)
            } else {
                console.error('Falha ao criar o produto. Código de status:', response.status);
            }
        } catch (error) {
            console.error('Erro de conexão', error);
        }
    };

    return (
        <section className="formulario">
            <form onSubmit={onSave}>
                <h2>{props.title}</h2>
                <Field 
                    required={true}
                    label="Código do produto"
                    placeholder="Digite o código do produto" 
                    value={nameProduct}
                    onChange={value => setNameProduct(value)}
                />
                <Field 
                    required={false}
                    label="Nome do produto"
                    placeholder="Digite o nome do produto" 
                    value={nameProduct}
                    onChange={value => setNameProduct(value)}
                />
                <Field 
                    required={false}
                    label="Descrição"
                    placeholder="Descreva o produto" 
                    value={description}
                    onChange={value => setDescription(value)}
                />
                <Field 
                    required={false}
                    label="Valor"
                    placeholder="Digite o valor do produto" 
                    value={price} 
                    onChange={value => setPrice(value ? parseFloat(value):0)}
                    type='number'
                />
                <FieldImage
                    required={false}
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

export default FormEditProduct