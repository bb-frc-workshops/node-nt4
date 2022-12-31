import { ValueId } from './binary';

export const enum MessageType {
  PublishRequest = 'publish',
  PublishRelease = 'pubrel',
  SetProperties = 'setproperties',
  AnnouncedProperties = 'properties',
  Announce = 'announce',
  Unannounce = 'unannounce',
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
}

export type TextMessage =
  | PublishRequest
  | PublishRelease
  | SetProperties
  | AnnouncedProperties
  | Announce
  | Unannounce
  | Subscribe
  | Unsubscribe;

export type Properties = {
  persistent: boolean,
  retained: boolean
} | null;

export interface PublishRequest {
  method: MessageType.PublishRequest;
  params: {
    name: string;
    type: ValueId;
  };
}

export interface PublishRelease {
  method: MessageType.PublishRelease;
  params: {
    name: string;
  };
}

// update the properties. a value of null means delete
export interface SetProperties {
  method: MessageType.SetProperties,
  params: {
    name: string;
    update: Map<string, any>
  };
}

export interface AnnouncedProperties {
  method: MessageType.AnnouncedProperties,
  params: {
    name: string,
    ack: boolean
  }
}

export interface Announce {
  method: MessageType.Announce;
  params: {
    name: string;
    id: number;
    type: ValueId;
    pubuid: number;
    properties?: {
      persistent: boolean,
      retained: boolean
    } 
  };
}

export interface Unannounce {
  method: MessageType.Unannounce;
  params: {
    name: string;
    id: number;
  };
}

export interface Subscribe {
  method: MessageType.Subscribe;
  params: {
    topics: string[];
    subuid: number;
    options?: {
      periodic?: number; // Default is every 100 ms
      all?: boolean;
      topicsonly?: boolean;
      prefix?: boolean; // Set true to accept partial matches
    };
  };
}

export interface Unsubscribe {
  method: MessageType.Unsubscribe;
  params: {
    subuid: number;
  };
}