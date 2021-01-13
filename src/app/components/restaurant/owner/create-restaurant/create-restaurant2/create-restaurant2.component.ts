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

  public table:Tables;
  
  constructor(
    public servicetable:ServiceTablesService,
    public serviceRestaurant:ServiceRestaurantService
  ) {
    this.table = new Tables (null,null,null,null,null);
  }
  @ViewChild('myInputFile') myInputField: ElementRef;
  ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }
  public onSubmit(tableForm:any) {
    const newTable = new Tables(
      null,
      tableForm.value.table_name,
      tableForm.value.table_max,
      tableForm.value.table_min,
      this.serviceRestaurant.id_restaurant
    ); 
    this.servicetable.postTables(newTable)
    .subscribe((data:any) => {
      newTable.table_id=data.data.table_id;
      this.servicetable.table.push(newTable);
    });
    this.table.table_name="";
    this.table.table_min=null;
    this.table.table_max=null;
    this.myInputField.nativeElement.focus();
  }
  eliminar(i:number, table:Tables) {
    this.servicetable.table.splice(i,1);
    this.servicetable.deleteTables(table.table_id).subscribe();
  }
  ngOnInit(): void {
}}