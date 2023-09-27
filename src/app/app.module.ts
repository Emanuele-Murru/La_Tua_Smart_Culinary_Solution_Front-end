import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { UsersComponent } from './components/user/users/users.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './auth/auth.guard';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Route[] = [
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipes/detail-page/:id',
    component: DetailPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    RecipesComponent,
    HomepageComponent,
    DetailPageComponent,
    ErrorPageComponent,
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
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
