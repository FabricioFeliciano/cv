import React from 'react';

import Layout from '../../components/Layout';

import familia01 from '../../assets/images/familia01.jpg';
import familia02 from '../../assets/images/familia02.jpg';
import familia03 from '../../assets/images/familia03.jpg';
import familia04 from '../../assets/images/familia04.jpg';

const Mais: React.FC = () => {
    return <Layout>
        <div className='info'>
            <h3> <i className='icon icon-person' /> Um pouso sobre mim...</h3>
        </div>
        <div className="cards">
            <div className='card'>
                <div className="body">
                    <img src={familia01} />
                    <div className="info">
                        <ul>
                            <li>45 anos</li>
                            <li>Heterossexual</li>
                            <li>Cisgênero</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className="body">
                    <img src={familia02} />
                    <div className="info">
                        <ul>
                            <li>Casado (23 anos)</li>
                            <li>Marido da Roberta</li>
                            <li>Pai de família</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className="body">
                    <img src={familia03} />
                    <div className="info">
                        <ul>
                            <li>Uma filha</li>
                            <li>Um doguinho</li>
                            <li>Pai acolhedor <span className='link' onClick={() => window.open('https://familiaacolhedora.org.br/', '_blank', 'noreferrer')}>*</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className="body">
                    <img src={familia04} />
                    <div className="info">
                        <ul>
                            <li>Morador de Cabo Frio - RJ</li>
                            <li>Remoto há 6 anos</li>
                            <li>PJ se necessário</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </Layout>;
}

export default Mais;