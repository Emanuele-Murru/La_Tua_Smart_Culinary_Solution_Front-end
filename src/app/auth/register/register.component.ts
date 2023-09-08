import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
nome :string = '';
cognome: string = '';
ruolo :string = '';
email :string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

register(){
  this.authService.register(this.username, this.nome, this.cognome, this.email, this.password, this.ruolo).subscribe(
    (response) => {
      console.log('Registrazione effettuata:', response);
      this.router.navigate(['/login']);
    },
    (error) => {
      console.error('Registration error:', error);

    }
  );
}
}



