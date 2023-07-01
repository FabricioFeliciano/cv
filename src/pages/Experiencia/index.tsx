import React from 'react';

import './index.scss';

import Layout from '../../components/Layout';

const Experiencia: React.FC = () => {

    const employments = [
        {
            company: "Processor",
            logo: "employment01.png",
            position: "Desenvolvedor Full Stack Sênior",
            period: 'junho 2020 até agora',
            missions: [
                "Criação de framework front-end próprio com ReactJS ou VueJS.",
                "Suporte ao portal de gestão de serviços SaaS da empresa, com ênfase no front-end e criação de componentes.",
                "Conversão do portal mencionado em uma nova versão totalmente recriada em React.JS."
            ],
            skills: ["React", "Redux", "SCSS", "Material UI", "GIT", "C#", "MVC Core", "API", "BFF", "Vue.JS", "Angular", "Typescript", "Desing System", "Bootstrap", "MSSQL Server", "JWT"]
        },
        {
            company: "Módulo Security Solution",
            logo: "employment02.png",
            position: "Analista de Sistemas / Desenvolvedor",
            period: 'janeiro 2015 até maio 2020',
            missions: [
                "Solução de gestão desenvolvida com Azure Service Fabric com interface utilizando framework próprio e componentes desenvolvidos do zero.",
                "Criação de interface web para um sistema de gestão de projetos integrando como back-end o ERP da empresa. Toda a base anterior foi migrada da solução antiga para o novo sistema. Todo a interface foi desenvolvida em .NET MVC e autenticação via Active Directory no início e mais tarde Azure Active Directory e conexão com o back-end por webservice SOAP."
            ],
            skills: [".NET", "C#", "Bootstrap", "GIT", "MVC Core", "MongoDB", "Vue.JS", "API", "SOAP", "React"]
        },
        {
            company: "Daticopy",
            logo: "employment03.png",
            position: "Desenvolvedor",
            period: 'Maio 2005 até maio 2014',
            missions: [
                "Responsável pelo planejamento, desenvolvimento, instalação e suporte a soluções de bilhetagem de impressão e cópia para impressoras e multifuncionais.",
                "Suporte a clientes para soluções de impressão e cópia. KonicaMinolta PageScope Enterprise Suite, PaperCut, ND Digital, PCounter, OS e PCL."
            ],
            skills: [".NET", "C#", "ASP NET", "MSSQLServer", "Bootstrap", "SOAP"]
        }
    ]


    return <Layout>
        <div className='info'>
            <h1> <i className='icon icon-briefcase' /> Experiência</h1>
        </div>
        <div className='employments'>
            {
                employments.map((e, i) => {
                    return <div key={i} className='employment'>
                        <img className="logo" alt={e.company} src={require('../../assets/images/' + e.logo)} />
                        <div className="position">{e.position}</div>
                        <div className='period'><i className='icon icon-calendar text-link mr-4' /> {e.period}</div>
                        <div className="missions">
                            {
                                e.missions.map((m, i) => <div className='mission' key={i}>
                                    <i className='icon icon-arrow-alt-circle-right text-link mr-4' />
                                    {m}
                                </div>)
                            }
                        </div>
                        <div className="skills">
                            {
                                e.skills.map((s, i) => <div key={s} className='skill'>{s}</div>)
                            }
                        </div>
                    </div>
                })
            }

        </div>
    </Layout>;
}

export default Experiencia;