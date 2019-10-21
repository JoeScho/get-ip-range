'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');

const iPConverter = require('./index.js');

const successResponse = {
  error: null,
  value: [
    '192.168.1.129',
    '192.168.1.130',
    '192.168.1.131',
    '192.168.1.132',
    '192.168.1.133',
    '192.168.1.134',
  ],
};

describe('convert', function () {
  describe('for cidr notation', function () {
    describe('error cases', function () {
      it('should return an error if no value is supplied', function () {
        expect(iPConverter().error).to.be.an('error');
      });

      it('should return an error if the value is supplied is null', function () {
        expect(iPConverter(null).error).to.be.an('error');
      });

      it('should return an error if the value is supplied is undefined', function () {
        expect(iPConverter(undefined).error).to.be.an('error');
      });

      it('should return an error if the IP address supplied is invalid', function () {
        expect(iPConverter('abc').error).to.be.an('error');
        expect(iPConverter(123).error).to.be.an('error');
      });

      it('should return an error if the IP address is not in CIDR notation', function () {
        expect(iPConverter('10.1.128.0').error).to.be.an('error');
      });

      it('should return an error if the IP address uses numbers which are too high', function () {
        expect(iPConverter('192.168.1.134/256').error).to.be.an('error');
      });
    });

    describe('success cases', function () {
      it('should return an array of IP addresses within the specified range', function () {
        expect(iPConverter('192.168.1.134/29')).to.deep.equal(successResponse);
      });
    });
  });

  describe('for two IP addresses', function () {
    describe('error cases', function () {
      it('should return an error if one of the IP addresses supplied is invalid', function () {
        expect(iPConverter('abc', '192.168.0.1').error).to.be.an('error');
        expect(iPConverter(123, '192.168.0.1').error).to.be.an('error');
        expect(iPConverter('192.168.0.1', 'abc').error).to.be.an('error');
        expect(iPConverter('192.168.0.1', 123).error).to.be.an('error');
      });

      it('should return an error if one of the IP addresses is in CIDR notation', function () {
        expect(iPConverter('10.1.128.0/29', '10.1.128.0').error).to.be.an('error');
        expect(iPConverter('10.1.128.0', '10.1.128.0/29').error).to.be.an('error');
      });

      it('should return an error if one of the IP addresses is in null', function () {
        expect(iPConverter(null, '10.1.128.0').error).to.be.an('error');
        expect(iPConverter('10.1.128.0', null).error).to.be.an('error');
      });

      it('should return an error if one of the IP addresses is in undefined', function () {
        expect(iPConverter(undefined, '10.1.128.0').error).to.be.an('error');
        expect(iPConverter('10.1.128.0', undefined).error).to.be.an('error');
      });

      it('should return an error if one IP address has numbers which are too high', function () {
        expect(iPConverter('192.168.1.134/256', '192.168.1.134').error).to.be.an('error');
        expect(iPConverter('192.168.1.134', '192.168.1.134/256').error).to.be.an('error');
      });
    });

    describe('success cases', function () {
      it('should return an array of IP addresses within the specified range', function () {
        expect(iPConverter('192.168.1.129', '192.168.1.134')).to.deep.equal(successResponse);
      });
    });
  });
});
