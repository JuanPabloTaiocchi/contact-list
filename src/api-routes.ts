/**
 * List of all Partner API routes.
 * This is used to generate the miragejs routes too. See {@link mirage/routes/Partner} for further explanations.
 */

import Schema from "miragejs/orm/schema";
import { RouteHandler } from "miragejs/server";
import { AppRegistry } from "./mirage/models/AppRegistry.model";
import { RouteMirage } from "./mirage/models/RouteMirage.model";
import { Request } from 'miragejs';

type AppRouteHandler = RouteHandler<AppRegistry, Response | object>;

/**
 * Manage Parters fetch via query (for pagination)
 * // TODO: add search of partner
 * @param schema 
 * @param request 
 * @returns Subset of partners
 */
const getPartnersWithQuery: AppRouteHandler = (schema: Schema<AppRegistry>, request: Request) => {
  const qp = request.queryParams;
  const start = parseInt(qp!.offset);
  const end = start + parseInt(qp!.limit);
  const partners = schema.db.partners.slice(start, end);
  const totalResults = schema.db.partners.length;
  return {
    partners,
    hasMore: end < totalResults,
    totalResults: schema.db.partners.length
  };
}

export const apiPartnerRoutes: RouteMirage[] = [
  { method: 'get', path: '/partners', callback: getPartnersWithQuery },
  { method: 'get', path: '/partner/:id' },
  { method: 'post', path: '/partner' },
  { method: 'patch', path: '/partners/:id' },
  { method: 'del', path: '/partner/:id' },
  { method: 'put', path: '/partner/:id'}
];