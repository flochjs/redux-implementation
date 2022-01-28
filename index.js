const createStore = (initalReducer, initialState) => {
  let reducer = initalReducer;
  let currentState = initialState;
  let listeners = [];

  const callListeners = () => listeners.forEach((listener) => listener());

  const getState = () => currentState;

  const dispatch = (action = {}) => {
    currentState = reducer(currentState, action);

    callListeners();

    return action;
  };

  const subscribe = (newListener) => {
    listeners.push(newListener);

    const unsubscribe = () =>
      void (listeners = listeners.filter(
        (listener) => listener !== newListener,
      ));

    return unsubscribe;
  };

  const replaceReducer = (nextReducer) => {
    reducer = nextReducer;

    callListeners();
  };

  return { getState, dispatch, subscribe, replaceReducer };
};

module.exports = { createStore };
