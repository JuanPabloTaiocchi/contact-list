import { AnyResponse, Registry } from "miragejs/-types";
import { HandlerOptions, RouteHandler } from "miragejs/server";
import { AppRegistry } from "src/mirage/models/AppRegistry.model";
import { Route } from "../../models/Route.model";

export interface RouteMirage extends Route{
  callback?: RouteHandler<AppRegistry, Response | object> | undefined
};