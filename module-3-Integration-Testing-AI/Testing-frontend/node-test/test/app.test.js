import { greet, greetInHindi, processOrder } from '../app.js'; 
import { describe, mock, test } from 'node:test'; 
import assert from 'node:assert'; 

describe("order feature", () => {
    test("it process the order correctly", () => {
        const mockedprocessPayment = mock.fn((amount) => {
            console.log('i am mocked process payment function');
            return { id: 123, amount };
            
        });
        const expected = { id: 123, amount: 5000 };
        const actual = processOrder({ amount: 5000 }, { processPayment: mockedprocessPayment })
        assert.deepStrictEqual(actual, expected);
    });
    
});

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

