import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tables } from 'src/app/models/tables';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { ServiceTablesService } from 'src/app/shared/service-tables.service';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant2',
  templateUrl: './create-restaurant2.component.html',
  styleUrls: ['./create-restaurant2.component.scss']
})
export class CreateRestaurant2Component implements OnInit {
  public tables:Tables[];
  public table:Tables;
  
  constructor(public servicetable:ServiceTablesService,public serviceRestaurant:ServiceRestaurantService) {
    this.tables=[(new Tables (1,"1",6,4,1)),(new Tables (1,"2",6,4,1))];
    this.table=new Tables (null,null,null,null,null);
   }

   @ViewChild('prueba') myInputField: ElementRef;
ngAfterViewInit() {
this.myInputField.nativeElement.focus();
}


   onSubmit(tableForm){
     console.log(tableForm.value);
     
    const nuevamesa= new Tables (null,tableForm.value.table_name,tableForm.value.table_max, tableForm.value.table_min,this.serviceRestaurant.id_restaurant); 
    console.log(nuevamesa);
    this.servicetable.postTables(nuevamesa)
  .subscribe((data:any)=> {console.log(data);
    
    console.log(data.data.table_id);
    nuevamesa.table_id=data.data.table_id;
    console.log(nuevamesa);
    this.servicetable.table.push(nuevamesa);})

  //   this.servicetable.getTables(this.serviceRestaurant.id_restaurant)
  // .subscribe((data)=> {console.log(data)})    
   
    
    this.table.table_name="";
    this.table.table_min=null;
    this.table.table_max=null;
    this.myInputField.nativeElement.focus();
   }


   eliminar(i,table){
    //  this.tables.splice(i,1);
    this.servicetable.table.splice(i,1);
    console.log(" aver si funciona ");
    console.log(table.table_id);
    this.servicetable.deleteTables(table.table_id)
    .subscribe((data)=>{console.log(data)});
   }
  ngOnInit(): void {
    
  }

}
