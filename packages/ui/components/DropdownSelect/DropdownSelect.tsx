import { clsx } from "clsx";

type Props = {
  className?: string;
  options: string[];
  defaultOption: string;
};
const DropdownSelect = (props: Props) => {
  const { className, options, defaultOption } = props;

  return (
    <div>
      <select
        className={clsx(
          "block w-full rounded-md border-slate-700 py-1.5 focus:border-teal-500" +
            " cursor-pointer bg-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-teal-500 sm:text-sm",
          className
        )}
        defaultValue={defaultOption}
      >
        {options.map((option, i) => (
          <option key={`${option}-${i}`}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;
