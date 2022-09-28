import { createServer, Model, RestSerializer } from 'miragejs';
import { RouteMirage } from 'src/mirage/models/RouteMirage.model';
import { getPartnerRoutes } from './routes/Partner';

// All endpoints
const allRoutes = [...getPartnerRoutes()];
// All models
const allModels = { partner: Model }

export function makeServer({ environment = "test" } = {}) {
  return createServer({
    environment,
    models: allModels,

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

