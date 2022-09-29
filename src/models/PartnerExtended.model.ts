import { Partner } from "./Partner.model";

export interface PartnerExtended extends Partner {
  street: string;
  zip: string;
  city: string;
  country: string;
  webSite: string;
  vat: string;
  fiscalCode: string;
  mobile: string;
  email: string;
  photo: string;
  [index: string]: any;
}