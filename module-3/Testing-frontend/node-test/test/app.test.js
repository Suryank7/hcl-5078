import { greet, greetInHindi } from '../app.js'; 
import { describe, test } from 'node:test'; 
import assert from 'node:assert'; 

describe("greeting functions", () => {
    test("greet returns the correct greeting", () => {
      const expected = `Hello, World!`;
      const actual = greet("World!");

      assert.strictEqual(actual, expected);
    });
    test("greet greet returns in hindi", () => {
      const expected = `Ram Ram, bhai saariya ne!`;
      const actual = greetInHindi("saariya");

      assert.strictEqual(actual, expected);
    });
})

