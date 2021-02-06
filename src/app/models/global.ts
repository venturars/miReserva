import { Router } from "@angular/router";

// import {PORT} from "apirest.js";
export class Global {
    
    
    public url:string = window.location.href;
    
    constructor() {
            this.newMethod();
        // console.log(Port);
        // console.log(PORT);
     }

    private newMethod() {
        console.log(process.env.PORT);
    }
}