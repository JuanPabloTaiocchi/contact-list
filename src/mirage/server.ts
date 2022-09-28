import { createServer, Model, Registry, RestSerializer, Server } from 'miragejs';
import { RouteMirage } from 'src/mirage/models/RouteMirage.model';
import { partnerFactory } from './factories/Partner';
import { getPartnerRoutes } from './routes/Partner';
import { partnerSeed } from './seeds/Partner';

// All endpoints
const allRoutes = [...getPartnerRoutes()];
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
      this.namespace = 'api';
      // (2)
      allRoutes.map(
        (route: RouteMirage) => this[route.method](route.path, route.callback)
      );
    },
  })
}

