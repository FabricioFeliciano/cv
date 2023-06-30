import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';

import IconLink from '../Elements/IconLink';

const Layout: React.FC = (props) => {

    const navigate = useNavigate();

    const [navigateVisible, setNavigateVisible] = useState(false);

    const changeRoute = (route: string) => {
        setNavigateVisible(false);
        navigate('/' + route);
    }

    const pathName = document.location.pathname.replace('/', '');

    const items = <>
        <li className={`${pathName === '' ? 'selected' : ''}`} onClick={() => changeRoute('')}>Início</li>
        <li className={`${pathName === 'formacao' ? 'selected' : ''}`} onClick={() => changeRoute('formacao')}>Formação</li>
        <li className={`${pathName === 'experiencia' ? 'selected' : ''}`} onClick={() => changeRoute('experiencia')}>Experiência</li>
        <li className={`${pathName === 'tecnologias' ? 'selected' : ''}`} onClick={() => changeRoute('tecnologias')}>Tecnologias</li>
        <li className={`${pathName === 'cursos' ? 'selected' : ''}`} onClick={() => changeRoute('cursos')}>Cursos</li>
        <li className={`${pathName === 'idiomas' ? 'selected' : ''}`} onClick={() => changeRoute('idiomas')}>Idiomas</li>
        <li className={`${pathName === 'mais' ? 'selected' : ''}`} onClick={() => changeRoute('mais')}>Mais</li>
    </>;

    return (
        <div className='layout'>
            <div className="topbar">
                <div className="left">
                    <div className="name">
                        FABRICIO FELICIANO
                    </div>

                    <div className="navigate show-only-small">
                        <IconLink icon='icon icon-list' onClick={() => setNavigateVisible(!navigateVisible)} />
                        {
                            navigateVisible &&
                            <ul className='items'>{items}</ul>
                        }
                    </div>

                    <ul className='items hide-on-small'>{items}</ul>



                </div>
                <div className="right">
                    <IconLink icon='icon icon-envelope' tooltip={{ content: 'E-mail', position: 'right' }} onClick={() => { window.location.href = 'mailto:fabriciofeliciano@hotmail.com'; }} />
                    <IconLink icon='icon icon-whatsapp' tooltip={{ content: 'WhatsApp', position: 'right' }} onClick={() => { window.location.href = 'https://api.whatsapp.com/send?phone=5521997999959&text=Olá.%20Estamos%20com%20uma%20oportunidade%20que%20se%20encaixa%20no%20seu%20perfil.%20Gostaria%20de%20conversar?'; }} />
                </div>
            </div>

            <div className="page scroll">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;