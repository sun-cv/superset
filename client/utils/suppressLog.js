const suppressLog = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('"shadow*" style props are deprecated')
  ) {
    return;
  }
  suppressLog(...args);
};

export default suppressLog