/**
 * List of all Partner API routes.
 * This is used to generate the miragejs routes too. See {@link mirage/routes/Partner} for further explanations.
 */

import { Route } from "./models/Route.model";


export const apiPartnerRoutes: Route[] = [
  { method: 'get', path: '/partners' },
  { method: 'get', path: '/partner/:id' },
  { method: 'post', path: '/partner' },
  { method: 'patch', path: '/partners/:id' },
  { method: 'del', path: '/partner/:id' },
  { method: 'put', path: '/partner/:id'}
]