import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DefinicoesComponent } from './definicoes/definicoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HeaderComponent } from './header/header.component';
import { FeedComponent } from './feed/feed.component';
import { HttpClientModule } from '@angular/common/http';
import { IndividualphotoComponent } from './individualphoto/individualphoto.component';
import { LoadingComponent } from './loading/loading.component';
import { AddphotoComponent } from './addphoto/addphoto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { LoadingphotoComponent } from './loadingphoto/loadingphoto.component';
import { SuccessiconComponent } from './successicon/successicon.component';
import { ErroriconComponent } from './erroricon/erroricon.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefinicoesComponent,
    PerfilComponent,
    HeaderComponent,
    FeedComponent,
    IndividualphotoComponent,
    LoadingComponent,
    AddphotoComponent,
    NotfoundComponent,
    FavoritosComponent,
    LoadingphotoComponent,
    SuccessiconComponent,
    ErroriconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
