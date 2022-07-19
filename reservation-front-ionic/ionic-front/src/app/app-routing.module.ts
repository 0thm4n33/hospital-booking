import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inscription-patient',
    loadChildren: () => import('./pages/inscription-patient/inscription-patient.module').then( m => m.InscriptionPatientPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'list-pre-rdvs',
    loadChildren: () => import('./pages/list-pre-rdvs/list-pre-rdvs.module').then( m => m.ListPreRdvsPageModule)
  },
  {
    path: 'pre-rdv',
    loadChildren: () => import('./pages/pre-rdv/pre-rdv.module').then( m => m.PreRdvPageModule)
  },
  {
    path: 'rdv-to-pdf',
    loadChildren: () => import('./modals/rdv-to-pdf/rdv-to-pdf.module').then( m => m.RdvToPdfPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
