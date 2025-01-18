import { useState } from "react";
import { TypeEnum } from "../Button";
import Field from "../FieldText";
import "./Form.css";
import { IProduct } from "../../shared/interface/IProduct";
import Button from "../Button";
import FieldImage from "../FieldImage";
import axios from "axios";

interface FormEditProductProps {
  onEditProduct: (Product: IProduct) => void;
  title: string;
}

const FormEditProduct = (props: FormEditProductProps) => {
  const [productId, setProductId] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const onSave = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    setError(null)
    setSuccessMessage(null)

    const formData = new FormData();

    if (nameProduct.trim() !== "") {
      formData.append('nameProduct', nameProduct)
    }
    if (description.trim() !== "") formData.append("description", description)
    if (price > 0) formData.append("price", price.toString())
    if (image) formData.append("image", image)

    if (!formData) {
      console.log("Você precisa passar ao menos um campo para ser alterado")
    }

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    })

    console.log(formData)

    try {
      const response = await axios.post(
        `http://localhost:8000/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,

          },
        }
      );
      if (response.status === 200) {
        console.log("Produto criado com sucesso", response.data);
        setSuccessMessage('Produto cadastrado com sucesso!')

        setProductId("")
        setNameProduct("")
        setDescription("")
        setPrice(0)
        setImage(null)
      } else {
        console.error(
          "Falha ao criar o produto. Código de status:",
          response.status
        );
        setError('Ocorreu algum erro ao cadastrar o produto, por favor confira os campos e tente novamente');

      }
    } catch (error) {
      console.error("Erro de conexão", error);
      setError('Ocorreu algum no servidor');

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
          label="Código do produto"
          placeholder="Digite o código do produto"
          value={productId}
          onChange={(value) => setProductId(value)}
        />
        <Field
          required={false}
          label="Nome do produto"
          placeholder="Digite o nome do produto"
          value={nameProduct}
          onChange={(value) => setNameProduct(value)}
        />
        <Field
          required={false}
          label="Descrição"
          placeholder="Descreva o produto"
          value={description}
          onChange={(value) => setDescription(value)}
        />
        <Field
          required={false}
          label="Valor"
          placeholder="Digite o valor do produto"
          value={price}
          onChange={(value) => setPrice(value ? parseFloat(value) : 0)}
          type="number"
        />
        <FieldImage
          required={false}
          label="Upload de imagem"
          placeholder="Selecione uma imagem"
          value={image ? image.name : ""}
          onChange={handleImageChange}
          type="file"
        />
        <Button typeEnum={TypeEnum.ACTION}>Registrar</Button>
      </form>
    </section>
  );
};

export default FormEditProduct;
