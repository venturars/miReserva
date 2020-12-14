export class ReservationsRestaurants {
    constructor(public id_reservation:number,
        public name:string,
        public time:number,
        public obs:string,
        public pax:number,
        public table:number,
        public status:string,
        public id_restaurant:number){}

}
