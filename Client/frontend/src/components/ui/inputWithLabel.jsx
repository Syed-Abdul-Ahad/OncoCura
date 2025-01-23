import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithLabel({
  label,
  placeholder,
  style,
  onChange,
  value,
  name,
}) {
  return (
    <div className="grid  w-full  items-center gap-1.5">
      <Label className="text-gray-600 opacity-85" htmlFor={label}>
        {label}
      </Label>
      <Input
        className={`${
          style ? style : "w-[27rem]"
        } h-12 outiline-none border border-gray-400 rounded-md shadow-sm sm:text-sm placeholder:text-gray-400`}
        type="text"
        id={label}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
}
