import { Registry, Model } from "miragejs";
import { MiragePartner } from "./Partner";

export type AppRegistry = Registry<{
  partner: typeof MiragePartner;
}, {}>;