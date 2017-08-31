'use strict';

const expect = require('chai').expect;

const iPConverter = require('index.js');
const invalidError = 'IP supplied is not valid';

describe('convertCIDRToIPRange', function () {
  describe('error cases', function () {
    it('should return an error if no value is supplied', function () {
      expect(iPConverter()).to.equal(invalidError);
    });

    it('should return an error if the IP address supplied is invalid', function () {
      expect(iPConverter('abc')).to.equal(invalidError);
      expect(iPConverter(123)).to.equal(invalidError);
    });

    it('should return an error if the IP address is not in CIDR notation', function () {
      expect(iPConverter('10.1.128.0')).to.equal(invalidError);
    });

    it('should return an error if the IP address uses numbers which are too high', function () {
      expect(iPConverter('192.168.1.134/256')).to.equal(invalidError);
    });
  });

  describe('success cases', function () {
    it('should return an array of IP addresses within the specified range', function () {
      const expectedResponse = [
        '192.168.1.129',
        '192.168.1.130',
        '192.168.1.131',
        '192.168.1.132',
        '192.168.1.133',
        '192.168.1.134'
      ];

      expect(iPConverter('192.168.1.134/29')).to.deep.equal(expectedResponse);
    });
  });
});
