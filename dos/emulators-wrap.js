// Capture the emulators module from the AMD loader
(function() {
  var src = document.createElement('script');
  src.src = 'dos/emulators.js';
  src.onload = function() {
    // emulators.js IIFE returns the require function, but we can't capture it
    // directly from a script tag. Instead, re-execute the IIFE wrapped.
    // But since the file is already loaded, we'll extract the emulators factory.
    var originalCode = '';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'dos/emulators.js', false);
    xhr.overrideMimeType('text/javascript');
    xhr.send();
    originalCode = xhr.responseText;
    
    // The IIFE starts with !function e(t,n,s){...}
    // We need to capture the return value.
    // Wrap the whole thing: the return value is the 'r' function.
    // Module 71 is the entry point (Emulators).
    var wrapped = 'window.__EMULATORS_MODULE = (' + originalCode + ')(71);';
    
    var evalScript = document.createElement('script');
    evalScript.textContent = wrapped;
    document.head.appendChild(evalScript);
    
    if (window.__EMULATORS_MODULE) {
      // __EMULATORS_MODULE is now the emulators object
      window.Emulators = window.__EMULATORS_MODULE;
      var evt = new CustomEvent('emulators-ready');
      window.dispatchEvent(evt);
    }
  };
  document.head.appendChild(src);
})();
