import { Router } from "@angular/router";

import {Port} from "../../../apirest.js";
export class Global {
    
    public url:string = (Port==3000) ? "http://localhost:3000" : window.location.href;
    
    
    constructor() {
        
        console.log("hola");
     }
}