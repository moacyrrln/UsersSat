import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  clearedScreen: boolean = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.dataService.sendGetRequest().subscribe((data: any) => {
      this.users = data;
    });
  }

  deleteUser(user: any) {
    this.dataService.deleteUser(user.id).subscribe(
      () => {
        const index = this.users.indexOf(user);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      },
      (error) => {
        console.error('Erro ao excluir o usuário', error);
      }
    );
  }

  clearScreen() {
    this.clearedScreen = true;
  }

  resetScreen() {
    this.clearedScreen = false;
    this.fetchUsers();
  }
}