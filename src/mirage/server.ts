import { createServer, Model, RestSerializer, Server } from 'miragejs';
import { apiPartnerRoutes } from 'src/api-routes';
import { getApiNamespace } from 'src/app/utils/http';
import { RouteMirage } from 'src/mirage/models/RouteMirage.model';
import { partnerFactory } from './factories/Partner';
import { partnerSeed } from './seeds/Partner';

// All endpoints
const allRoutes = apiPartnerRoutes;
// All models
const allModels = { partner: Model };
// All factories
const allFactories = { partner: partnerFactory };
const allSeeds = (server: Server) => partnerSeed(server);

export function makeServer({ environment = "test" } = {}) {
  return createServer({
    environment,
    models: allModels,
    factories: allFactories,
    seeds(server: Server){ allSeeds(server); },

    /**
     * Declare all endpoints here.
     * (1) Set the base namespace used for all routes defined
     * (2) They are generated dinamically
     * @see {@link https://miragejs.com/docs/main-concepts/route-handlers/}
     */
    routes() {
      // (1)
      this.namespace = getApiNamespace();
      // (2)
      allRoutes.map(
        (route: RouteMirage) => this[route.method](route.path, route.callback)
      );
    },
    serializers: {
      application: RestSerializer
    }
  })
}

