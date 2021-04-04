import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.component.html',
  styleUrls: ['./definicoes.component.css']
})
export class DefinicoesComponent implements OnInit {

  public name;
  private pwAtual;
  private pwNova;
  private pwConfirmarNova;

  constructor() { 
    this.name = "Pedro Ferreira";
    this.pwAtual = "";
    this.pwNova = "";
    this.pwConfirmarNova = "";
  }

  //INIT
  ngOnInit(): void {
  }

  //Verifica se a password atual está correta
  pwAtualInsert(pwAtual : string): void {
    this.pwAtual = pwAtual;
  }

  //Inserir a password nova
  pwNovaInsert(pwNova : string): void {
    this.pwNova = pwNova;
  }

  //Verifica se a password nova confirmada é igual à usada
  pwNovaConfirmarInsert(pwNovaConfirmar : string): void {
    if(this.pwNova === pwNovaConfirmar){
        this.pwConfirmarNova = pwNovaConfirmar;
    }
  }

  guardarAlteracoes(): void {
    
  }

  eliminarConta(): void {}



}
