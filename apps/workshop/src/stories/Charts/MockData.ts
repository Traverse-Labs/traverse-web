let current = new Date();

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const mockValues = (numValues: number) => {
  return [...Array(numValues).keys()].map((i) =>
    randomIntFromInterval(100, 10000)
  );
};
export const mockCategories = (numValues: number) => {
  return [...Array(numValues).keys()].map((i) => {
    const newDate = new Date(current.getTime() + 86400000);

    current = newDate;
    return newDate.toLocaleDateString();
  });
};
