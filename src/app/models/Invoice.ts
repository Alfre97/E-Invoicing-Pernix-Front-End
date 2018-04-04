export class Invoice{
    key:String
    consecutiveNumber: String
    dateCreated: String
    sellTerm: String
    paymentLapse:String
    paymentMethod: String
    selectedCurrency: String
    exchangeRate: String
    recordedServices: String
    exemptServices: String
    recordedCommodity: String
    exemptCommodity: String
    recordedTotal:String
    exemptTotal:String
    totalSell:String
    totalDiscount:String
    netSell:String
    totalTax:String
    totalVoucher:String
    resolutionNumber:String
    resolutionDate:String
    otherText:String
    idEmitter: Number;
    idReceiver:Number;
    idService:Number;

    constructor(){}
}
