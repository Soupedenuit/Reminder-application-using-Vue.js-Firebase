/**************************************
 * HighlightItems Module
***************************************
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
** PROJECT:  To-Do With Vue.js
**    DATE:  Oct 2018
** VERSION:  1.00
**  Copyright (C) 2018
**
***************************************
**************************************/

const highlightItemsModule = (function() {

  const cachedDOM = {
    mother: document.getElementsByTagName('ul')[0]
  };

  const changeDatasetValue = function(el) {
    let numVal;
    if ( el.dataset.textColor ) {
      numVal = Number(el.dataset.textColor);
      if ( numVal === 5 ) {
        numVal = 0;
      } else numVal += 1;
    } else numVal = 1;
    el.dataset.textColor = numVal.toString();
  };

  const bindEvents = function() {
    cachedDOM.mother.addEventListener('mousedown', function (event) {
      let el = event.target;
      if ( event.which === 3 ) {
        el.oncontextmenu = function() {
          return false; // disables right-click contextMenu
        }
        if ( event.target !== event.currentTarget ) {
          if (el.nodeName === 'SPAN') {
            changeDatasetValue(el);
          } else console.log('not a SPAN');
        }
      }
    }, false);
  }

  function init() {
    bindEvents();
    // highlightItems();
  }


  return {
    init: init(),
  }

})();