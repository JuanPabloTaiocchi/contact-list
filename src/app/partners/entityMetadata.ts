import { EntityMetadataMap } from "@ngrx/data";

export const entityMetadata: EntityMetadataMap = {
  Partner: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  }
};