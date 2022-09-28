import { Partner } from "./Partner.model";

export interface PartnerExtended extends Partner {
  street: string;
  webSite: string;
  vat: string;
  fiscalcode: string;
  mobile: string;
  email: string;
  photo: string;
  [index: string]: any;
}