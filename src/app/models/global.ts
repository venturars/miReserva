import { Router } from "@angular/router";

export class Global {
    
    // public url:string = "http://localhost:3000";
    
    public url;
    constructor() {
        this.url=window.location.href;
     }
}