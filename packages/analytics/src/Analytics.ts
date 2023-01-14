import { init, track } from "@amplitude/analytics-browser";

import { CommonAmplitudeEvent } from "./AmplitudeEvent.enum";

export const initializeAmplitude = () => {
  if (!process.env.NEXT_PUBLIC_AMPLITUDE_KEY) {
    console.log("WARN: Amplitude key has not been set");
    return;
  }

  init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY);
};

export const trackCommonEvent = (
  event: CommonAmplitudeEvent,
  properties: object = {}
) => {
  if (process.env.NEXT_PUBLIC_AMPLITUDE_DEBUG) {
    console.log(`Event: ${event}`);
    console.log(properties);
    console.log("-");
    return;
  }

  track(event, properties);
};

export const debugEvent = (event: string, properties: object) => {
  console.log(`Event: ${event}`);
  console.log(properties);
  console.log("-");
};
