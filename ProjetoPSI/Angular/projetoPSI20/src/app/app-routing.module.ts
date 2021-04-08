import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DefinicoesComponent } from './definicoes/definicoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FeedComponent } from './feed/feed.component';
import { IndividualphotoComponent } from './individualphoto/individualphoto.component';
import { LoadingphotoComponent } from './loadingphoto/loadingphoto.component';
import { AddphotoComponent } from './addphoto/addphoto.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component : LoginComponent },
  { path: 'registar', component : RegisterComponent },
  { path: 'definicoes', component : DefinicoesComponent, canActivate: [AuthGuardService]  },
  { path: 'perfil/:nickname', component : PerfilComponent, canActivate: [AuthGuardService]  }, //vai ter tbm /:id
  //{ path: 'feed', component : FeedComponent },
  { path: 'foto/:id', component : IndividualphotoComponent},
  { path: 'publicar', component : AddphotoComponent, canActivate: [AuthGuardService]  },
  { path: 'favoritos', component : FavoritosComponent, canActivate: [AuthGuardService]  },

  { path: 'feed', component: FeedComponent, canActivate: [AuthGuardService] },

  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
