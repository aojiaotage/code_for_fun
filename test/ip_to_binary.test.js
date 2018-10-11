const func = require('../ip_to_binary');

const { expect } = require('chai');

describe('tests on func: ip to binary', () => {
  describe('valid, normal ipv4 ip addresses', () => {
    const ipArr = [
      '172.168.5.1',
      '192.168.1.255',
      '4.4.4.4',
      '255.255.255.255',
      '0.0.0.0',
    ];

    const rArr = [
      2896692481,
      3232236031,
      67372036,
      4294967295,
      0,
    ];

    for (let i = 0; i < ipArr.length; i += 1) {
      const ipStr = ipArr[i];
      const ipNum = rArr[i];
      it(`should return expected result for ${ipStr}`, () => {
        expect(func(ipStr)).to.be.equal(ipNum);
      });
    }
  });
  describe('invalid ipv4 ip addresses', () => {
    const ipArr = [
      '0.0.0.-1',
      '0.0.0.256',
      '-1.255.255.255',
      '256.255.255.255',
      'abc.0.0.0',
      '*.0.0.0',
      'a.0.0.0'
    ];

    for (let i = 0; i < ipArr.length; i += 1) {
      const ipStr = ipArr[i];
      it(`should throw error for ${ipStr}`, () => {
        expect(()=>func(ipStr)).to.throw();
      });
    }
  });

  describe('spaced addresses', () => {
    describe('should should ignore spaces between dot and digit', () => {
      const ipArr = [
        ' 11.11.11.11',
        '11 .11 .11.11',
        '11. 11.11.11',
        '11.11 .11 . 11 ',
      ];

      const result = 185273099;

      for (let i = 0; i < ipArr.length; i += 1) {
        const ipStr = ipArr[i];
        it(`should return expected result for ${ipStr}`, () => {
          expect(func(ipStr)).to.be.equal(result);
        });
      }
    });

    describe('should throw error on spaces between digits', () => {
      const ipArr = [
        '1 1.11.11.11',
        '11.1 1.11.11',
        '11.11.1 1.11',
        '1 1.1 1.1 1.1 1 ',
      ];

      for (let i = 0; i < ipArr.length; i += 1) {
        const ipStr = ipArr[i];
        it(`should throw error for ${ipStr}`, () => {
          expect(()=>func(ipStr)).to.throw();
        });
      }
    });
  });

});


