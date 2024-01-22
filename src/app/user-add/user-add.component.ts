// E:\dev\SAT\users_front_end\src\app\user-add\user-add.component.ts
import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core'; 
import { DataService } from '../data.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  user = { name: 'José da Silva', email: 'example@example.com', cpf: '161.454.450-68', phone: '(41) 90000-0000' };

  @Output() userAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private dataService: DataService, public commonService: CommonService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      if (changes['user'].currentValue.phone) {
        this.user.phone = this.commonService.formatPhone(changes['user'].currentValue.phone);
      }
      if (changes['user'].currentValue.cpf) {
        this.user.cpf = this.commonService.formatCpf(changes['user'].currentValue.cpf);
      }
    }
  }

  isValidField(field: keyof typeof this.user): boolean {
    switch(field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);
      case 'cpf':
        return this.commonService.isValidCpf(this.user.cpf);
      case 'phone':
        return this.commonService.isValidPhone(this.user.phone);
      default:
        return this.user[field].trim() !== '';
    }
  }

  saveUser() {
    if (!this.isValidField('name') || !this.isValidField('email') || !this.isValidField('cpf') || !this.isValidField('phone')) {
      alert('Por favor, corrija os campos inválidos antes de salvar.');
      return;
    }
    
    const userToSave = {
      ...this.user,
      cpf: parseInt(this.user.cpf.replace(/\D/g, '')),
      phone: parseInt(this.user.phone.replace(/\D/g, ''))
    };

    const confirmation = confirm('Tem certeza que deseja salvar este usuário?');
    if (confirmation) {
      this.dataService.addUser(userToSave).subscribe(() => {
        this.userAdded.emit();
      });
    }
  }

  cancelAction() {
    const confirmation = confirm('Tem certeza que deseja cancelar a adição deste usuário?');
    if (confirmation) {
      this.cancel.emit();
    }
  }

}



