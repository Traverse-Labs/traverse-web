import { Switch } from "@headlessui/react";
import { clsx } from "clsx";
import { useState } from "react";

type Props = {
  onChange: (status: boolean) => void;
  defaultStatus?: boolean;
};
const Toggle = (props: Props) => {
  const { onChange, defaultStatus = false } = props;
  const [enabled, setEnabled] = useState(defaultStatus);

  const handleChange = (status: boolean) => {
    setEnabled(status);
    onChange(status);
  };

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={clsx(
          enabled ? "bg-teal-600" : "bg-slate-600",
          "h-4.5 relative inline-flex w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? "translate-x-3.5" : "translate-x-0",
            "pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

export default Toggle;
