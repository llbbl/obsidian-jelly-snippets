import { Symbol } from '../src/symbol';
import { RHS } from '../src/snippet';

describe('Symbol', () => {
  describe('Symbol enum', () => {
    it('should have correct symbol values', () => {
      expect(Symbol.Newline).toBe('%\\n');
      expect(Symbol.Tab).toBe('%\\t');
      expect(Symbol.Space).toBe('%\\s');
      expect(Symbol.CursorEnd).toBe('%\\e');
    });
  });

  describe('replaceSymbolsOnParse', () => {
    it('should replace newline symbols', () => {
      const result = Symbol.replaceSymbolsOnParse('Hello%\\nWorld');
      
      expect(result.data).toBe('Hello\nWorld');
      expect(result.info.hasNewline).toBe(true);
      expect(result.info.cursorEnd).toBe(0);
    });

    it('should replace tab symbols', () => {
      const result = Symbol.replaceSymbolsOnParse('Hello%\\tWorld');
      
      expect(result.data).toBe('Hello\tWorld');
      expect(result.info.hasNewline).toBe(false);
      expect(result.info.cursorEnd).toBe(0);
    });

    it('should replace space symbols', () => {
      const result = Symbol.replaceSymbolsOnParse('Hello%\\sWorld');
      
      expect(result.data).toBe('Hello World');
      expect(result.info.hasNewline).toBe(false);
      expect(result.info.cursorEnd).toBe(0);
    });

    it('should handle cursor end at the end of string', () => {
      const result = Symbol.replaceSymbolsOnParse('12345678%\\e');
      
      expect(result.data).toBe('12345678');
      expect(result.info.cursorEnd).toBe(0);
      expect(result.info.hasNewline).toBe(false);
    });

    it('should handle cursor end at the beginning of string', () => {
      const result = Symbol.replaceSymbolsOnParse('%\\e12345678');
      
      expect(result.data).toBe('12345678');
      expect(result.info.cursorEnd).toBe(8);
      expect(result.info.hasNewline).toBe(false);
    });

    it('should handle cursor end in the middle of string', () => {
      const result = Symbol.replaceSymbolsOnParse('123%\\e45678');
      
      expect(result.data).toBe('12345678');
      expect(result.info.cursorEnd).toBe(5);
      expect(result.info.hasNewline).toBe(false);
    });

    it('should handle cursor end with single character before', () => {
      const result = Symbol.replaceSymbolsOnParse('1%\\e23');
      
      expect(result.data).toBe('123');
      expect(result.info.cursorEnd).toBe(2);
      expect(result.info.hasNewline).toBe(false);
    });

    it('should handle cursor end with two characters before', () => {
      const result = Symbol.replaceSymbolsOnParse('12%\\e3');
      
      expect(result.data).toBe('123');
      expect(result.info.cursorEnd).toBe(1);
      expect(result.info.hasNewline).toBe(false);
    });

    it('should handle multiple symbols including newline and cursor end', () => {
      const result = Symbol.replaceSymbolsOnParse('123%\\n4%\\e56');
      
      expect(result.data).toBe('123\n456');
      expect(result.info.hasNewline).toBe(true);
      expect(result.info.cursorEnd).toBe(2);
    });

    it('should handle multiple replaceable symbols', () => {
      const result = Symbol.replaceSymbolsOnParse('a%\\nb%\\tc%\\sd');
      
      expect(result.data).toBe('a\nb\tc d');
      expect(result.info.hasNewline).toBe(true);
      expect(result.info.cursorEnd).toBe(0);
    });

    it('should handle empty string', () => {
      const result = Symbol.replaceSymbolsOnParse('');
      
      expect(result.data).toBe('');
      expect(result.info.hasNewline).toBe(false);
      expect(result.info.cursorEnd).toBe(0);
    });

    it('should handle string with no symbols', () => {
      const result = Symbol.replaceSymbolsOnParse('plain text');
      
      expect(result.data).toBe('plain text');
      expect(result.info.hasNewline).toBe(false);
      expect(result.info.cursorEnd).toBe(0);
    });

    it('should handle only cursor end symbol', () => {
      const result = Symbol.replaceSymbolsOnParse('%\\e');
      
      expect(result.data).toBe('');
      expect(result.info.hasNewline).toBe(false);
      expect(result.info.cursorEnd).toBe(0);
    });

    it('should handle multiple cursor end symbols (only first one counts)', () => {
      const result = Symbol.replaceSymbolsOnParse('a%\\eb%\\ec');
      
      expect(result.data).toBe('abc');
      expect(result.info.hasNewline).toBe(false);
      expect(result.info.cursorEnd).toBe(1);
    });

    it('should handle complex combination of all symbols', () => {
      const result = Symbol.replaceSymbolsOnParse('line1%\\n%\\tindented%\\s%\\eline2');
      
      expect(result.data).toBe('line1\n\tindented line2');
      expect(result.info.hasNewline).toBe(true);
      expect(result.info.cursorEnd).toBe(5);
    });

    it('should return correct RHS structure', () => {
      const result = Symbol.replaceSymbolsOnParse('test%\\n%\\e');
      
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('info');
      expect(result.info).toHaveProperty('hasNewline');
      expect(result.info).toHaveProperty('cursorEnd');
      expect(typeof result.data).toBe('string');
      expect(typeof result.info.hasNewline).toBe('boolean');
      expect(typeof result.info.cursorEnd).toBe('number');
    });
  });
});