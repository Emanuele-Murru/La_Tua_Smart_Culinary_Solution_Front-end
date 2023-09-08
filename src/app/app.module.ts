import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { UsersComponent } from './components/user/users/users.component';
import { AppService } from './services/app.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Route[] = [
    {
      path: '',
      redirectTo: 'register',
      pathMatch: 'full'
    },
    {
      path: 'users',
      component: UsersComponent,
      // canActivate: [AuthGuard]
    },
    {
      path: 'recipes',
      component: RecipesComponent,
      // canActivate: [AuthGuard]
    },
    {
      path: 'navbar',
      component: NavbarComponent,
      // canActivate: [AuthGuard]
    },
    {
      path: 'login',
      component: LoginComponent,
      // canActivate: [AuthGuard]
    },
    {
      path: 'register',
      component: RegisterComponent
    }
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['localhost:3001'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
