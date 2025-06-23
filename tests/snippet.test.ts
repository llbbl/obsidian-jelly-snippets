import { Snippet, SnippetType, LHS, RHS } from '../src/snippet';

describe('Snippet Types', () => {
  describe('LHS type', () => {
    it('should accept string values', () => {
      const lhs: LHS = 'trigger';
      expect(typeof lhs).toBe('string');
      expect(lhs).toBe('trigger');
    });

    it('should handle empty string', () => {
      const lhs: LHS = '';
      expect(lhs).toBe('');
    });

    it('should handle special characters', () => {
      const lhs: LHS = 'test@#$%';
      expect(lhs).toBe('test@#$%');
    });
  });

  describe('RHS interface', () => {
    it('should create valid RHS with all required properties', () => {
      const rhs: RHS = {
        data: 'test content',
        info: {
          hasNewline: false,
          cursorEnd: 5
        }
      };

      expect(rhs.data).toBe('test content');
      expect(rhs.info.hasNewline).toBe(false);
      expect(rhs.info.cursorEnd).toBe(5);
      expect(typeof rhs.info.hasNewline).toBe('boolean');
      expect(typeof rhs.info.cursorEnd).toBe('number');
    });

    it('should handle RHS with newlines', () => {
      const rhs: RHS = {
        data: 'line1\nline2\nline3',
        info: {
          hasNewline: true,
          cursorEnd: 0
        }
      };

      expect(rhs.info.hasNewline).toBe(true);
      expect(rhs.data).toContain('\n');
      expect(rhs.data.split('\n')).toHaveLength(3);
    });

    it('should handle RHS with cursor positioning', () => {
      const rhs: RHS = {
        data: 'content with cursor',
        info: {
          hasNewline: false,
          cursorEnd: 6
        }
      };

      expect(rhs.info.cursorEnd).toBe(6);
      expect(rhs.info.cursorEnd).toBeGreaterThan(0);
    });

    it('should handle empty data', () => {
      const rhs: RHS = {
        data: '',
        info: {
          hasNewline: false,
          cursorEnd: 0
        }
      };

      expect(rhs.data).toBe('');
      expect(rhs.info.cursorEnd).toBe(0);
    });
  });

  describe('Snippet interface', () => {
    it('should create a valid snippet with LHS and RHS', () => {
      const lhs: LHS = 'test';
      const rhs: RHS = {
        data: 'test snippet content',
        info: {
          hasNewline: false,
          cursorEnd: 5
        }
      };

      const snippet: Snippet = { lhs, rhs };

      expect(snippet.lhs).toBe('test');
      expect(snippet.rhs.data).toBe('test snippet content');
      expect(snippet.rhs.info.hasNewline).toBe(false);
      expect(snippet.rhs.info.cursorEnd).toBe(5);
    });

    it('should handle complex snippets', () => {
      const snippet: Snippet = {
        lhs: 'complex',
        rhs: {
          data: 'function test() {\n  return "hello";\n}',
          info: {
            hasNewline: true,
            cursorEnd: 8
          }
        }
      };

      expect(snippet.lhs).toBe('complex');
      expect(snippet.rhs.data).toContain('function');
      expect(snippet.rhs.data).toContain('\n');
      expect(snippet.rhs.info.hasNewline).toBe(true);
      expect(snippet.rhs.info.cursorEnd).toBe(8);
    });

    it('should handle snippet with special characters in LHS', () => {
      const snippet: Snippet = {
        lhs: 'fn_test',
        rhs: {
          data: 'function implementation',
          info: {
            hasNewline: false,
            cursorEnd: 0
          }
        }
      };

      expect(snippet.lhs).toBe('fn_test');
      expect(snippet.lhs).toContain('_');
    });

    it('should create snippet arrays', () => {
      const snippets: Snippet[] = [
        {
          lhs: 'first',
          rhs: {
            data: 'first content',
            info: { hasNewline: false, cursorEnd: 0 }
          }
        },
        {
          lhs: 'second',
          rhs: {
            data: 'second content',
            info: { hasNewline: true, cursorEnd: 5 }
          }
        }
      ];

      expect(snippets).toHaveLength(2);
      expect(snippets[0].lhs).toBe('first');
      expect(snippets[1].lhs).toBe('second');
      expect(snippets[1].rhs.info.hasNewline).toBe(true);
    });
  });

  describe('SnippetType enum', () => {
    it('should have correct enum values', () => {
      expect(SnippetType.SLSR).toBe(0);
      expect(SnippetType.SLMR).toBe(1);
      expect(SnippetType.MLSR).toBe(2);
      expect(SnippetType.MLMR).toBe(3);
    });

    it('should convert enum values to string names', () => {
      expect(SnippetType[0]).toBe('SLSR');
      expect(SnippetType[1]).toBe('SLMR');
      expect(SnippetType[2]).toBe('MLSR');
      expect(SnippetType[3]).toBe('MLMR');
    });

    it('should be numeric enum', () => {
      expect(typeof SnippetType.SLSR).toBe('number');
      expect(typeof SnippetType.SLMR).toBe('number');
      expect(typeof SnippetType.MLSR).toBe('number');
      expect(typeof SnippetType.MLMR).toBe('number');
    });

    it('should have unique values', () => {
      const values = [
        SnippetType.SLSR,
        SnippetType.SLMR,
        SnippetType.MLSR,
        SnippetType.MLMR
      ];
      const uniqueValues = [...new Set(values)];
      expect(uniqueValues).toHaveLength(4);
    });

    it('should work with switch statements', () => {
      function getSnippetTypeName(type: SnippetType): string {
        switch (type) {
          case SnippetType.SLSR:
            return 'Single Line Single Replacement';
          case SnippetType.SLMR:
            return 'Single Line Multiple Replacement';
          case SnippetType.MLSR:
            return 'Multi Line Single Replacement';
          case SnippetType.MLMR:
            return 'Multi Line Multiple Replacement';
          default:
            return 'Unknown';
        }
      }

      expect(getSnippetTypeName(SnippetType.SLSR)).toBe('Single Line Single Replacement');
      expect(getSnippetTypeName(SnippetType.SLMR)).toBe('Single Line Multiple Replacement');
      expect(getSnippetTypeName(SnippetType.MLSR)).toBe('Multi Line Single Replacement');
      expect(getSnippetTypeName(SnippetType.MLMR)).toBe('Multi Line Multiple Replacement');
    });
  });
});