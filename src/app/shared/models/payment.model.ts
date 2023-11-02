export class Payment {
    public id: string;
    public client: string;
    public paymentType: string;
    public date: Date;
    public amount: number;
    public userId: string;
    
    constructor(id: string, client: string, paymentType: string, date: Date, amount: number, userId: string){
        this.id = id;
        this.client = client;
        this.paymentType = paymentType;
        this.date = date;
        this.amount = amount;
        this.userId = userId;
    }
  }