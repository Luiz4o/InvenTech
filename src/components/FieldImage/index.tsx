import './Field.css'
interface FieldImageProps {
    onChange: (value: File | null) => void
    placeholder: string
    label: string
    value: number | string
    required?: boolean
    type?: 'file'
}

const FieldImage = ({ placeholder, onChange, label, value, required = false, type = 'file' }: FieldImageProps) => {

    const placeholderModify = `${placeholder}...`

    const onTyping = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const file = evento.target.files?.[0] || null
        onChange(file)
    }

    return (
        <div className="field-image">
            <label>
                {label}
            </label>
            <input onChange={onTyping} required={required} placeholder={placeholderModify} type={type} accept='.png' />
        </div>
    )
}

export default FieldImage