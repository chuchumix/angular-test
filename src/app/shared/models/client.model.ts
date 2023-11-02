import { PaymentType } from "./payment-type.model";

export class Client {
    id: string;
    name: string;
    age: number;
    nit: string;
    paymentTypes: string[];

    constructor(id: string, name: string, age: number, nit: string, paymentTypes: string[]){
        this.id = id;
        this.name = name;
        this.age = age;
        this.nit = nit;
        this.paymentTypes = paymentTypes;
    }
}