import { UnreachableCaseError, ValueOf } from 'ts-essentials';
import { Encoder } from '@msgpack/msgpack';
import {
  ExtensionCodec,
  ExtensionCodecType
} from '@msgpack/msgpack/src/ExtensionCodec';
import {
  DEFAULT_INITIAL_BUFFER_SIZE,
  DEFAULT_MAX_DEPTH
} from '@msgpack/msgpack/src/Encoder';

export const enum ValueId {
  Integer = 'int',
  Float = 'float',
  Double = 'double',
  Boolean = 'boolean',
  Raw = 'raw',
  Rpc = 'rpc',
  String = 'string',
  BooleanArray = 'boolean[]',
  IntegerArray = 'int[]',
  FloatArray = 'float[]',
  DoubleArray = 'double[]',
  StringArray = 'string[]',
}

export type BinaryMessage = [id: number, timestamp: number, type: ValueBinaryId, value: ValueType]

export const enum ValueBinaryId {
  Integer = 2,
  Float = 3,
  Double = 1,
  Boolean = 0,
  Raw = 5,
  Rpc = 6,
  String = 4,
  BooleanArray = 16,
  IntegerArray = 18,
  FloatArray = 19,
  DoubleArray = 17,
  StringArray = 20,
}


export function binaryId(type: ValueId): ValueBinaryId {
  switch (type) {
    case ValueId.Integer:
      return ValueBinaryId.Integer;
    case ValueId.Float:
      return ValueBinaryId.Float;
    case ValueId.Double:
      return ValueBinaryId.Double;
    case ValueId.Boolean:
      return ValueBinaryId.Boolean;
    case ValueId.Raw:
      return ValueBinaryId.Raw;
    case ValueId.Rpc:
      return ValueBinaryId.Rpc;
    case ValueId.String:
      return ValueBinaryId.String;
    case ValueId.BooleanArray:
      return ValueBinaryId.BooleanArray;
    case ValueId.IntegerArray:
      return ValueBinaryId.IntegerArray;
    case ValueId.FloatArray:
      return ValueBinaryId.FloatArray;
    case ValueId.DoubleArray:
      return ValueBinaryId.DoubleArray;
    case ValueId.StringArray:
      return ValueBinaryId.StringArray;
    default:
      throw new UnreachableCaseError(type);
  }
}

export function stringId(type: ValueBinaryId): ValueId {
  switch (type) {
    case ValueBinaryId.Integer:
      return ValueId.Integer;
    case ValueBinaryId.Float:
      return ValueId.Float;
    case ValueBinaryId.Double:
      return ValueId.Double;
    case ValueBinaryId.Boolean:
      return ValueId.Boolean;
    case ValueBinaryId.Raw:
      return ValueId.Raw;
    case ValueBinaryId.Rpc:
      return ValueId.Rpc;
    case ValueBinaryId.String:
      return ValueId.String;
    case ValueBinaryId.BooleanArray:
      return ValueId.BooleanArray;
    case ValueBinaryId.IntegerArray:
      return ValueId.IntegerArray;
    case ValueBinaryId.FloatArray:
      return ValueId.FloatArray;
    case ValueBinaryId.DoubleArray:
      return ValueId.DoubleArray;
    case ValueBinaryId.StringArray:
      return ValueId.StringArray;
    default:
      throw new UnreachableCaseError(type);
  }
}

export type ValueType = ValueOf<Pick<Value, 'value'>>

export type Value =
  | { type: ValueId.Integer; value: number }
  | { type: ValueId.Float; value: number }
  | { type: ValueId.Double; value: number }
  | { type: ValueId.Boolean; value: boolean }
  | { type: ValueId.Raw; value: Uint8Array }
  | { type: ValueId.Rpc; value: Uint8Array }
  | { type: ValueId.String; value: string }
  | { type: ValueId.BooleanArray; value: boolean[] }
  | { type: ValueId.IntegerArray; value: number[] }
  | { type: ValueId.FloatArray; value: number[] }
  | { type: ValueId.DoubleArray; value: number[] }
  | { type: ValueId.StringArray; value: string[] };

export function defaultValue<T extends ValueId>(
  type: T
): Extract<Value, { type: T }>;
export function defaultValue(type: ValueId): Value {
  switch (type) {
    case ValueId.Integer:
    case ValueId.Float:
    case ValueId.Double:
      return { type, value: 0 };
    case ValueId.Boolean:
      return { type, value: false };
    case ValueId.Raw:
    case ValueId.Rpc:
      return { type, value: Uint8Array.of() };
    case ValueId.String:
      return { type, value: '' };
    case ValueId.BooleanArray:
    case ValueId.IntegerArray:
    case ValueId.FloatArray:
    case ValueId.DoubleArray:
    case ValueId.StringArray:
      return { type, value: [] };
    default:
      throw new UnreachableCaseError(type);
  }
}

const encoder = new Encoder();
const f32Encoder = new Encoder(
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  true,
  undefined,
);