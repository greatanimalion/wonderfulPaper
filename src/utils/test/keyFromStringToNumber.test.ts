import { keyFromStringToNumber } from '../keyFromStringToNumber';
import { describe, it, expect } from 'jest';
describe('keyFromStringToNumber', () => {
    it('should convert specified keys to numbers', () => {
        const input = { a: '1', b: '2', c: '3' };
        const keys = ['a', 'c'];
        const expected = { a: 1, b: '2', c: 3 };
        expect(keyFromStringToNumber(input, keys)).toEqual(expected);
    });

    it('should not convert keys not specified', () => {
        const input = { a: '1', b: '2', c: '3' };
        const keys = ['b'];
        const expected = { a: '1', b: 2, c: '3' };
        expect(keyFromStringToNumber(input, keys)).toEqual(expected);
    });

    it('should handle empty object', () => {
        const input = {};
        const keys = ['a'];
        const expected = {};
        expect(keyFromStringToNumber(input, keys)).toEqual(expected);
    });

    it('should handle empty keys array', () => {
        const input = { a: '1', b: '2' };
        const keys = [];
        const expected = { a: '1', b: '2' };
        expect(keyFromStringToNumber(input, keys)).toEqual(expected);
    });

    it('should handle non-existent keys', () => {
        const input = { a: '1', b: '2' };
        const keys = ['c'];
        const expected = { a: '1', b: '2' };
        expect(keyFromStringToNumber(input, keys)).toEqual(expected);
    });

    it('should handle non-string values', () => {
        const input = { a: '1', b: 2, c: true };
        const keys = ['a', 'c'];
        const expected = { a: 1, b: 2, c: 1 };
        expect(keyFromStringToNumber(input, keys)).toEqual(expected);
    });

    it('should handle NaN conversion', () => {
        const input = { a: 'notANumber', b: '2' };
        const keys = ['a', 'b'];
        const expected = { a: NaN, b: 2 };
        expect(keyFromStringToNumber(input, keys)).toEqual(expected);
    });
});