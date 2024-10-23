import React, { useState } from 'react';

import './index.scss';

import Layout from '../../components/Layout';

import technologies from './index.json'
import Toggle from '../../components/Input/Toggle';

const Tecnologias: React.FC = () => {

    var [options, setOptions] = useState<string[]>(["fw", "lg", "mt", "tc"]);

    var toogleOption = (option: string) => {
        options.includes(option) ?
            setOptions(options.filter(o => o !== option))
            :
            setOptions([...options, option]);
    }

    return <Layout>
        <div className='info'>
            <h1> <i className='icon icon-cog' /> Tecnologias e Metodologias</h1>
        </div>
        <div className="technologies">

            <h3>Tenho um conhecimento abrangente em todas as tecnologias mencionadas aqui, o que me permite ter plena confiança em participar de qualquer projeto que as utilize.</h3>

            <div className='w-100p row g-7'>
                <Toggle toggled={options.includes("fw")} title='Framework' onChange={() => toogleOption("fw")} />
                <Toggle toggled={options.includes("lg")} title='Linguagem' onChange={() => toogleOption("lg")} />
                <Toggle toggled={options.includes("mt")} title='Metodologia' onChange={() => toogleOption("mt")} />
                <Toggle toggled={options.includes("tc")} title='Tecnologia' onChange={() => toogleOption("tc")} />
            </div>

            {
                technologies
                    .filter(t => options.includes(t.type))
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