import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DefinicoesComponent } from './definicoes/definicoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FeedComponent } from './feed/feed.component';
import { IndividualphotoComponent } from './individualphoto/individualphoto.component';

const routes: Routes = [
  { path: '', component : LoginComponent },
  { path: 'registar', component : RegisterComponent },
  { path: 'definicoes', component : DefinicoesComponent },
  { path: 'perfil', component : PerfilComponent },
  { path: 'feed', component : FeedComponent },
  { path: 'foto/:id', component : IndividualphotoComponent }, //TODO e preciso adicionar /:id ao link
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
