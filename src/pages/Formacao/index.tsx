import React from 'react';

import './index.scss';

import Layout from '../../components/Layout';

import Formacao01 from '../../assets/images/formacao01.jpg';

const Formacao: React.FC = () => {
    return <Layout>
        <div className='info'>
            <h1> <i className='icon icon-user-graduate' /> Formação</h1>
            <h4>Formado pela Universidade Estácio de Sá<br />
                Tecnólogo em Análise de Sistemas da Computação<br />
                Concluído em 2008</h4>
        </div>
        <div className="educations">
            <img className="education" src={Formacao01} />
        </div>
    </Layout>;
}

export default Formacao;