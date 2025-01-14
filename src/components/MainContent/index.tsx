import './MainContent.css'
import {  ReactNode } from 'react'

interface MainContentProps {
    children: ReactNode
    pathImage: string    
    textAlt: string        
}

const MainContent = ({ children, pathImage, textAlt }: MainContentProps) => {
    return (
        <section className="main-content">
            <div className='content'>
                {children}
                <img src={pathImage} alt={textAlt} />
            </div>
        </section>
    )
}

export default MainContent