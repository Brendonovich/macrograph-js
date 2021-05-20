abstract class BaseType<T> {
  abstract name: string;
  readonly __valueType!: T;

  abstract defaultValue(): T;
}

class IntType extends BaseType<number> {
  name = "int";
  defaultValue() {
    return 0;
  }
}
class FloatType extends BaseType<number> {
  name = "float";
  defaultValue() {
    return 0;
  }
}
class StringType extends BaseType<string> {
  name = "string";
  defaultValue() {
    return "";
  }
}
class BooleanType extends BaseType<boolean> {
  name = "boolean";
  defaultValue() {
    return true;
  }
}
class ArrayType<T extends PinType> extends BaseType<TypeOf<T>[]> {
  name = "array";
  defaultValue() {
    return [] as TypeOf<T>[];
  }

  constructor(public subtype: T) {
    super();
  }
}

export type PinType =
  | IntType
  | FloatType
  | StringType
  | BooleanType
  | ArrayType<any>;

export type TypeOf<T extends PinType> = T["__valueType"];

export const types = {
  int() {
    return new IntType();
  },
  float() {
    return new FloatType();
  },
  string() {
    return new StringType();
  },
  boolean() {
    return new BooleanType();
  },
  array<T extends PinType>(t: T) {
    return new ArrayType(t);
  },
} as const;

export const typesCompatible = (a: PinType, b: PinType): boolean => {
  switch (a.name) {
    case "int":
      return b.name === "int";
    case "float":
      return b.name === "float";
    case "string":
      return b.name === "string";
    case "boolean":
      return b.name === "boolean";
    case "array":
      return (
        b.name === "array" &&
        typesCompatible(
          (a as ArrayType<any>).subtype,
          (b as ArrayType<any>).subtype
        )
      );
    default:
      throw new Error(`Unknown type ${a.name}`);
  }
};