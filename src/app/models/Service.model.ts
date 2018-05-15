import { Tax } from './Tax.model';
import { Code } from './Code.model';

export class Service {
  public id: Number;
  public lineNumber: String;
  public codeList: Code[];
  public amount: Number;
  public unitOfMeasurementType: String;
  public unitOfMeasurementName: String;
  public comercialUnitOfMeasurement: String;
  public detail: String;
  public priceByUnit: Number;
  public totalAmount: Number;
  public discount: Number;
  public discountNature: String;
  public subtotal: Number;
  public taxList: Tax[];
  public total: Number;

  constructor() { }
}
