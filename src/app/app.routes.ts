import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { NosotrosPage } from './features/nosotros-page/nosotros-page';

export const routes: Routes = [
    //Ruta inicial
    {path:'',component: HomePage},
    {path:'nosotros', component:NosotrosPage}

    //Ruta error 404
    //{path:'**', component:Pagina404}
];
