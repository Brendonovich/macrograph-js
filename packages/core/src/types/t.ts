import * as z from "zod";

export type TypeNames = "int" | "float" | "string" | "boolean" | "array";

abstract class MGBaseType<T extends z.ZodTypeAny> {
  abstract type: T;
  abstract name: TypeNames;
}

export class Int extends MGBaseType<z.ZodNumber> {
  name = "int" as const;
  type = z.number().int();

  static create() {
    return new Int();
  }
}

export class Float extends MGBaseType<z.ZodNumber> {
  name = "float" as const;
  type = z.number();

  static create() {
    return new Float();
  }
}

export class String extends MGBaseType<z.ZodString> {
  name = "string" as const;
  type = z.string();

  static create() {
    return new String();
  }
}

export class Boolean extends MGBaseType<z.ZodBoolean> {
  name = "boolean" as const;
  type = z.boolean();

  static create() {
    return new Boolean();
  }
}

export class Array<T extends Type> extends MGBaseType<z.ZodArray<any>> {
  name = "array" as const;
  // @ts-expect-error
  type = z.array(z.any()) as z.ZodArray<T["type"]>;
  _unique = false;

  constructor(public subType: MGBaseType<T["type"]>) {
    super();
  }

  static create<T extends Type>(type: T): Array<T> {
    return new this(type);
  }

  unique() {
    this._unique = true;
    return this;
  }
}

export type TypeOf<T extends MGBaseType<z.ZodTypeAny>> = z.TypeOf<T["type"]>;

export type Type = Int | Float | String | Boolean | Array<Type>;

export const int = () => Int.create();
export const float = () => Float.create();
export const string = () => String.create();
export const boolean = () => Boolean.create();
export const array = <T extends Type>(type: T) => Array.create(type);

export const typesCompatible = (a: Type, b: Type): boolean => {
  switch (a.name) {
    case "array":
      // @ts-expect-error
      return b.name === "array" && typesCompatible(a.subType, b.subType);
    default:
      return a.name === b.name;
  }
};
