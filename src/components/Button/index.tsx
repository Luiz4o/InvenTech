import './Button.css'

enum TypeEnum{
    ACTION = 'Action',
    CANCEL = 'Cancel',
    NONE = 'None'
}

interface BotaoProps {
    children: string,
    typeEnum: TypeEnum,
    onClick?: ()=> void
}

const Button = ({children,typeEnum, onClick}: BotaoProps) => {
    return (<button className={typeEnum} onClick={onClick}>
        {children}
    </button>)
    
}

export default Button
export { TypeEnum }