import { Router } from "@angular/router";

// import {PORT} from "apirest.js";
export class Global {
    
    
    public url:string = window.location.href;
    
    constructor() {
            console.log(process.env.Port);
        // console.log(Port);
        // console.log(PORT);
     }
}