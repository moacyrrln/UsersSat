// E:\dev\SAT\users_front_end\src\app\shared\common.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  formatCpf(cpf: any): string {
    const cleanCpf = String(cpf).replace(/\D/g, '').padStart(11, '0');
    const formattedCpf = cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    console.log(formattedCpf);
    return formattedCpf;
  }

  formatPhone(phone: any): string {
    const cleanPhone = String(phone).replace(/\D/g, '');
    let formattedPhone = cleanPhone;
    if (cleanPhone.length === 10 || cleanPhone.length === 11) {
      formattedPhone = cleanPhone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    console.log(formattedPhone);
    return formattedPhone;
  }

  isValidCpf(cpf: string): boolean {
    const cleanCpf = cpf.replace(/[^\d]+/g, '');
    if(cleanCpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
    return this.isCpfValid(cleanCpf);
  }

  isCpfValid(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  isValidPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10 && cleanPhone.length !== 11) return false;
    const ddd = cleanPhone.substring(0, 2);
    const isValidDDD = parseInt(ddd) >= 10 && parseInt(ddd) <= 99;
    return isValidDDD;
  }
}
