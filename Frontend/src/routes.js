import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const ListaLivro = React.lazy(() => import ('./views/Livro/Lista'));
const CadastroLivro = React.lazy(() => import ('./views/Livro/Cadastro'));
const ArquivoLivro = React.lazy(() => import ('./views/Livro/Arquivo'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/livros', exact: true, name: 'Livro', component: ListaLivro },
  { path: '/livros/novo', name: 'Novo', component: CadastroLivro },
  { path: '/livros/:id', name: 'Edição', component: CadastroLivro },
  { path: '/arquivo/:id', name: 'Arquivo', component: ArquivoLivro },

];

export default routes;
