import { faker } from '@faker-js/faker';
import { Server } from 'miragejs';


export const partnerSeed = (server: Server) => {
  const randomArray = Array(faker.datatype.number({min: 30, max: 45}));
  [...randomArray].forEach((e) => server.create('partner'));
};