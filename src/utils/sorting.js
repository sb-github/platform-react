export const sortByKey = (array, key, order) => {
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];

    if (typeof x === "string") {
      x = x.toLowerCase();
      y = y.toLowerCase();

      return order === 'descend'
        ? ((x < y) ? -1 : ((x > y) ? 1 : 0))
        : ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
    if (typeof x === "number") {
      return order === 'descend' ? (x - y) : (y - x);
    }
  });
};