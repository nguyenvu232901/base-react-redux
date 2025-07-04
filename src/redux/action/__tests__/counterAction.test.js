import { increaseCounter, decreaseCounter, INCREMENT, DECREMENT } from '../counterAction';

describe('Counter Actions', () => {
  describe('increaseCounter', () => {
    it('should create an action to increment counter', () => {
      const expectedAction = {
        type: INCREMENT,
      };

      expect(increaseCounter()).toEqual(expectedAction);
    });
  });

  describe('decreaseCounter', () => {
    it('should create an action to decrement counter', () => {
      const expectedAction = {
        type: DECREMENT,
      };

      expect(decreaseCounter()).toEqual(expectedAction);
    });
  });

  describe('Action Types', () => {
    it('should have correct action type constants', () => {
      expect(INCREMENT).toBe('INCREMENT');
      expect(DECREMENT).toBe('DECREMENT');
    });
  });
});
