import { JSX, useState } from 'react';
import Button, { TypeEnum } from './components/Button'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { IProduct } from './shared/interface/IProduct';
import Form from './components/FormRegisterProduct';
import MainContent from './components/MainContent';
import FormEditProduct from './components/FormEditProduct';
import FormAddProduct from './components/FormAddProduct';
import FormRemoveProduct from './components/FormRemoveProduct';
import Product from './components/Product';





function App() {

  const [products, setProducts] = useState<IProduct[]>([])

  const onNewProduct = (product: IProduct) => {
    setProducts([...products,product])
  }

  const [formComponent, setFormComponent] = useState<JSX.Element>(<Form onAddProduct={product => onNewProduct(product)} title="Registrar Produto" />);
  const [pathImage, setPathImage] = useState('./images/add.jpg');
  const [textAlt, setTextAlt] = useState('Adicionar produto');

  // Função que troca o componente de formulário e as props
  const handleButtonClick = (component: JSX.Element, image: string, altText: string) => {
    setFormComponent(component);
    setPathImage(image);
    setTextAlt(altText);
  };

  const handleShowProducts = () => {
    const productCards = (
      <>
        {products.map((product, index) => (
          <Product key={index} {...product} /> // Renderiza cada produto
        ))}
      </>
    );
    handleButtonClick(productCards, './images/stock.jpg', 'Lista de produtos');
  };

  const leftContent = ([
    <Button typeEnum={TypeEnum.NONE} 
    onClick={() =>
      handleButtonClick(
        <Form onAddProduct={product => onNewProduct(product)} title="Registrar Produto" />, 
        './images/register.jpg', 
        'Adicionar produto')}
        >Registrar produto</Button>,
    <Button typeEnum={TypeEnum.NONE}
    onClick={() =>
      handleButtonClick(
        <FormEditProduct onAddProduct={product => onNewProduct(product)} title="Editar informações do produto" />, 
        './images/edit.jpg', 
        'Adicionar produto')}>Editar produto</Button>,
    <Button typeEnum={TypeEnum.NONE}
    onClick={() =>
      handleButtonClick(
        <FormAddProduct onAddProduct={product => onNewProduct(product)} title="Adicionar Produtos"/>, 
        './images/add.jpg', 
        'Adicionar produto')}>Adicionar produtos</Button>,
    <Button typeEnum={TypeEnum.NONE}
    onClick={() =>
      handleShowProducts()}>Ver estoque</Button>,
    <Button typeEnum={TypeEnum.NONE}
    onClick={() =>
      handleButtonClick(
        <FormRemoveProduct onAddProduct={product => onNewProduct(product)} title="Saida de produtos do estoque" />, 
        './images/stock.jpg', 
        'Saida de produto')}>Saída de produtos</Button>
  ]
)

  return (
    <div className="App">
      <Header pathImg='./images/logo.png' name='InvenTech' alt='Logo InvenTech'></Header>
      <Sidebar 
      Content={leftContent}
      ></Sidebar>
      <MainContent  pathImage={pathImage} textAlt={textAlt}>
        {formComponent}    
      </MainContent>
      
    </div>
  );
}

export default App;
