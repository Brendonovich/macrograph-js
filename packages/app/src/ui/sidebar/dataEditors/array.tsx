import { DataItem, t } from "@mg/core";
import { observer } from "mobx-react-lite";
import { BooleanInput, FloatInput, IntInput, StringInput } from "ui/inputs";
import { TrashIcon } from "@heroicons/react/outline";

const primitiveEditorMap: { [T in t.TypeNames]?: any } = {
  int: IntInput,
  float: FloatInput,
  string: StringInput,
  boolean: BooleanInput,
};

interface Props<T extends t.Array<any>> {
  data: DataItem<T>;
}
const ArrayEditor = observer(<T extends t.Array<any>>({ data }: Props<T>) => {
  const Input = primitiveEditorMap[data.type.subType.name];

  const array: any[] = data.value;

  return (
    <div className="w-full flex flex-col space-y-2">
      <span className="text-xl font-semibold">{data.name}</span>
      {array.map((v, i: number) => (
        <div
          className="flex pl-2 flex-row w-full items-center space-x-2"
          key={`${i}`}
        >
          <span className="flex-1">{i}</span>
          <Input
            style={{ flex: 2 }}
            className="text-black col-span-2 px-2 py-1 rounded-md bg-gray-200"
            value={v}
            onChange={(newValue: any) => {
              if (data.type._unique && array.includes(newValue)) return;

              array[i] = newValue;
            }}
          />
          <button onClick={() => array.splice(i, 1)}>
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      ))}
    </div>
  );
});

export default ArrayEditor;
