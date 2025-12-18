import type { SaleLocation } from "./SaleLocation";

export interface TemplateScheduleSendDto {
  id: number;
  operationareaid: number;
  name: string;
  locationname: string,
  locationid: number,
  dayofweek: number,
  starttime: string;
  endtime: string;
  
location : SaleLocation 
}