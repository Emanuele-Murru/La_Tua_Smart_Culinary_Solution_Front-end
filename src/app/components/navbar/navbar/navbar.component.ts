import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authSrv: AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
    console.log("logout effettuato con successo");
}
}
