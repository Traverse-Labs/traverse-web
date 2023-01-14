import { track } from "@amplitude/analytics-browser";
import { debugEvent } from "analytics";

import { AmplitudeEvent } from "../enums";

export const trackEvent = (event: AmplitudeEvent, properties: object = {}) => {
  if (process.env.NEXT_PUBLIC_AMPLITUDE_DEBUG) {
    debugEvent(event, properties);
    return;
  }

  track(event, properties);
};
