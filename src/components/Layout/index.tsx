import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';

import IconLink from '../Elements/IconLink';

const Layout: React.FC = (props) => {

    const navigate = useNavigate();

    const [selected, setSelected] = useState('inicio');

    const changeRoute = (route: string) => {
        setSelected(route);
        navigate('/' + route);
    }

    return (
        <div className='layout'>
            <div className="topbar">
                <div className="left">
                    <div className="name">
                        FABRICIO FELICIANO
                    </div>
                    <ul className='items'>
                        <li className={`${selected === '' ? 'selected' : ''}`} onClick={() => changeRoute('')}>Início</li>
                        <li className={`${selected === 'formacao' ? 'selected' : ''}`} onClick={() => changeRoute('formacao')}>Formação</li>
                        <li className={`${selected === 'experiencia' ? 'selected' : ''}`} onClick={() => changeRoute('experiencia')}>Experiência</li>
                        <li className={`${selected === 'tecnologias' ? 'selected' : ''}`} onClick={() => changeRoute('tecnologias')}>Tecnologias</li>
                        <li className={`${selected === 'cursos' ? 'selected' : ''}`} onClick={() => changeRoute('cursos')}>Cursos</li>
                        <li className={`${selected === 'idiomas' ? 'selected' : ''}`} onClick={() => changeRoute('idiomas')}>Idiomas</li>
                        <li className={`${selected === 'mais' ? 'selected' : ''}`} onClick={() => changeRoute('mais')}>Mais</li>
                    </ul>
                </div>
                <div className="right">
                    <IconLink icon='icon icon-envelope' tooltip={{ content: 'E-mail', position: 'right' }} onClick={() => { window.location.href = 'mailto:fabriciofeliciano@hotmail.com'; }} />
                    <IconLink icon='icon icon-whatsapp' tooltip={{ content: 'WhatsApp', position: 'right' }} onClick={() => { window.location.href = 'https://api.whatsapp.com/send?phone=5521997999959&text=Olá.%20Estamos%20com%20uma%20oportunidade%20que%20se%20encaixa%20no%20seu%20perfil.%20Gostaria%20de%20conversar?'; }} />
                </div>
            </div>

            <div className="page">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;