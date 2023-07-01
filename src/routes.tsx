import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Resumo from './pages/Resumo';
import Formacao from './pages/Formacao';
import Experiencia from './pages/Experiencia';
import Tecnologias from './pages/Tecnologias';
import Cursos from './pages/Cursos';
import Contato from './pages/Contato';
import Mais from './pages/Mais';

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/resumo", element: <Resumo /> },
    { path: "/formacao", element: <Formacao /> },
    { path: "/experiencia", element: <Experiencia /> },
    { path: "/tecnologias", element: <Tecnologias /> },
    { path: "/cursos", element: <Cursos /> },
    { path: "/contato", element: <Contato /> },
    { path: "/mais", element: <Mais /> },
]);

const Routes: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes;