import { ReactElement } from 'react'
import './Button.css'

import React from 'react'

enum TypeEnum{
    ACTION = 'Action',
    CANCEL = 'Cancel'
}

interface BotaoProps {
    children: ReactElement,
    typeEnum: TypeEnum
}

const Botao = ({children,typeEnum}: BotaoProps) => {
    if(typeEnum === 'Action'){
        return (<button className='Action'>
            {children}
        </button>)
    }else if(typeEnum === 'Cancel'){
        return (<button className='Cancel'>
            {children}
        </button>)
    }
    
}

export default Botao
export { TypeEnum }