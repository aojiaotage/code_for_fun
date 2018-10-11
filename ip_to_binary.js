'use strict';

function validateNumberStr(nStr) {
  const n = Number(nStr);
  if (Number.isNaN(n)) throw new Error(`str: "${nStr}" is not a number!`);
  if (n < 0 || n > 255) throw new Error(`str: "${nStr}" is out of range 0-255`);
  return true;
}

module.exports = (str) => {
  let tmpNumberStr = '';
  const nums = [];
  for (let c of str) {
    if (c === '.') {
      validateNumberStr(tmpNumberStr);
      const n = Number(tmpNumberStr);
      nums.push(n);
      tmpNumberStr = '';
    } else {
      tmpNumberStr += c;
    }
  }

  validateNumberStr(tmpNumberStr);
  const n = Number(tmpNumberStr);
  nums.push(n);
  return nums[0] * 2 ** 24 + nums[1] * 2 ** 16 + nums[2] * 2 ** 8 + nums[3] * 2 ** 0;
};
