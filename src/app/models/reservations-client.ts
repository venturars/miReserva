export class ReservationsClient {
    constructor(public id_reservation:number,
        public date:number,
        public time:number,
        public obs:string,
        public pax:number,
        public id_restaurant:number){}
}
