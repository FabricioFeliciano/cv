import React, { useState } from 'react';

import './index.scss';

import Layout from '../../components/Layout';

const Contato: React.FC = () => {

    return <Layout>
        <div className='info'>
            <h1><i className='icon icon-phone' /> Contato</h1>
            <h2>Fabricio Felix Feliciano</h2>
            <h3><b>E-mail:</b> fabriciofeliciano@hotmail.com.br <i className='icon icon-envelope link' onClick={() => { window.location.href = 'mailto:fabriciofeliciano@hotmail.com'; }} /></h3>
            <h3><b>Celular:</b> 21 99799-9959 <i className='icon icon-whatsapp link' onClick={() => { window.location.href = 'https://api.whatsapp.com/send?phone=5521997999959&text=Olá.%20Estamos%20com%20uma%20oportunidade%20que%20se%20encaixa%20no%20seu%20perfil.%20Gostaria%20de%20conversar?'; }} /></h3>
            <h3><b>Endereço:</b> Casemiro de Abreu, 500 C1 • Cabo Frio • RJ • CEP 28905-360</h3>
        </div>
    </Layout>;
}

export default Contato;