import { Router } from "@angular/router";
import {puerto} from "apirest.js";
// import {PORT} from "apirest.js";
export class Global {
    
    
    public url:string = window.location.href;
    
    constructor() {
        console.log(puerto);
           // console.log(Port);
        // console.log(PORT);
     }

   
}