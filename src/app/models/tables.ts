export class Tables {
    public shift_id:number
    constructor(	
            public table_id:number,
            public table_name:string,
            public table_max:number,
            public table_min:number,
            public restaurant_id:number){}
}
