import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: User | null = null;

  constructor(private userSrv: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.userSrv.getCurrentUserData().subscribe(userData => {
      this.user = userData
      console.log(userData);
    })

  }
}
