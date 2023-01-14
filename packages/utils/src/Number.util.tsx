import numeral from "numeral";
import { ReactNode } from "react";

import { Tooltip } from "../../ui/components/Tooltip";

export const formatPercentage = (num: number) => {
  return numeral(num).format(`0.00%`);
};

export const formatNumber = (
  num: number,
  prepend = "",
  subscriptSize?: number
): ReactNode => {
  if (!num) {
    return "-";
  }

  if (num < 0.00001) {
    const roundedNum = num.toFixed(20);

    const firstHalf = "0.0";
    let numZeros = 0;
    let secondHalf = "";
    let index = 2;

    while (index < roundedNum.length) {
      if (roundedNum.charAt(index) === "0") {
        numZeros += 1;
      } else {
        break;
      }

      index++;
    }

    while (index < roundedNum.length) {
      if (secondHalf.length === 4) {
        break;
      }

      secondHalf += roundedNum.charAt(index);
      index++;
    }

    return (
      <span>
        <Tooltip
          content={`$0.${Array(numZeros).fill(0).join("")}${secondHalf}`}
        >
          <>
            {prepend}
            {firstHalf}
            <sub
              className="relative -bottom-[6px]"
              style={{ fontSize: subscriptSize || "8px" }}
            >
              {numZeros}
            </sub>
            {secondHalf}
          </>
        </Tooltip>
      </span>
    );
  }

  if (num >= 1) {
    return (
      <span>
        {prepend}
        {numeral(num).format("0,0.00")}
      </span>
    );
  }

  if (num < 1) {
    return (
      <span>
        {prepend}
        {roundToSignificant(num, 4)}
      </span>
    );
  }
};

function roundToSignificant(num: number, sigFigs: number) {
  if (num === 0) {
    return 0;
  }

  const digits = Math.floor(Math.log10(num)) + 1;
  const roundedNum =
    Math.round(num * Math.pow(10, sigFigs - digits)) /
    Math.pow(10, sigFigs - digits);

  return roundedNum.toString().replace(/\.?0+$/, "");
}
