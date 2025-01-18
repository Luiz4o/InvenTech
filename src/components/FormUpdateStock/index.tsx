import { useState } from 'react'
import { TypeEnum } from '../Button'
import Field from '../FieldText'
import './FormUpdate.css'
import Button from '../Button'
import axios from 'axios'


const FormRemoveProduct = () => {
  const [productId, setProductId] = useState("")
  const [productToRemove, setProductToRemove] = useState("");
  const [qty, setQty] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMessageRemove, setSuccessMessageRemove] = useState<string | null>(null)
  const [errorRemove, setErrorRemove] = useState<string | null>(null)

  const onUpdate = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    setError(null)
    setSuccessMessage(null)

    try {
      const response = await axios.post(
        `http://localhost:8000/stock/${productId}`,
        { quantity: qty },
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Produto atualizado com sucesso!')

        setProductId("");
        setQty(0);
      } else {
        console.error("Falha ao atualizar o produto. Código de status:", response.status);
        setError('Ocorreu algum erro ao editar o produto, por favor confira os campos e tente novamente');
      }
    } catch (error) {
      setError('Ocorreu algum erro no servidor');
      console.error("Erro ao atualizar o produto", error);
    }
  };

  const onRemove = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    setError(null)
    setSuccessMessage(null)

    try {
      const response = await axios.delete(
        `http://localhost:8000/products/${productToRemove}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessageRemove('Produto removido com sucesso!')

        setProductToRemove("");
        setQty(0);
      } else {
        console.error("Falha ao remover o produto. Código de status:", response.status);
        setErrorRemove('Ocorreu algum erro ao remover o produto, por favor confira os campos e tente novamente');
      }
    } catch (error) {
      setErrorRemove('Ocorreu algum erro no servidor');

      console.error("Erro ao remover o produto", error);
    }
  };

  return (
    <section className="formulario">
      <form onSubmit={onUpdate}>
        <h2>Atualizar quantidade de produtos</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
        <Field
          required={false}
          label="ID do produto"
          placeholder="Digite o ID do produto"
          value={productId}
          onChange={(value) => setProductId(value)}
        />
        <Field
          required={false}
          label="Quantidade"
          placeholder="Digite a quantidade de produtos"
          value={qty}
          onChange={(value) => setQty(value ? parseInt(value) : 0)}
          type="number"
        />
        <Button typeEnum={TypeEnum.ACTION}>Atualizar quantidade</Button>
      </form>

      <form onSubmit={onRemove}>
        <h2>Remover Produto</h2>
        {successMessageRemove && <p className="success-message">{successMessageRemove}</p>}
        {errorRemove && <p className="error-message">{errorRemove}</p>}
        <Field
          required={false}
          label="ID do produto"
          placeholder="Digite o nome do produto a ser removido"
          value={productToRemove}
          onChange={(value) => setProductToRemove(value)}
        />
        <Button typeEnum={TypeEnum.CANCEL}>Remover Produto</Button>
      </form>
    </section>
  );
};

export default FormRemoveProduct