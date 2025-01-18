import axios from 'axios'
import FieldText from '../FieldText'
import './Register.css'
import { useState } from 'react'
import Button, { TypeEnum } from '../Button'
import { useNavigate } from 'react-router-dom'


const RegisterComponent = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailConfirm, setEmailConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const navigate = useNavigate()

    const onSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        setError(null)
        setSuccessMessage(null)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('emailConfirm', emailConfirm)
        formData.append('password', password)


        try {
            const response = await axios.post('http://localhost:8000/user', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 201) {
                console.log('Cadastro feito com sucesso', response.data)
                setSuccessMessage('Cadastro realizado com sucesso!')


                setName('');
                setEmail('');
                setEmailConfirm('');
                setPassword('');
            } else {
                console.error('Falha ao cadastrar. Código de status:', response.status);
                setError('Ocorreu algum erro ao se cadastrar, por favor confira os campos e tente novamente');

            }
        } catch (error) {
            console.error('Erro de conexão', error);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <section className="formulario">
            <form onSubmit={onSubmit}>
                <h2>Registre seu usuário</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <FieldText
                    required={true}
                    label="Nome"
                    placeholder="Digite seu nome de usuário"
                    value={name}
                    onChange={value => setName(value)}
                />
                <FieldText
                    required={true}
                    label="Email"
                    placeholder="Digite seu melhor email"
                    value={email}
                    type='email'
                    onChange={value => setEmail(value)}
                />
                <FieldText
                    required={true}
                    label="Confirme o email"
                    placeholder="Repita seu email informado"
                    value={emailConfirm}
                    type='email'
                    onChange={value => setEmailConfirm(value)}
                />
                <FieldText
                    required={true}
                    label="Senha"
                    placeholder="Digite sua melhor senha"
                    value={password}
                    onChange={value => setPassword(value)}
                    type='password'
                />
                <div className='buttons'>
                    <Button typeEnum={TypeEnum.ACTION}>
                        Registrar
                    </Button>
                    <Button typeEnum={TypeEnum.CANCEL} onClick={handleLoginClick}>Ir para o Login</Button>
                </div>
            </form>
        </section>
    )
}

export default RegisterComponent