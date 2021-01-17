export class Reservations {
    public service:string
    public restaurantName:string
    public changedDayName:string
    public changedMonth:string
    constructor(
        public reservation_id:number,
        public customer_id:number,
        public restaurant_id:number,
        public table_id:number,
        public pax:number,
        public day_name:string,
        public day:string,
        public month:string,
        public year:string,
        public hour:string,
        public shift_id:number,
        public comments:string,
        public status:string,
        public customer_name:string,
        public customer_phone:number
    ){}
}