import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DefinicoesComponent } from './definicoes/definicoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FeedComponent } from './feed/feed.component';
import { IndividualphotoComponent } from './individualphoto/individualphoto.component';
import { LoadingComponent } from './loading/loading.component';
import { AddphotoComponent } from './addphoto/addphoto.component';

const routes: Routes = [
  { path: '', component : LoginComponent },
  { path: 'registar', component : RegisterComponent },
  { path: 'definicoes', component : DefinicoesComponent },
  { path: 'perfil/:nickname', component : PerfilComponent }, //vai ter tbm /:id
  { path: 'feed', component : FeedComponent },
  { path: 'foto/:id', component : IndividualphotoComponent },
  { path: 'perfil/:id/publicar', component : AddphotoComponent },


  //TEMPORARIO SO PARA TESTE
  { path: 'loading', component : LoadingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
