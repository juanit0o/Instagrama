import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-description',
  templateUrl: './confirm-description.component.html',
  styleUrls: ['./confirm-description.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class ConfirmDescriptionComponent implements OnInit {

  currentPhotoname: string;
  confirmMessage: string;
  isConfirmed: boolean;
  clickObservable: Observable<Event> = fromEvent(document.getElementsByClassName("button confirm"),'click');

  constructor() {
    this.currentPhotoname = "";
    this.confirmMessage = "Tens a certeza que não queres adicionar uma descrição à foto: ";
    this.isConfirmed = true;
   }

  ngOnInit(): void {
  }

  changeCurrentDescriptionName(newName : string) : void {
    this.currentPhotoname = newName;
    console.log(this.currentPhotoname);

    document.getElementById("nomeFoto")!.innerText = this.confirmMessage + newName + "?";
  }

  confirm() : void {
    this.isConfirmed = true;
  }

  cancel() : void {
    this.isConfirmed = false;
  }

  getConfirmation() : Observable<Event> {
    return this.clickObservable;
  }

  checkConfirmation() : boolean {
    return this.isConfirmed;
  }
} 

