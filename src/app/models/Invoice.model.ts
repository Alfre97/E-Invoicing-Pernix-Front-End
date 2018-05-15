import { UserEmitterReceiver } from "./UserEmitterReceiver.model";
import { Service } from "./Service.model";

export class Invoice {
  public dateCreated: String;
  public sellTerm: String;
  public paymentLapse: String;
  public paymentMethod: String[];
  public selectedCurrency: String;
  public exchangeRate: String;
  public recordedServices: String;
  public exemptServices: String;
  public recordedCommodity: String;
  public exemptCommodity: String;
  public recordedTotal: String;
  public exemptTotal: String;
  public totalSell: String;
  public totalDiscount: String;
  public netSell: String;
  public totalTax: String;
  public totalVoucher: String;
  public resolutionNumber: String;
  public resolutionDate: String;
  public otherText: String;
  public emitter: UserEmitterReceiver;
  public receiver: UserEmitterReceiver;
  public service: Service[];

  constructor() { }
}
