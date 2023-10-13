function reduceFinalize(
  reducer, finalizer, initValue
) {
  const reduceArgs = [reducer];
  if (typeof initValue !== 'undefined') {
    if (typeof initValue === 'function') {
      initValue = initValue(this);
    }
    reduceArgs.push(initValue);
  }

  const product = this.reduce(
    ...reduceArgs
  );
  const final = finalizer(
    product, this
  );
	
  return final;
}

Object.defineProperty(
  Array.prototype, 'reduceFinalize', {
    value: reduceFinalize
  }
);
