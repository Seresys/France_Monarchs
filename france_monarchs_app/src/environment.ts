import { Environment, RecordSource, Store } from "relay-runtime";
import {
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern/es";

const network = new RelayNetworkLayer([
  urlMiddleware({
    url: (req) => Promise.resolve("http://localhost:4000/graphql"),
  }),
]);

const source = new RecordSource();
const store = new Store(source);
export const environment = new Environment({ network, store });
