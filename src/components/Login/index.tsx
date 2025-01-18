import { useState } from "react";
import { TypeEnum } from "../Button";
import Field from "../FieldText";
import "./Login.css";
import Button from "../Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const LoginComponent = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate();


  const onSave = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (!email || !password) {
      setError("Por favor, preencha ambos os campos.");
      return;
    }

    setError(null)

    try {
      const response = await axios.post(
        `http://localhost:8000/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        console.log("Login efetuado com sucesso", response.data)

        localStorage.setItem('jwtToken', response.data.token)

        setEmail("")
        setPassword("")

        navigate('/')
      } else {
        console.error("Falha ao tentar fazer login")
      }
    } catch (error) {
      console.error("Erro de conexão", error)
      setError("Erro de conexão. Tente novamente.")
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <section className="formulario">
      <form onSubmit={onSave}>
        <h1>InvenTech</h1>
        <h2>Realize seu login</h2>
        {error && <p className="error-message">{error}</p>}
        <Field
          required={true}
          label="Email"
          placeholder="Informe seu email"
          value={email}
          type="email"
          onChange={(value) => setEmail(value)}
        />
        <Field
          required={false}
          label="Senha"
          placeholder="Informe sua senha"
          value={password}
          type="password"
          onChange={(value) => setPassword(value)}
        />
        <div className="buttons">
          <Button typeEnum={TypeEnum.ACTION}>Login</Button>
          <Button typeEnum={TypeEnum.CANCEL} onClick={handleRegisterClick}>Se Registrar</Button>
        </div>
      </form>
    </section>
  );
};

export default LoginComponent;
