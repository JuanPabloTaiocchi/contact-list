import { apiPartnerRoutes } from "src/api-routes";
import { RouteMirage } from "src/mirage/models/RouteMirage.model";

/**
 * Get all partners routes.
 * The purpose of this function is add optionally callback function if needed (in this case it must be edited).
 */
export const getPartnerRoutes = (): RouteMirage[] => [
  ...apiPartnerRoutes
];
