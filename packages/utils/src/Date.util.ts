// Function to convert second to UTC time in ISO-8601 format
export const convertSecondToUTC = (second: number): string => {
  const date = new Date(0);

  date.setUTCSeconds(second);
  return date.toISOString();
};

// Function to convert UTC time in ISO-8601 format to seconds
export const convertUTCToSecond = (utc: string): number => {
  const date = new Date(utc);

  return date.getTime() / 1000;
};

// Function to get current time in seconds
export const getCurrentTimeInSecond = (): number => {
  return Math.floor(Date.now() / 1000);
};
