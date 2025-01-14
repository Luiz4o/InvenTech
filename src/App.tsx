import Button, { TypeEnum } from './components/Button'
import Header from './components/Header';
import Sidebar from './components/Sidebar';


const leftContent = ([
        <Button typeEnum={TypeEnum.NONE}>Logout</Button>,
        <Button typeEnum={TypeEnum.NONE}>Logout</Button>,
        <Button typeEnum={TypeEnum.NONE}>Logout</Button>,
        <Button typeEnum={TypeEnum.NONE}>Logout</Button>,
        <Button typeEnum={TypeEnum.NONE}>Logout</Button>,
        <Button typeEnum={TypeEnum.NONE}>Logout</Button>

      ]
)


function App() {
  return (
    <div className="App">
      <Header pathImg='./images/logo.png' name='InvenTech' alt='Logo InvenTech'></Header>
      <Sidebar 
      Content={leftContent}
      ></Sidebar>

      
    </div>
  );
}

export default App;
