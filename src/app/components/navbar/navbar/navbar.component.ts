import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showButtonsLog: boolean = true;
  navEl = document.querySelector('.navbar');

  isFirstLoad!: boolean;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    const isFirstLoad = sessionStorage.getItem('isFirstLoad') === 'true';
    this.isFirstLoad = isFirstLoad;
    setTimeout(() => {
      if (this.router.url === '/homepage' && isFirstLoad) {

        if (isFirstLoad) {
          const navEl = document.getElementById('navEl');
          navEl!.style.display = 'none';
          setInterval(() => {
            navEl!.style.display = 'flex';
          }, 3500);
        }
      } else {
      }
    }, 15);

    if (this.authSrv.isLoggedIn()) {
      this.showButtonsLog = false;
    }
  }

  logOut() {
    this.authSrv.logout();
    this.router.navigate(['/']);
    console.log('logout effettuato con successo');
  }
}
