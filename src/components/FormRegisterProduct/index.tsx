import { useState } from 'react'
import { TypeEnum } from '../Button'
import axios from 'axios';
import Field from '../FieldText'
import './Form.css'
import { IProduct } from '../../shared/interface/IProduct'
import Button from '../Button'
import FieldImage from '../FieldImage'

interface FormRegisterProps {
    onAddProduct: (Product: IProduct) => void
    title: string
}

const FormRegisterProduct = (props: FormRegisterProps) => {

    const [nameProduct, setNameProduct] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState<File | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleImageChange = (file: File | null) => {
        setImage(file);
    };

    const onSave = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        setError(null)
        setSuccessMessage(null)

        if (!image) {
            console.error('Imagem é obrigatória');
            return;
        }

        const formData = new FormData();
        formData.append('nameProduct', nameProduct);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('image', image)

        const token = localStorage.getItem('jwtToken')

        try {
            const response = await axios.post('http://localhost:8000/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            })
            if (response.status === 201) {
                setSuccessMessage('Produto cadastrado com sucesso!')


                setNameProduct('');
                setDescription('');
                setPrice(0);
                setImage(null);

            } else {
                console.error('Falha ao criar o produto. Código de status:', response.status);
                setError('Ocorreu algum erro ao cadastrar o produto, por favor confira os campos e tente novamente');

            }
        } catch (error) {
            console.error('Erro de conexão', error);
            setError('Ocorreu algum erro no servidor');

        }
    };

    return (
        <section className="formulario">
            <form onSubmit={onSave}>
                <h2>{props.title}</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
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
                    onChange={value => setPrice(value ? parseFloat(value) : 0)}
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

export default FormRegisterProduct