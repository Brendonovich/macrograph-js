import { DataItem, t } from "@mg/core";
import { observer } from "mobx-react-lite";
import { BooleanInput } from "ui/inputs";

interface Props {
  data: DataItem<t.Boolean>;
}
const BooleanEditor = observer(({ data }: Props) => {
  return (
    <div className="w-full flex flex-row space-x-4 items-center">
      <span className="text-xl font-semibold">{data.name}</span>
      <BooleanInput
        className=""
        value={data.value}
        onChange={(v) => (data.value = v)}
      />
    </div>
  );
});

export default BooleanEditor;
