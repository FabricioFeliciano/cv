import React from 'react';

import Layout from '../../components/Layout';

const Home: React.FC = () => {
    return <Layout>
        <div className='info' >
            <h1> <i className='icon icon-award' /> Dev Frontend Sênior</h1>
            <h4>25 anos de experiência em TI. Mais de 10 anos de experiência como desenvolvedor. Apaixonado por UI/UX.</h4>

        </div>
        <div className="row">
            <button onClick={() => window.open('https://www.linkedin.com/in/fabriciofeliciano', '_blank', 'noreferrer')}><i className='icon icon-linkedin' /> LinkedIn</button>
            <button onClick={() => window.open('https://github.com/FabricioFeliciano', '_blank', 'noreferrer')}><i className='icon icon-github' /> Github</button>
            <button onClick={() => window.open('https://www.instagram.com/fabriciofelixfeliciano', '_blank', 'noreferrer')}><i className='icon icon-instagram' /> Instagram</button>
        </div>
    </Layout>;
}

export default Home;