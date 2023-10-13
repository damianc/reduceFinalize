# `reduceFinalize`

This method works like the built-in `reduce` method, but allows transforming the final value before returning it.

```
reduceFinalize(reducer, finalizer, initValue?)
```

- `reducer` - a callback with signature `(accumulatedValue, currentValue, index, array)`
- `finalizer` - a callback with signature `(producedValue, array)`
- `initValue` - an optional parameter being an initial value for the reducer function, it may be assigned a value or a callback that returns value (then its signature is `(array)`)

## Examples

### Calculating a Mean

```
const arr = [1,2,3,4];
const mean = arr.reduceFinalize(
  (acc,curr) => acc + curr,
  (sum,seq) => sum / seq.length
);

console.log(mean);
// 2.5
```

• or with use of the object that contains temporary data to latter use:

```
const arr = [1,2,3,4];
const mean = arr.reduceFinalize(
  (acc,curr) => ({
    sum: acc.sum + curr,
    elements: acc.elements + 1
  }),
  (obj) => obj.sum / obj.elements,
  { sum: 0, elements: 0 }
);

console.log(mean);
// 2.5
```

• alternatively:

```
const arr = [1,2,3,4];
const mean = arr.reduceFinalize(
  (acc,curr) => ({
    sum: (acc.sum || 0) + curr,
    elements: (acc.elements || 0) + 1
  }),
  (obj) => obj.sum / obj.elements,
  {}
);

console.log(mean);
// 2.5
```

### Getting Index of Max Value

```
const nums = [2,4,1,8,3,8];
const indexOfMax = nums.reduceFinalize(
  (acc,curr,idx) => {
    if (curr > acc.value) {
      return {
        value: curr, index: idx
      };
    } else return acc;
  },
  ({index}) => index,
  ([first]) => ({ value: first, index: 0 })
);

console.log(indexOfMax);
// 3
```
