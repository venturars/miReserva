export class Restaurants {
    constructor(
        public restaurant_id:number,
        public name:string,
        public province:string,
        public city:string,
        public street_name:string,
        public street_number:string,
        public postal_code:number,
        public phone:number,
        public capacity:number,
        public food_type:string,
        public header:string,
        public logo:string,
        public menu:string,
        public url:string,
        public latitude:number,
        public longitude:number,
        public owner_id:number 
        ){}
}