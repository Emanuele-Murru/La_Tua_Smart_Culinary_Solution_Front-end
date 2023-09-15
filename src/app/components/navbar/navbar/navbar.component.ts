import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
showButtonsLog: boolean = true;
navEl = document.querySelector('.navbar');

  constructor(private authSrv: AuthService,private router: Router) { }

  ngOnInit(): void {
    if(this.authSrv.isLoggedIn()){
      this.showButtonsLog = false;
    }

    window.addEventListener('DOMContentLoaded', () => {
      const navEl = document.getElementById('navEl');
      if (!navEl) {
        console.error("L'elemento con l'ID 'navEl' non è stato trovato.");
        return;
      }

      window.addEventListener('scroll', () => {
        if (window.scrollY >= 1) {
          navEl.classList.add('navbar-scroll');
        } else if (window.scrollY < 56) {
          navEl.classList.remove('navbar-scroll');
        }
      });
    });

  }

  logOut() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
    console.log("logout effettuato con successo");
}
}
