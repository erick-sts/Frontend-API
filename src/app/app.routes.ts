import { Routes } from '@angular/router';

//Login
import { TelaInicioComponent } from './components/Login/tela-inicio/tela-inicio.component';
import { TelaLoginComponent } from './components/Login/tela-login/tela-login.component';


//Central
import { TelaProfessorComponent } from '../app/components/Central/tela-professor/tela-professor.component';
import { TelaRelatorioProfessorComponent } from '../app/components/Central/tela-relatorio-professor/tela-relatorio-professor.component';
import { TelaRelatorioCursoComponent } from '../app/components/Central/tela-relatorio-curso/tela-relatorio-curso.component';
import { HomeComponent } from './components/Central/home/home.component';
import { TelaCadastroCursoComponent } from './components/Central/tela-cadastro-curso/tela-cadastro-curso.component';
import { TelaCadastroProfessorComponent } from './components/Central/tela-cadastro-professor/tela-cadastro-professor.component';
import { TelaCadastroUsuarioComponent } from './components/Login/tela-cadastro-usuario/tela-cadastro-usuario.component';
import { TelaEditarProfessorComponent } from '../app/components/Central/tela-editar-professor/tela-editar-professor.component';


//Componentes Visuais
import { NavbarComponent } from '../app/components/ComponentesVisuais/navbar/navbar.component';
import { FooterComponent } from '../app/components/ComponentesVisuais/footer/footer.component';
import { BotaoImprimirComponent } from './components/ComponentesVisuais/botao-imprimir/botao-imprimir.component';
import { AlertaComponent } from './components/ComponentesVisuais/alerta/alerta.component';

export const routes: Routes = [

    //Login

    { path: '', component: TelaInicioComponent },
    { path: 'tela-login', component: TelaLoginComponent },

    //Central
    { path: 'home', component: HomeComponent },
    { path: 'tela-cadastro-curso', component: TelaCadastroCursoComponent },
    { path: 'tela-cadastro-professor', component: TelaCadastroProfessorComponent },
    { path: 'tela-cadastro-usuario', component: TelaCadastroUsuarioComponent },
    { path: 'tela-relatorio-professor', component: TelaRelatorioProfessorComponent },
    { path: 'tela-relatorio-curso', component: TelaRelatorioCursoComponent },
    { path: 'tela-editar-professor/:nome', component: TelaEditarProfessorComponent },
    { path: 'tela-professor/:nome', component: TelaProfessorComponent },

    //Componentes Visuais
    { path: 'navbar', component: NavbarComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'botao-imprimir', component: BotaoImprimirComponent },
    { path: 'alerta', component: AlertaComponent },


];
