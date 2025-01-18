import { JSX, useState } from 'react';
import Button, { TypeEnum } from '../../components/Button'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { IProduct } from '../../shared/interface/IProduct';
import Form from '../../components/FormRegisterProduct';
import MainContent from '../../components/MainContent';
import FormEditProduct from '../../components/FormEditProduct';
import FormRemoveProduct from '../../components/FormUpdateStock';
import Product from '../../components/Product';
import FormRegisterProduct from '../../components/FormRegisterProduct';
import axios from 'axios';


function App() {

  const [products, setProducts] = useState<IProduct[]>([])

  const onNewProduct = (product: IProduct) => {
    setProducts([...products, product])
  }

  const [formComponent, setFormComponent] = useState<JSX.Element>(<Form onAddProduct={product => onNewProduct(product)} title="Registrar Produto" />);
  const [pathImage, setPathImage] = useState('./images/register.png');
  const [textAlt, setTextAlt] = useState('Adicionar produto');

  const handleButtonClick = (component: JSX.Element, image: string, altText: string) => {
    setFormComponent(component)
    setPathImage(image)
    setTextAlt(altText)
  }

  const handleShowProducts = async () => {
    try {
      const token = localStorage.getItem('jwtToken')

      const response = await axios.get('http://localhost:8000/products', {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data);

      if (response.status === 200) {
        const productsWithImages = response.data.map((product: any) => {
          let imageUrl = '';
          if (product.image) {
            const blob = new Blob([new Uint8Array(product.image.data)], { type: 'image/png' });
            imageUrl = URL.createObjectURL(blob)
          }
          return { ...product, image: imageUrl }

        });



        const productCards = (
          <div className="product-list-container">
            {productsWithImages.map((product: any, index: number) => (
              <Product key={index} {...product} />
            ))}
          </div>
        )

        handleButtonClick(productCards, './images/stock.png', 'Lista de produtos');

      } else {
        console.error('Falha ao criar o produto. Código de status:', response.status);
      }
    } catch (error) {
      console.error('Erro de conexão', error);
    }



  };

  const leftContent = ([
    <Button typeEnum={TypeEnum.NONE}
      onClick={() =>
        handleButtonClick(
          <FormRegisterProduct onAddProduct={product => onNewProduct(product)} title="Registrar Produto" />,
          './images/register.png',
          'Adicionar produto')}
    >Registrar produto</Button>,
    <Button typeEnum={TypeEnum.NONE}
      onClick={() =>
        handleButtonClick(
          <FormEditProduct onEditProduct={product => onNewProduct(product)} title="Editar informações do produto" />,
          './images/edit.png',
          'Adicionar produto')}>Editar produto</Button>,
    <Button typeEnum={TypeEnum.NONE}
      onClick={() =>
        handleShowProducts()}>Ver estoque</Button>,
    <Button typeEnum={TypeEnum.NONE}
      onClick={() =>
        handleButtonClick(
          <FormRemoveProduct />,
          './images/add.png',
          'Saida de produto')}>Atualizar estoque</Button>
  ]
  )

  return (

    <div className="App">
      <Header pathImg='./images/logo.png' name='InvenTech' alt='Logo InvenTech'></Header>
      <Sidebar
        Content={leftContent}
      ></Sidebar>
      <MainContent pathImage={pathImage} textAlt={textAlt}>
        {formComponent}
      </MainContent>

    </div>
  );
}

export default App;
