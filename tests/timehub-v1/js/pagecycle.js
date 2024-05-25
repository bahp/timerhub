
function updateLog(message) {
   document.getElementById("info").innerHTML =
      document.getElementById("info").innerHTML +
          + ' | ' + message + ' | ' +
          new Date().toDateString() + '<br>';
}

const getState = () => {
    if (document.visibilityState === 'hidden') {
      return 'hidden';
    }
    if (document.hasFocus()) {
      return 'active';
    }
    return 'passive';
  };

  // Stores the initial state using the `getState()` function (defined above).
  let state = getState();

  // Accepts a next state and, if there's been a state change, logs the
  // change to the console. It also updates the `state` value defined above.
  const logStateChange = (nextState) => {
    const prevState = state;
    if (nextState !== prevState) {
      console.log(`State change: ${prevState} >>> ${nextState}`);
      updateLog(`State change: ${prevState} >>> ${nextState}`)
      //if (nextState == 'active')
      //    location.reload();
    }
  };

  // Options used for all event listeners.
  const opts = {capture: true};

  // These lifecycle events can all use the same listener to observe state
  // changes (they call the `getState()` function to determine the next state).
  ['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach((type) => {
    window.addEventListener(type, () => logStateChange(getState(), opts));
  });

  // The next two listeners, on the other hand, can determine the next
  // state from the event itself.
  window.addEventListener('freeze', () => {
    // In the freeze event, the next state is always frozen.
    logStateChange('frozen');
  }, opts);

  window.addEventListener('pagehide', (event) => {
    // If the event's persisted property is `true` the page is about
    // to enter the back/forward cache, which is also in the frozen state.
    // If the event's persisted property is not `true` the page is
    // about to be unloaded.
    logStateChange(event.persisted ? 'frozen' : 'terminated');
  }, opts);

  document.addEventListener('resume', (event) => {
    console.log("The page has been resumed!")
  });