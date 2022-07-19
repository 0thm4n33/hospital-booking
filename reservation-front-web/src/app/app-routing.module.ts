import { AdminGuardService } from './services/admin-guard.service';
import { ListRdvComponent } from './rdv-views/list-rdv/list-rdv.component';
import { SinglePatientComponent } from './secretair-views/single-patient/single-patient.component';
import { ListPreRdvPatientComponent } from './secretair-views/list-pre-rdv-patient/list-pre-rdv-patient.component';
import { DemandeRdvComponent } from './rdv-views/demande-rdv/demande-rdv.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { ListPreRdvComponent } from './rdv-views/list-pre-rdv/list-pre-rdv.component';
import { ListPatientComponent } from './secretair-views/list-patient/list-patient.component';
import { ListRdvsComponent } from './secretair-views/list-rdvs/list-rdvs.component';

const routes: Routes = [
  {path:'',component:AccueilComponent},
  {path:'signin',component:SigninComponent},
  {path:'accueill',component:AccueilComponent},
  {path:'signup',component:SignupComponent},
  {path:'addPRdv',canActivate:[AuthGuardService],component:DemandeRdvComponent},
  {path:'listPreRdvs',canActivate:[AuthGuardService],component:ListPreRdvComponent},
  {path:'listAllPreRdvs',canActivate:[AdminGuardService],component:ListPreRdvPatientComponent},
  {path:'listAllPreRdvs/:id',canActivate:[AdminGuardService],component:SinglePatientComponent},
  {path:'listAllPatiens',canActivate:[AdminGuardService],component:ListPatientComponent},
  {path:'listAllRdvs',canActivate:[AuthGuardService],component:ListRdvComponent},
  {path:'AllRdvs',canActivate:[AdminGuardService],component:ListRdvsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
