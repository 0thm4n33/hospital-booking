import { FileSaverModule } from 'ngx-filesaver';
import { DemandeRdvComponent } from './rdv-views/demande-rdv/demande-rdv.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PrerdvComponent } from './rdv-views/prerdv/prerdv.component';
import { ListPreRdvComponent } from './rdv-views/list-pre-rdv/list-pre-rdv.component';
import { ListPreRdvPatientComponent } from './secretair-views/list-pre-rdv-patient/list-pre-rdv-patient.component';
import { RendezVousComponent } from './secretair-views/rendez-vous/rendez-vous.component';
import { SinglePatientComponent } from './secretair-views/single-patient/single-patient.component';
import { AttribuerIPPComponent } from './secretair-views/attribuer-ipp/attribuer-ipp.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListPatientComponent } from './secretair-views/list-patient/list-patient.component';
import { SearchIppComponent } from './secretair-views/search-ipp/search-ipp.component';
import { OhFourOhComponent } from './secretair-views/oh-four-oh/oh-four-oh.component';
import { ConfirmePrerdvComponent } from './secretair-views/confirme-prerdv/confirme-prerdv.component';
import { ConsultationComponent } from './secretair-views/consultation/consultation.component';
import { CinComponent } from './secretair-views/cin/cin.component';
import { ListRdvComponent } from './rdv-views/list-rdv/list-rdv.component';
import { RdvpdfComponent } from './rdv-views/rdvpdf/rdvpdf.component';
import { ListRdvsComponent } from './secretair-views/list-rdvs/list-rdvs.component';
import { FilterComponent } from './secretair-views/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AccueilComponent,
    SignupComponent,
    HeaderComponent,
    DemandeRdvComponent,
    PrerdvComponent,
    ListPreRdvComponent,
    ListPreRdvPatientComponent,
    RendezVousComponent,
    SinglePatientComponent,
    AttribuerIPPComponent,
    ListPatientComponent,
    SearchIppComponent,
    OhFourOhComponent,
    ConfirmePrerdvComponent,
    ConsultationComponent,
    CinComponent,
    ListRdvComponent,
    RdvpdfComponent,
    ListRdvsComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [AuthService,FileSaverModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
