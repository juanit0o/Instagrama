import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.component.html',
  styleUrls: ['./definicoes.component.css']
})
export class DefinicoesComponent implements OnInit {

  public name;

  constructor() { 
    this.name = "Pedro Ferreira";
  }

  ngOnInit(): void {
  }

  perfilUser(): void {
    
  }

  pwAtualInsert(pwAtual : string): void {
    
  }

  pwNovaInsert(pwNova : string): void {
    
  }

  pwNovaConfirmarInsert(pwNovaConfirmar : string): void {
    
  }

  guardarAlteracoes(): void {
    
  }

  eliminarConta(): void {}



}
