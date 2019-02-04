/**************************************
 * Reminders Module
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

const remindersModule = (function() {

  const cachedDOM = {
    toDoItem3Button: document.getElementById('toDoItem3'),
    reminderBox: document.getElementById('reminder-box'),
    get reminderBoxInput() {
      // console.log('inside cachedDOM getter');
      return this.reminderBox.querySelector('input')
    },
    reminderBoxBtn: document.getElementById('reminder-box-btn'),
    reminderBoxCloseBtn: document.getElementById('reminder-box-close-btn'),
    reminderColors: document.getElementsByName('reminderColor'),
    reminderBodyFader: document.getElementById('reminder-body-fader'),
    reminderPopup: document.getElementById('reminder-popup'),
    get reminderPopupTextLine() {
      // console.log('inside cachedDOM getter');
      return this.reminderPopup.querySelector('p')
    },
    get reminderPopupTimestampLine() {
      // console.log('inside cachedDOM getter');
      return this.reminderPopup.querySelectorAll('p')[1]
    },
    reminderPopupCloseBtn: document.getElementById('reminder-popup-close-btn')
  };

  let store = [];

  // populates local store with Firebase reminders upon login (called in firebaseAuthModule)
  const setStore = function() {
    let reminders = firebaseRDModule.firebaseDataStore.refToDoItemsSnapshotReminders.items || undefined;
    console.log('A-HA, THEREIN LIES THE ISSUE:');
    console.log('reminder:' + reminders);
    if ( reminders ) {
      Object.keys(reminders).forEach(function(x) {
        let val = reminders[x];
        store.push({[x]: val});
      });
      fetchItems();
      console.log('fetchInterval initialized');
    }
  };

  // clears local store upon logout (called in firebaseAuthModule)
  const clearStore = function() {
    store = [];
  };

  // for console testing purposes only
  const getStore = function() {
    return store;
  };

  const getCurrentTime = function(colon) {
    let currentTime;
    let x = new Date();
    let hourNow = x.getHours();
    hourNow < 10 ? hourNow = `0${hourNow}`: null;
    let minNow = x.getMinutes();
    minNow < 10 ? minNow = `0${minNow}`: null;
    if (colon === 'colon') {
      currentTime = `${hourNow}:${minNow}`;
    } else currentTime = `${hourNow}${minNow}`;
    return currentTime;
  };

  const getReminderColor = function() {
    let dataTextVal;
    let radios = cachedDOM.reminderColors;
    radios[0].checked ? dataTextVal = 1 :
    radios[1].checked ? dataTextVal = 2 :
    radios[2].checked ? dataTextVal = 3 :
    radios[3].checked ? dataTextVal = 4 :
    radios[4].checked ? dataTextVal = 5 :
    dataTextVal = 1; //default if none checked
    return dataTextVal;
  }
  
  const setInputValueToCurrentTime = function() {
    let currentValue = getCurrentTime('colon');
    cachedDOM.reminderBoxInput.value = currentValue;
  };
  
  const openReminderBox = function() {
    setInputValueToCurrentTime();
    cachedDOM.reminderBodyFader.classList.remove('display-none');
    cachedDOM.reminderBox.classList.remove('opacity-zero');
    cachedDOM.reminderBoxInput.focus();
  };
  
  const closeReminderBox = function() {
    cachedDOM.reminderBox.classList.add('opacity-zero');
    cachedDOM.reminderBodyFader.classList.add('display-none');
  };

  const openReminderPopup = function({text, color}) {
    let p = cachedDOM.reminderPopupTextLine;
    p.setAttribute('data-text-color', color);
    p.innerText = text;
    let time = cachedDOM.reminderPopupTimestampLine;
    time.innerText = `@ ${timeRelatedFunctions.timeStamp()}`;
    cachedDOM.reminderBodyFader.classList.remove('display-none');
    cachedDOM.reminderPopup.classList.remove('display-none');
    cachedDOM.reminderPopup.classList.remove('opacity-zero');
  }

  const closeReminderPopup = function() {
    cachedDOM.reminderPopup.classList.add('opacity-zero');
    cachedDOM.reminderPopup.classList.add('display-none');
    cachedDOM.reminderBodyFader.classList.add('display-none');
  };

  const getTimerInputValue = function() {
    let when = cachedDOM.reminderBoxInput.value;
    let hour = when.substr(0,2);
    let min = when.substr(3,2);
    return `${hour}${min}`;
  };

  const addItemLater = function() {
    closeReminderBox();
    let textToAdd = addToList.value;
    let reminderTime = getTimerInputValue();
    let reminderColor = getReminderColor();
    let reminderVal = `${reminderTime}-${reminderColor}`;
    let delayedItem = { [textToAdd]: reminderVal };
    store.push(delayedItem);
    console.log(delayedItem);
    firebaseRDModule.addToFirebaseRD_Reminders(delayedItem);
    if (store.length === 1) {
      fetchItems();
      console.log('fetchInterval initialized');
    }
    addToList.value = '';
  };

  const addItemNow = function({text, reminderItem, color}) {
    // call function located in to-do.js:
    addingItem({priority: 1, scheduledItem: text, itemColor: color});
    firebaseRDModule.deleteFromFirebaseRD_Reminders(reminderItem);
  };

  const fetchItems = function() {
    let fetchInterval = window.setInterval(function() {
      let currentTime = getCurrentTime();
      let newStore = [];
      store.slice().forEach(function(reminderItem, index) {
        // the reminderItem key is the reminder text:
        let reminderKey = Object.keys(reminderItem)[0];
        // the reminderItem value is the time & color:
        let reminderVal = Object.values(reminderItem)[0];
        let reminderTime = reminderVal.substr(0,4);
        let reminderColor = Number(reminderVal.substr(5,1));
        if (reminderTime === currentTime) {
          addItemNow({text: reminderKey, reminderItem, color: reminderColor});
          openReminderPopup({text: reminderKey, color: reminderColor});
        } else {
          newStore.push(reminderItem);
        }
      });
      store = newStore.slice();
      if (store.length === 0) {
        window.clearInterval(fetchInterval);
        console.log('fetchInterval cleared');
      }
    }, 1000*10); //(every 10 secs)
  };

  function bindEvents() {
    cachedDOM.toDoItem3Button.addEventListener('click',
    openReminderBox, false);

    cachedDOM.reminderBoxBtn.addEventListener('click',
    addItemLater, false);
    
    cachedDOM.reminderBoxCloseBtn.addEventListener('click',
    closeReminderBox, false);

    cachedDOM.reminderPopupCloseBtn.addEventListener('click',
    closeReminderPopup, false);
    
    cachedDOM.reminderBoxInput.addEventListener('keydown', function(event){
      if ( event.keyCode === 13 ) {
        event.preventDefault();
        addItemLater();
      }
    });
    }

  function init() {
    bindEvents();
    // cacheDOM();
    // renderDOM();
    // handleEvents();
  }


  return {
    init: init(),
    store: getStore,
    setRemindersStore: setStore,
    clearRemindersStore: clearStore,
    cachedDOM: cachedDOM,
    setValue: setInputValueToCurrentTime,
    getReminderColor: getReminderColor
  }
})();