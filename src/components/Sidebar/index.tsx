import React, { JSX } from 'react';
import './Sidebar.css';


interface SidebarProps {
  Content:JSX.Element[] | React.ReactNode; 
}

const Sidebar: React.FC<SidebarProps> = ({Content }) => {
  return (
    <div className="container">
        <div className='container__element'>
            {Content}
        </div>
    </div>

  );
};

export default Sidebar;