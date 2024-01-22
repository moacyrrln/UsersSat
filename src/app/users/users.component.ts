// E:\dev\SAT\users_front_end\src\app\users\users.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  addingUser: boolean = false;
  updatingUser: boolean = false;
  selectedUser: any;

  constructor(private dataService: DataService, public commonService:  CommonService) { }
  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.sendGetRequest().subscribe((data: any) => {
      this.users = data;
    });
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

  addUser() {
    this.addingUser = true;
  }

  userAdded() {
    this.addingUser = false;
    this.loadUsers();
  }

  updateUser(user: any) {
    this.selectedUser = {...user};
    this.updatingUser = true;
  }

  userUpdated() {
    this.updatingUser = false;
    this.loadUsers();
  }

  confirmAndDeleteUser(id: number) {
    const confirmation = confirm('Tem certeza que deseja excluir este usuário?');
    if (confirmation) {
      this.dataService.deleteUser(id).subscribe(() => {
        this.loadUsers(); // Recarrega a lista após a exclusão
      });
    }
  }

}



