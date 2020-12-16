import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tables } from 'src/app/models/tables';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant2',
  templateUrl: './create-restaurant2.component.html',
  styleUrls: ['./create-restaurant2.component.scss']
})
export class CreateRestaurant2Component implements OnInit {
  public tables:Tables[];
  public table:Tables;
  
  constructor() {
    this.tables=[(new Tables ("Salon","4")),(new Tables ("UNO","3"))];
    this.table=new Tables (null,null);
   }

   @ViewChild('prueba') myInputField: ElementRef;
ngAfterViewInit() {
this.myInputField.nativeElement.focus();
}

   onSubmit(tableForm){
    const nuevamesa= new Tables (tableForm.value.name,tableForm.value.pax); 
    this.tables.push(nuevamesa);
    this.table.name="";
    this.table.pax="";
    this.myInputField.nativeElement.focus();
   }


   eliminar(i){
     this.tables.splice(i,1);
   }
  ngOnInit(): void {
    console.log(this.tables);
  }

}
