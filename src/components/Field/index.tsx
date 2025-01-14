import './CampoTexto.css'

interface FieldTextProps {
    onChange: (value: string) => void
    placeholder: string
    label: string
    value: string
    required?: boolean
    type?: 'text' | 'password' | 'date' | 'email' | 'number'
}

const FieldText = ({placeholder,onChange,label,value,required = false, type = 'text'}: FieldTextProps) => {

    const placeholderModify = `${placeholder}...` 

    const onTyping = (evento: React.ChangeEvent<HTMLInputElement>) => {
        onChange(evento.target.value)
    }

    return (
        <div className="field-text">
            <label>
                {label}
            </label>
            <input value={value} onChange={onTyping} required={required} placeholder={placeholderModify} type={type}/>
        </div>
    )
}

export default FieldText