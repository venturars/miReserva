import { Router } from "@angular/router";

import PORT from "apirest.js";
export class Global {
    
    
    public url:string = window.location.href;
    
    constructor() {
            
        // console.log(Port);
        console.log(PORT);
     }
}