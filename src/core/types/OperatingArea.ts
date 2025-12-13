
import type { TemplateSchedule } from "./TemplateSchedule";
import type { SaleLocation } from "./SaleLocation";

 export interface OperatingArea {
  id: number;
  name: string;
  //locationids : number[];
  locations : SaleLocation[];
  templateSchedules : TemplateSchedule[];
}

 