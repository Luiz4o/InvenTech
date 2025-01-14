import './Header.css'

interface HeaderProps{
    pathImg: string
    alt: string
    name: string
}

export const Header = ({pathImg,alt,name}: HeaderProps) => {
    return (
        <header>
            <div className='logo'>
                <img className='logo__img' src={pathImg} alt={alt}/>
                <h1>{name}</h1>
            </div>
            <a href=''>Sair</a>
        </header>
    )
}

export default Header