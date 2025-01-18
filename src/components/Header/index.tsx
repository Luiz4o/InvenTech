import { useNavigate } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
    pathImg: string
    alt: string
    name: string
}

export const Header = ({ pathImg, alt, name }: HeaderProps) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');

        navigate('/login');
    }

    return (
        <header>
            <div className='logo'>
                <img className='logo__img' src={pathImg} alt={alt} />
                <h1>{name}</h1>
            </div>
            <button onClick={handleLogout}>Sair</button>
        </header>
    )
}


export default Header