import React from 'react';

import './index.scss';

import Layout from '../../components/Layout';

const Cursos: React.FC = () => {

    const courses = [
        {
            name: "NLW Setup",
            school: "Rockeseat",
            date: "2023 janeiro",
            info: ["Node.js / React / React Native"]
        },
        {
            name: "NLW Copa (Next Level Week Copa)",
            school: "Rocketseat",
            info: ["Node.js / React / React Native"],
            date: "2022 novembro"
        },
        {
            name: "NLW / Together (Next Level Week Together)",
            school: "Rocketseat",
            info: ["Node.js / React / React Native"],
            date: "2021 junho"
        },
        {
            name: "NLW 5 (Next Level Week)",
            school: "Rocketseat",
            info: ["Node.js / React / React Native"],
            date: "2021 abril"
        },
        {
            name: "NLW 4 (Next Level Week)",
            school: "Rocketseat",
            info: ["Node.js / React / React Native"],
            date: "2021 fevereiro"
        },
        {
            name: "NLW 3 (Next Level Week)",
            school: "Rocketseat",
            info: ["Node.js / React / React Native"],
            date: "2020 outubro"
        },
        {
            name: "NLW 2 (Next Level Week)",
            school: "Rocketseat",
            info: ["Node.js / React / React Native"],
            date: "2020 agosto"
        },
        {
            name: "NLW (Next Level Week)",
            school: "Rocketseat",
            info: ["Node.js / React / React Native"],
            date: "2020 junho"
        },
        {
            name: "OmniStack",
            school: "Rocketseat",
            info: ["Node.js / React / React Native"],
            date: "2020 março"
        },
        {
            name: "Desenvolvimento Web com HTML5, CSS3 e JavaScript",
            school: "Caelum",
            date: "2016 novembro"
        },
        {
            name: "Surfando no Scrum",
            school: "PMG Academy",
            date: "2016 abril"
        },
        {
            name: "ITMP - Os Princípios de Gerenciamento de TI",
            school: "EXIN Brasil",
            date: "2015 dezembro",
            info: ["Base do Gerenciamento com ITIL e COBIT"]
        },
        {
            name: "Certificação Microsoft MCTS.NET Framework",
            school: "Allen Informática",
            info: [
                "MS 4994A - Introduction to Programming Microsoft.NET Applications",
                "MS 2956B - Core Foundations of Microsoft.NET 2.0 Development",
                "MS 2957B - Advanced Foundations of Microsoft.NET 2.0 Development",
                "MS 6464 - Visual Studio 2008: ADO NET 3.5"
            ]
        }
    ]

    return <Layout>
        <div className='info'>
            <h1> <i className='icon icon-chalkboard-teacher' /> Cursos</h1>
        </div>
        <div className="courses">
            {
                courses.map((c, i) => <div className='course' key={i}>
                    <div className="content">
                        <div className="name">{c.name}</div>
                        <div className="row between">
                            <div className="school">{c.school}</div>
                            <div className="date">{c.date}</div>
                        </div>
                        {
                            c.info &&
                            <ul className='info'>
                                {
                                    c.info.map((f, i) => <li key={i}>{f}</li>)
                                }
                            </ul>
                        }
                    </div>
                </div>)
            }
        </div>
    </Layout>;
}

export default Cursos;