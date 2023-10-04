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
  // updatedUser!: User;
  constructor(private userSrv: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.userSrv.getCurrentUserData().subscribe(userData => {
      this.user = userData
      console.log(userData);
    })
  }
  updateUser(userId: string) {
    const updateUser: User = {
      username: this.user!.username,
      name : this.user!.name,
      surname: this.user!.surname,
      email: this.user!.email
    }
    console.log(updateUser);

    this.userSrv.updateUserData(userId, updateUser).subscribe((updatedUserDataResponse: User) => {
      this.userSrv.getUserData(userId).subscribe((user: User) => {
        this.user = user;
      })
      console.log("User updated", updatedUserDataResponse);
    },
    (error) => {
      console.error("Errore durante l'aggiornamento dell'utente", error);
    }
    );
  }

}
