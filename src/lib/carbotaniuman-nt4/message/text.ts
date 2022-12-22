import { ValueId } from './binary';

export const enum MessageType {
  PublishRequest = 'publish',
  PublishRelease = 'pubrel',
  SetFlags = 'setflags',
  Announce = 'announce',
  Unannounce = 'unannounce',
  GetValues = 'getvalues',
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
}

export type TextMessage =
  | PublishRequest
  | PublishRelease
  | SetFlags
  | Announce
  | Unannounce
  | GetValues
  | Subscribe
  | Unsubscribe;

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

export interface SetFlags {
  method: MessageType.SetFlags;
  params: {
    name: string;
    add: string[];
    remove: string[];
  };
}

export interface SetFlags {
  method: MessageType.SetFlags;
  params: {
    name: string;
    add: string[];
    remove: string[];
  };
}

export interface Announce {
  method: MessageType.Announce;
  params: {
    name: string;
    id: number;
    type: ValueId;
    flags: string[];
  };
}

export interface Unannounce {
  method: MessageType.Unannounce;
  params: {
    name: string;
    id: number;
  };
}

export interface GetValues {
  method: MessageType.GetValues;
  params: {
    ids: number[];
  };
}

export interface Subscribe {
  method: MessageType.Subscribe;
  params: {
    prefixes: string[];
    subuid: number;
    options: {
      immediate: boolean;
      periodic: number;
      logging: boolean;
    };
  };
}

export interface Unsubscribe {
  method: MessageType.Unsubscribe;
  params: {
    subuid: number;
  };
}