export enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export function sortArray<T>(
  array: (T & { compareValue: number | string })[],
  key: keyof (T & { compareValue: number | string }),
  direction: SortDirection
): (T & { compareValue: number | string })[] {
  const arrayCopy = [...array];

  return arrayCopy.sort((a, b) => {
    if (!a[key] || !b[key]) {
      return 0;
    }

    if (b[key] < a[key]) return direction === SortDirection.Desc ? -1 : 1;
    if (b[key] > a[key]) return direction === SortDirection.Desc ? 1 : -1;

    return 0;
  });
}
