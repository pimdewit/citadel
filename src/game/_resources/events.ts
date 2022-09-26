import {EventDispatcher} from '@pdw.io/event-dispatcher';

export enum ResourceEventName {
  DOWNLOADED = 0,
}

class ResourceEventDispatcher extends EventDispatcher<ResourceEventName> {
  dispatch(name: ResourceEventName, message: any) {
    this.dispatchEvent(name, message);
  }
}

/** @TODO: clean this up, remove globals. */
export const resourceEventDispatcher = new ResourceEventDispatcher();
