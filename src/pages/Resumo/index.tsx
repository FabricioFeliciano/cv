import React from 'react';

import './index.scss';

import Layout from '../../components/Layout';

const Resumo: React.FC = () => {
    return <Layout>
        <div className='info'>
            <h1> <i className='icon icon-bookmark' /> Resumo</h1>
        </div>
        <div className="resumo">
            <p>
                Em 25 anos de experiência em TI, mudei de área algumas vezes. Hoje tenho mais de 10 anos de experiência como desenvolvedor.
            </p>
            <p>
                Desejo fazer parte de uma equipe de desenvolvimento onde possa colaborar com as necessidades da empresa e estender meus conhecimentos, crescendo profissionalmente e agregando valor ao time.
            </p>
            <p>
                Gosto de desafios e de fazer a diferença no trabalho. Tenho prazer em aprender novas tecnologias.
            </p>
        </div>
    </Layout>;
}

export default Resumo;