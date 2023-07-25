import React from 'react';

import './index.scss';

import Layout from '../../components/Layout';

import technologies from './index.json'

const Tecnologias: React.FC = () => {

    return <Layout>
        <div className='info'>
            <h1> <i className='icon icon-cog' /> Tecnologias e Metodologias</h1>
        </div>
        <div className="technologies">

            <h3>Tenho um conhecimento abrangente em todas as tecnologias mencionadas aqui, o que me permite ter plena confiança em participar de qualquer projeto que as utilize.</h3>

            {
                technologies
                    .sort((a, b) => { return a.time > b.time ? -1 : 1 })
                    .map((t, i) => <div className='technology' key={i}>
                        <div className="content">
                            <div className="top">
                                <div className="logo">
                                    <img src={t.logo} />
                                </div>
                                <div className="name">{t.name}</div>
                                <div className="time">{t.time} {t.time > 1 ? 'anos' : 'ano'}</div>
                            </div>
                            <div className="desc">{t.desc}</div>
                        </div>
                    </div>)
            }
        </div>
    </Layout>;
}

export default Tecnologias;