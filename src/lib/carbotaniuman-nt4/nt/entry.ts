import { ValueOf } from 'ts-essentials';

import { Value, ValueId } from '../message/binary';
import { Properties } from '../message/text';

import {
  NetworkTableClient,
  SettableValue,
  SettableValueId,
  SettableValueType,
} from './client';

export class Entry {
  private connection: NetworkTableClient;
  path: string;
  properties: Properties;

  constructor(connection: NetworkTableClient, path: string) {
    this.connection = connection;
    this.path = path;
    this.properties = null;
  }

  setValue<T extends SettableValueId>(
    type: T,
    value: ValueOf<Pick<Extract<Value, { type: T }>, 'value'>>
  ): boolean;
  setValue(type: SettableValueId, value: SettableValueType): boolean {
    return this.connection.setValue(this.path, {
      type,
      value,
    } as SettableValue);
  }

  getValue<T extends SettableValueId>(
    type: T,
    defaultValue: ValueOf<Pick<Extract<Value, { type: T }>, 'value'>>
  ): ValueOf<Pick<Extract<Value, { type: T }>, 'value'>>;
  getValue(type: SettableValueId, defaultValue: SettableValueType): SettableValueType {
    return this.connection.getValue(this.path, {
      type,
      value: defaultValue,
    } as SettableValue).value;
  }

  setInteger(value: number): boolean {
    return this.setValue(ValueId.Integer, value);
  }

  setFloat(value: number): boolean {
    return this.setValue(ValueId.Float, value);
  }

  setDouble(value: number): boolean {
    return this.setValue(ValueId.Double, value);
  }

  setBoolean(value: boolean): boolean {
    return this.setValue(ValueId.Boolean, value);
  }

  setRaw(value: Uint8Array): boolean {
    return this.setValue(ValueId.Raw, value);
  }

  setString(value: string): boolean {
    return this.setValue(ValueId.String, value);
  }

  setBooleanArray(value: boolean[]): boolean {
    return this.setValue(ValueId.BooleanArray, value);
  }

  setIntegerArray(value: number[]): boolean {
    return this.setValue(ValueId.IntegerArray, value);
  }

  setFloatArray(value: number[]): boolean {
    return this.setValue(ValueId.FloatArray, value);
  }

  setDoubleArray(value: number[]): boolean {
    return this.setValue(ValueId.DoubleArray, value);
  }

  setStringArray(value: string[]): boolean {
    return this.setValue(ValueId.StringArray, value);
  }

  getInteger(value: number): number {
    return this.getValue(ValueId.Integer, value);
  }

  getFloat(defaultValue: number): number {
    return this.getValue(ValueId.Float, defaultValue);
  }

  getDouble(defaultValue: number): number {
    return this.getValue(ValueId.Double, defaultValue);
  }

  getBoolean(defaultValue: boolean): boolean {
    return this.getValue(ValueId.Boolean, defaultValue);
  }

  getRaw(defaultValue: Uint8Array): Uint8Array {
    return this.getValue(ValueId.Raw, defaultValue);
  }

  getString(defaultValue: string): string {
    return this.getValue(ValueId.String, defaultValue);
  }

  getBooleanArray(defaultValue: boolean[]): boolean[] {
    return this.getValue(ValueId.BooleanArray, defaultValue);
  }

  getIntegerArray(defaultValue: number[]): number[] {
    return this.getValue(ValueId.IntegerArray, defaultValue);
  }

  getFloatArray(defaultValue: number[]): number[] {
    return this.getValue(ValueId.FloatArray, defaultValue);
  }

  getDoubleArray(defaultValue: number[]): number[] {
    return this.getValue(ValueId.DoubleArray, defaultValue);
  }

  getStringArray(defaultValue: string[]): string[] {
    return this.getValue(ValueId.StringArray, defaultValue);
  }

  setProperties(flags: string[]): boolean {
    // TODO: Set Properties
    return false;
  }

  getProperties(): Properties {
    // TODO: Get Properties
    return null;
  }

  subscribe(): boolean {
    return this.connection.subscribe(this.path);
  }

  unsubscribe(): boolean {
    return this.connection.unsubscribe(this.path);
  }

  subscribed(): boolean {
    return this.connection.subscribed(this.path);
  }

  publish(type: ValueId): boolean {
    return this.connection.publish(this.path, type);
  }

  unpublish(): boolean {
    return this.connection.unpublish(this.path);
  }

  publishing(): boolean {
    return this.connection.publishing(this.path);
  }

  // exists(): boolean {
  //   return this.connection.exists(this.path);
  // }

  //TODO: Maybe remove
  connected(): boolean {
    return this.connection.connected;
  }
}