import React from 'react';

import './index.scss';

import Layout from '../../components/Layout';

const Certificacoes: React.FC = () => {

    const certifications = [

        {
            name: "Criar designs e protótipos de alta fidelidade no Figma",
            school: "Google",
            date: "agosto 2024",
            image: "certification09.png",
            url: "https://www.coursera.org/account/accomplishments/verify/2MT4G5YZXH31"
        },
        {
            name: "Conduzir pesquisas de UX e testar os primeiros conceitos",
            school: "Google",
            date: "abril 2024",
            image: "certification08.png",
            url: "https://www.coursera.org/account/accomplishments/verify/4JQB6F5D552B"
        },
        {
            name: "Criar wireframes e protótipos de baixa fidelidade",
            school: "Google",
            date: "março 2024",
            image: "certification07.png",
            url: "https://www.coursera.org/account/accomplishments/verify/3LQWVB277FRJ"
        },
        {
            name: "Iniciar o processo de design de UX: criar empatia, definir e idealizar",
            school: "Google",
            date: "janeiro 2024",
            image: "certification06.png",
            url: "https://www.coursera.org/account/accomplishments/verify/BYBT6JDQS39H"
        },
        {
            name: "Fundamentos do design da experiência do usuário (UX)",
            school: "Google",
            date: "dezembro 2023",
            image: "certification05.png",
            url: "https://www.coursera.org/account/accomplishments/verify/E5VGGL6GFAJB"
        },
        {
            name: "AI for Devs",
            school: "Rockeseat",
            date: "agosto 2023",
            image: "certification03.png",
            url: "https://app.rocketseat.com.br/certificates/08c83364-1b8f-470d-bdeb-48091f09c16b"
        },
        {
            name: "NLW Journey - Csharp",
            school: "Rocketseat",
            date: "julho 2024",
            image: "certification04.png",
            url: "https://app.rocketseat.com.br/certificates/165935cd-888e-4153-9e70-ae4d797a5d47"
        },
        {
            name: "NLW Unite - React Native",
            school: "Rocketseat",
            date: "abril 2024",
            image: "certification02.png",
            url: "https://app.rocketseat.com.br/certificates/b2469dcd-0b68-42d9-8648-c7d019ef9902"
        },
        {
            name: "Metodologias Ágeis e Conceitos Lean para o Desenvolvimento de Software",
            school: "Módulo Security",
            date: "2016 fevereiro",
            image: "certification01.png"
        },
    ]

    return <Layout>
        <div className='info'>
            <h1> <i className='icon icon-certificate' /> Certificações</h1>
        </div>
        <div className="certifications">
            {
                certifications.map((c, i) => <div className='certification' key={i}>
                    <div className="content">
                        <div className="name">{c.name}</div>
                        <div className="row between">
                            <div className="school">{c.school}</div>
                            <div className="date">{c.date}</div>
                        </div>
                        {
                            c.image &&
                            <img className="cert" alt={c.image} src={require('../../assets/images/' + c.image)} />
                        }
                        {
                            c.url &&
                            <a className='url' href={c.url} target='certification'>Ver certificado</a>
                        }
                    </div>
                </div>)
            }
        </div>
    </Layout>;
}

export default Certificacoes;