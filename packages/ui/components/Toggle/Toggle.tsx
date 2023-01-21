import { Switch } from "@headlessui/react";
import { clsx } from "clsx";
import { useState } from "react";

type Props = {
  onChange: (status: boolean) => void;
};
const Toggle = (props: Props) => {
  const { onChange } = props;
  const [enabled, setEnabled] = useState(false);

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
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

export default Toggle;
