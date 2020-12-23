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
    this.tables=[(new Tables (1,"1",6,4,1)),(new Tables (1,"2",6,4,1))];
    this.table=new Tables (null,null,null,null,null);
   }

   @ViewChild('prueba') myInputField: ElementRef;
ngAfterViewInit() {
this.myInputField.nativeElement.focus();
}

   onSubmit(tableForm){
     console.log(tableForm.value)
    const nuevamesa= new Tables (null,tableForm.value.table_name,tableForm.value.table_max, tableForm.value.table_min,null); 
    this.tables.push(nuevamesa);
    this.table.table_name="";
    this.table.table_min=null;
    this.table.table_max=null;
    this.myInputField.nativeElement.focus();
   }


   eliminar(i){
     this.tables.splice(i,1);
   }
  ngOnInit(): void {
    console.log(this.tables);
  }

}
