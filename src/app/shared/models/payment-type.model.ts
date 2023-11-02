export class PaymentType{
    id: string;
    name: string;
    partialPayment: boolean;
    amount: number;
    constructor(id: string, name: string, partialPayment: boolean, amount: number){
        this.id = id;
        this.name = name;
        this.partialPayment = partialPayment;
        this.amount = amount;
    }
}