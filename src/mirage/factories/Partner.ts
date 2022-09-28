import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';
import { PartnerExtended } from "src/models/PartnerExtended.model"

export const partnerFactory = Factory.extend<Partial<PartnerExtended>>({
  name(){ return faker.name.firstName(); },
  surname(){ return faker.name.lastName(); },
  street() { return faker.address.street(); },
  webSite() { return faker.internet.url(); },
  vat() { return faker.datatype.string(8); },
  fiscalcode() { return faker.datatype.string(16); },
  mobile(){ return faker.phone.number(); },
  email(){ return faker.internet.email(); },
  photo(){ return faker.image.avatar(); }
});