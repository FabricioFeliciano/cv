import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Formacao from './pages/Formacao';
import Experiencia from './pages/Experiencia';
import Tecnologias from './pages/Tecnologias';
import Cursos from './pages/Cursos';
import Idiomas from './pages/Idiomas';
import Mais from './pages/Mais';

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/formacao", element: <Formacao /> },
    { path: "/experiencia", element: <Experiencia /> },
    { path: "/tecnologias", element: <Tecnologias /> },
    { path: "/cursos", element: <Cursos /> },
    { path: "/idiomas", element: <Idiomas /> },
    { path: "/mais", element: <Mais /> },
]);

const Routes: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes;