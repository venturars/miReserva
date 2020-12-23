export class Shifts {
    constructor(public shift_id:number,
                public day:string,
                public shift_from:string,
                public shift_to:string,
                public restaurant_id:number,
                public times_id:number,
                public pax:number
    ){}
    
}
