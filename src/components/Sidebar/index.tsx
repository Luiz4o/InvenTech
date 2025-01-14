import React, { JSX } from 'react';
import './Sidebar.css';


interface SidebarProps {
  Content:JSX.Element[];
}

const Sidebar: React.FC<SidebarProps> = ({Content }) => {
  return (
    <div className='container'>
        {Content.map((item, index) => (
          <div key={index} className='container__element'>
            {item}
        </div>
      ))}
    </div>

  );
};

export default Sidebar;