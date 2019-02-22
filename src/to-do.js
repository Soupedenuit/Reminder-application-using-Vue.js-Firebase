/**************************************
 * To-Do in Vue.js (main file)
***************************************
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
** PROJECT:  To-Do With Vue.js
**    DATE:  September 2017
** VERSION:  2.01 (with Firebase)
**  Copyright (C) 2017
**
***************************************
**************************************/

"use strict";

  /*****************************************
   Composing with Vue Components
   (session-time custom)
  *****************************************/

  Vue.component('session-time', {
    template: '<span v-html="beta + alpha"></span>',
    data: function() {
      return {
        beta: '',
        alpha: 'session opened!',
        hours: null, // enter hour or undefined/null
        minutes: null // enter minute or undefined/null
      }
    },
    methods: {
      session: function() {
        this.alpha = timeRelatedFunctions.sessionTime(this.hours,this.minutes)
      }
    },
    mounted() {
      this.interval = setInterval(this.session, 1000),
      this.beta = timeRelatedFunctions.displayTimeOpened(this.hours,this.minutes)
    }
  });

  var sessionTimeComponent = new Vue({
    el: '#sessionTimeComponent'
  });


  /*****************************************
   Vue Instances (misc):
  *****************************************/

  var todayDateInstance = new Vue({
    el: '#todayDateInstance',
    data: {},
    methods: {
      todayDate: function() {
        return 'Today is ' + timeRelatedFunctions.todayDate();
      }
    }
  });

  //Unused, not working:
  var data = {};
  var tempOttawa = new Vue({
    el: '#tempOttawa',
    data: data
    /*computed: {
      delta: function() {
        return currentTempOttawa; //'Ottawa temp:  ' + this.temp + ' °C';
      }
    }*/
  });

  var welcomeInstance = new Vue({
    el: '#welcomeInstance',
    data: {
      welcomeMsg1: 'Welcome to my Vue.js testing ground!'
    }
  });


  /************************************
   TO DO LIST
   (Vue.js component and instance):
  ************************************/

  // THIS DOES NOT WORK:
  Vue.component('todo-item', {
    //props: ['todo.text'],
    template: '<li></li>',
    mounted() {
      this.$nextTick(function () {
        resetButtonColors();
        // addjQueryHighlightMagic();
        // addVanillaHighlightMagic();
        addjQueryCheckboxMagic();
        disableButton(document.getElementById('restore'));
        disableButton(document.getElementById('clear'));
        timeStampChange();
        console.log('mounted');
      })
    }
  });

  var toDoInstance = new Vue({
    el: '#to-do-instance',
    data: {
      toDoList: [
        { id: 0, text: '<span id="item' + 0 + '" contenteditable="true" spellcheck="false">add, edit, move, delete and restore items</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + 0 + '" onclick="crossOutItem(' + 0 + ')"/><button type="button" title="move up" class="up" onclick="moveUp(' + 0 + ')">↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 0 + ')">↓</button><button type="button" title="move to top" class="up top" onclick="moveToTop(' + 0 + ')">↑↑</button><button type="button" title="move to bottom" class="down bottom" onclick="moveToBottom(' + 0 + ')">↓↓</button><button type="button" title="delete" class="del" onclick="deleteItem(' + 0 + ')">x</button></span>', textOnly: 'add, edit, move, delete and restore items' },
        { id: 1, text: '<span id="item' + 1 + '" contenteditable="true" spellcheck="false">added items are saved in local storage (including restored)</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + 1 + '" onclick="crossOutItem(' + 1 + ')"/><button type="button" title="move up" class="up" onclick="moveUp(' + 1 + ')">↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 1 + ')">↓</button><button type="button" title="move to top" class="up top" onclick="moveToTop(' + 1 + ')">↑↑</button><button type="button" title="move to bottom" class="down bottom" onclick="moveToBottom(' + 1 + ')">↓↓</button><button type="button" title="delete" class="del" onclick="deleteItem(' + 1 + ')">x</button></span>', textOnly: 'added items are saved in local storage (including restored)' },
        { id: 2, text: '<span id="item' + 2 + '" contenteditable="true" spellcheck="false">clicking the logo on the left will clear local storage</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + 2 + '" onclick="crossOutItem(' + 2 + ')"/><button type="button" title="move up" class="up" onclick="moveUp(' + 2 + ')">↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 2 + ')">↓</button><button type="button" title="move to top" class="up top" onclick="moveToTop(' + 2 + ')">↑↑</button><button type="button" title="move to bottom" class="down bottom" onclick="moveToBottom(' + 2 + ')">↓↓</button><button type="button" title="delete" class="del" onclick="deleteItem(' + 2 + ')">x</button></span>', textOnly: 'clicking the logo on the left will clear local storage'}
      ],
      project: '<p>Make things happen!</p>',
      anotherList: [
        { name: "tony", age: 44},
        { name: "karen", age: "also 44"},
        { name: "mia", age: 3}
      ],
      deletedList: [],
      dynamicCSS: false,
      timeStampDynamicCSS: false,
      boundClasses: {
        containerTransitionsOn: false,
        containerTransitionsOff: false,
        slideContainer: false
      },
      itemCounter: 2,
      cachedDOM: {
        colorPicker: document.getElementById('pick-color'),
        restoreId: document.getElementById('restore'),
        clearId: document.getElementById('clear'),
        signInBtn: document.getElementById('sign-in-button'),
        authContainer: document.getElementById('auth-container'),
        emailInput: document.getElementById('email-input'),
        passwordInput: document.getElementById('password-input'),
        passwordInputForm: document.getElementById('password-input-form'),
        loginBtn: document.getElementById('login-btn'),
        guestBtn: document.getElementById('guest-btn'),
        authContainerClose: document.getElementById('auth-container-close'),
        signInText: document.getElementById('sign-in-text'),
        itemsContainer: document.getElementById('to-do-instance'),
        li: document.getElementsByTagName('li')
      }
    },
    computed: {
      listLength: function() {
        var itemsCount = this.toDoList.length;
        if ( itemsCount === 1 ) {
          return itemsCount + ' item';
        }
        else return itemsCount + ' items';
      }
    }
  });

  /* END OF VUE.JS INSTANCES & COMPONENTS */


  /************************************
   Add items to the list
   (button, item, checkbox):
  ************************************/

  // Function to get item id by number only:
  function idNumberIsolator(idWithLetters) {
    var y = new RegExp(/\d/g);
    var numbersOnly = idWithLetters.match(y).join('');
    var idDigitsToNumber = Number(numbersOnly);
    return idDigitsToNumber;
  }

  // Action when item is added:
  document.getElementById('toDoItem1').addEventListener('click', addingItem.bind(null, {priority: 2}), false);
  document.getElementById('toDoItem2').addEventListener('click', addingItem.bind(null, {priority: 1}), false);

  function addingItem({priority, scheduledItem, itemColor}) {
    var y = toDoInstance.itemCounter + 1;
    console.log(`itemCounter: ${y}`);
    var textToAdd = function() {
      if ( typeof scheduledItem === 'string' ) {
        return scheduledItem;
      }
      else return addToList.value;
    }
    var buttonStyle = 'style="background-color: ' + toDoInstance.cachedDOM.colorPicker.value + ';"';
    let up = 1;
    let down = 2;
    let top = 3;
    let bottom = 4;
    let textColor = (itemColor || 0).toString();
    var newItem = '<span id="item' + y + '" contenteditable="true" spellcheck="false" data-text-color="' + textColor + '">' +  timeRelatedFunctions.timeStampItem(y) + textToAdd() + '</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + y + '" onclick="crossOutItem(' + y + ')"/><button type="button" title="move up"' + buttonStyle + '  class="up" onclick="moveItem(' + y + ', ' + up + ')">↑</button><button type="button" title="move to top" class="up top" ' + buttonStyle + ' onclick="moveItem(' + y + ', ' + top + ')">↑↑</button><button type="button" title="move down" class="down" ' + buttonStyle + ' onclick="moveItem(' + y + ', ' + down + ')">↓</button><button type="button" title="move to bottom" class="down bottom" ' + buttonStyle + 'onclick="moveItem(' + y + ', ' + bottom + ')">↓↓</button><button type="button" title="delete" class="del" ' + buttonStyle + ' onclick="deleteItem(' + y + ')">x</button></span>';
    console.log('addToList.value:  ' + addToList.value);
    var newObj = { id: y, text: newItem, textOnly: textToAdd() };
    var scheduledItemTest;

    if ( priority === 1 ) {
      toDoInstance.toDoList.unshift(newObj);
    }
    if ( priority === 2 ) {
      toDoInstance.toDoList.push(newObj);
    }

    addToList.value = '';

    toDoInstance.itemCounter++;

    // LOCAL STORAGE:
    var store = 'savedListItem' + y;
    if (storageAvailable('localStorage')) {
      // Store items in localStorage:
      localStorage.setItem(store, JSON.stringify(newObj));
      // Keep track of last saved item in localStorage:
      localStorage.setItem('lastStoredKey', store);
    }
    // FIREBASE STORAGE:
    // Update last stored item number in Firebase:
    firebaseRDModule.getrefToDoItems_lastStoredIdNum().set(y);

    // Store item in Firebase Realtime Database
    // (added March 17 2018)
    firebaseRDModule.addToFirebaseRD(store, JSON.stringify(newObj));

    //  Wait until Vue.js has finished updating the DOM after a data change. Here I'm simply adding a title to the latest entry. It will be removed on page refresh because it is not saved in localStorage:
    Vue.nextTick()
    .then(function() {
      console.log('nextTick()')
      let element = document.getElementById("item" + y);
      element.setAttribute('title', 'id: item ' + y);
      // element.parentElement.style.left = 0;
      element.parentElement.classList.add('translateX-slider-li');
    });

    addjQueryCheckboxMagic();
    // addjQueryHighlightMagic();
    // addVanillaHighlightMagic();
  }

  function addItemFromWork(itemNum) {
    let importedItem = allItemsFromWork[itemNum];
    let itemToAdd = { id: 'test-id', text: importedItem, textOnly: 'testing only' }; toDoInstance.toDoList.unshift(itemToAdd);
  }

  function addAllItemsFromWork() {
    for (var importedItem in allItemsFromWork) {
      let item = allItemsFromWork[importedItem];
      let itemToAdd = { id: importedItem, text: item, textOnly: 'testing only' }; toDoInstance.toDoList.unshift(itemToAdd);
    }
  }


  /************************************
   Function for finding item based on id:
  ************************************/

  function itemObjectById(id) {
    return function(item) {
      return item.id === id;
    }
  }


  /************************************
   Delete items from the list:
  ************************************/

  var deletedItemsCount = 0;
  function deleteItem(id) {
    let restoreId = document.getElementById('restore');
    let clearId = document.getElementById('clear');
    let asdf = itemObjectById(id);
    let itemObj = toDoInstance.toDoList.find(asdf);
    let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
    toDoInstance.toDoList.splice(indexOfItemObj, 1);
    toDoInstance.deletedList.push(itemObj);
    deletedItemsCount++;
    restoreId.disabled = false;
    restoreId.style.cursor = 'pointer';
    restoreId.style.backgroundColor = toDoInstance.cachedDOM.colorPicker.value;
    clearId.disabled = false;
    clearId.style.cursor = 'pointer';
    clearId.style.backgroundColor = toDoInstance.cachedDOM.colorPicker.value;
    if ( deletedItemsCount == 1 ) {
      restoreId.textContent = 'restore ' + deletedItemsCount + ' deleted item';
    }
    else restoreId.textContent = 'restore ' + deletedItemsCount + ' deleted items';
    var store = 'savedListItem' + id;
    if (storageAvailable('localStorage')) {
      localStorage.removeItem(store);
    }
    /* try using this?  toDoInstance.toDoList.$remove(itemObj);
    */

    // Remove item from Firebase Realtime Database
    // (added March 22 2018) ZZZ
    firebaseRDModule.deleteFromFirebaseRD(store);
  }


  /************************************
   Move items up & down the list:
  ************************************/

  function moveItem(id, direction) {
    let asdf = itemObjectById(id);
    let itemObj = toDoInstance.toDoList.find(asdf);
    let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
    let lastIndex = toDoInstance.toDoList.length - 1;
    if ( direction === 1 ) {
      if ( indexOfItemObj === 0 ) {
        window.alert('cannot be moved up any higher');
      }
      else {
        let newIndexOfObject = indexOfItemObj - 1;
        moveTo(newIndexOfObject);
      }
    }
    if ( direction === 2 ) {
      if ( indexOfItemObj === lastIndex ) {
        window.alert('cannot be moved down any lower');
      }
      else {
        let newIndexOfObject = indexOfItemObj + 1;
        moveTo(newIndexOfObject);
      }
    }
    if ( direction === 3 ) {
      if ( indexOfItemObj === 0 ) {
        window.alert('cannot be moved up any higher');
      }
      else {
        let newIndexOfObject = 0;
        moveTo(newIndexOfObject);
      }
    }
    if ( direction === 4 ) {
      if ( indexOfItemObj === lastIndex ) {
        window.alert('cannot be moved down any lower');
      }
      else {
        let newIndexOfObject = lastIndex;
        moveTo(newIndexOfObject);
      }
    }
    function moveTo(newIndexOfObject) {
      toDoInstance.toDoList.splice(indexOfItemObj,1);
      toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
    }
  }


  /************************************
   Cross out items on the list:
  ************************************/

  function crossOutItem(id) {
    var checkbox = document.getElementById('checkbox' + id);
    if ( checkbox.checked ) {
      document.getElementById('item' + id).style.cssText = 'text-decoration: line-through; color: #555;';
    }
    else document.getElementById('item' + id).style.cssText = null; //'text-decoration: none; color: #ddd;';
  }


  /************************************
   Restore deleted items:
  ************************************/

  document.getElementById('restore').addEventListener('click', function() {
    var deletedListLength = toDoInstance.deletedList.length;
    let restoreId = document.getElementById('restore');
    if ( deletedListLength > 0 ) {
      toDoInstance.deletedList.forEach(function(newObj) {
        toDoInstance.toDoList.push(newObj);
        //Restore items in localStorage:
        var store = 'savedListItem' + newObj.id;
        if (storageAvailable('localStorage')) {
          localStorage.setItem(store, JSON.stringify(newObj));
        }
      });
    }
    if ( deletedListLength == 1 ) {
      restoreId.textContent = 'the deleted item was restored';
    }
    else if ( deletedListLength > 1 ) {
      restoreId.textContent = 'all deleted items were restored';
    }
    else restoreId.textContent = '0 items to restore';
    toDoInstance.deletedList = [];
    deletedItemsCount = 0;
    //disableButton(cachedDOM.clearId);
    //disableButton(restoreId);
    // addjQueryHighlightMagic(); //re-applies to restored
    // addVanillaHighlightMagic(); //re-applies to restored
    addjQueryCheckboxMagic(); //re-applies to restored
  });

  function disableButton(target) {
    let deletedListLength = toDoInstance.deletedList.length;
    if ( deletedListLength === 0 ) {
      target.style.backgroundColor = '#777';
      target.disabled = true;
      target.style.cursor = 'default';
    }
  }


  /************************************
   Clear deleted items:
  ************************************/

  document.getElementById('clear').addEventListener('click', function() {
    var deletedListLength = toDoInstance.deletedList.length;
    let restoreId = document.getElementById('restore');
    let clearId = document.getElementById('clear');
    if ( deletedListLength > 0 ) {
      toDoInstance.deletedList = [];
      deletedItemsCount = 0;
      disableButton(restoreId);
      disableButton(clearId);
    }
    restoreId.textContent = '0 items to restore';
  });


  /************************************
   Make "enter" key in input field work
   by preventing it from refreshing page
   & instead making it click
   "add to list" button:
  ************************************/

  $( document ).ready(function() { $('#addToList').on('keydown', function(event){
      if ( event.keyCode === 13 ) {
        $('#toDoItem3').click();
        event.preventDefault();
      }
  });
  });


  /************************************
   Make "enter" key work
   on all checkboxes:
  ************************************/

  function addjQueryCheckboxMagic() {
    $( document ).ready(function() {  $('input[type=checkbox]').on('keypress', function(event){
        if ( event.keyCode === 13 ) {
          $(this).click();
          event.preventDefault();
        }
      });
    });
  }

  // Mounted to the Vue Component instead:
  /*
  document.addEventListener('DOMContentLoaded', addjQueryCheckboxMagic());
  */


  /************************************
   Change color theme
   (button, text of h1 and p):
  ************************************/
 
  // Change colours using the color picker:
  var colorPicker = document.getElementById('pick-color');
  // toDoInstance.cachedDOM.colorPicker.addEventListener('change', changeTheme);
  // colorPicker.addEventListener('change', changeTheme.bind(null, null), false);
  colorPicker.addEventListener('change', function() {
    changeTheme()
  })

  function changeTheme(customColor) {
    let currentColor = customColor || toDoInstance.cachedDOM.colorPicker.value;
    document.querySelector('nav').style.color = currentColor;  //'#707ac0;';
    toDoInstance.cachedDOM.signInBtn.style.color = currentColor;
    let button = document.getElementsByTagName('button');
    let restoreId = document.getElementById('restore');
    let clearId = document.getElementById('clear');
    for ( let i = 0; i < button.length; i++ ) {
      button[i].style.backgroundColor = currentColor;
    }
    document.getElementById('color-picker-wrapper').style.color = currentColor; // changed from backgroundColor to color for materialize icon
    let timeStamp = document.getElementsByClassName('timeStamp');
    for ( let i = 0; i < timeStamp.length; i++ ) {
      timeStamp[i].style.color = currentColor;
    }
    document.getElementById('logo1-color').style.fill = currentColor;
    //Save theme color:
    if (storageAvailable('localStorage')) {
      localStorage.setItem('storedThemeColor', currentColor );
    }
    disableButton(clearId);
    disableButton(restoreId);
  }

  // NAC theme:
  document.getElementById('NAC-theme').addEventListener('click', function() {
    toDoInstance.cachedDOM.colorPicker.value = '#707ac0';
    welcomeInstance.welcomeMsg1 = 'Today will be awesome!';
    var h1 = document.querySelector('h1');
    h1.textContent = 'NAC PARKING SERVICES';
    h1.style.fontSize = '1.8em';
    h1.style.marginTop = '10px';
    changeTheme();
  });

  // Reset all buttons to default color at page reload:
  function resetButtonColors() {
    const button = document.getElementsByTagName('button');
    for ( let i = 0; i < button.length; i++ ) {
      button[i].style.backgroundColor = toDoInstance.cachedDOM.colorPicker.value;
    }
    const timeStamp = document.getElementsByClassName('timeStamp');
    for ( let i = 0; i < timeStamp.length; i++ ) {
      timeStamp[i].style.color = toDoInstance.cachedDOM.colorPicker.value;
    }
  }

  // Detect saved theme color on page reload:
  function loadSavedThemeColor() {
    let storedThemeColor;
    if (storageAvailable('localStorage')) {
      storedThemeColor = localStorage.getItem('storedThemeColor');
    }
    if ( storedThemeColor ) {
      toDoInstance.cachedDOM.colorPicker.value = storedThemeColor;
    }
    changeTheme();
  }

  document.addEventListener('DOMContentLoaded',loadSavedThemeColor);


  /************************************
   Retrieve localStorage items
   on page reload:
  ************************************/

  document.getElementById('logo1').addEventListener('click', function() {
    var clearOnlyIfConfirmed = window.confirm('Ok to clear local storage? Beware, this will clear local memory; you will lose all added items on page reload.');
    if ( clearOnlyIfConfirmed ) {
      if (storageAvailable('localStorage')) {
        localStorage.clear();
      }
    }
  });

  // Retrieve Firebase Realtime Database
  // items on page reload:
  // (added March 23 2018) ZZZ

  // Done directly from gotDataItems(dataSnapshot) in to-do_firebase_RD.js file
  // document.addEventListener('DOMContentLoaded',function() {
  //   firebaseRDModule.retrieveFromFirebaseRD();
  // });


  /**************************************
   Highlight targeted items:
  **************************************/

  //Using jQuery:
  function addjQueryHighlightMagic() {
    $( document ).ready(function() {
      $('li span:first-child').on('mousedown', function(event) {
        if ( event.which === 3 ) {
          let el = event.target;
          el.oncontextmenu = function() {
            return false; // disables right-click contextMenu
          }
          if ( !$(this).data('highlight') || $(this).data('highlight') === 'no' ) {
            $(this).css({'color': 'yellow', 'font-weight': 'bold'});
            $(this).data('highlight', 'yes');
            console.log('condition true');
          }
          else {
            $(this).css({'color': 'unset', 'font-weight': 'unset'});
            $(this).data('highlight', 'no');
            // event.preventDefault();
            console.log('condition false');
          }
        }
      });
    });
    $( document ).ready(function() {
      $('li span:first-child').on('mouseup', function(event) {
        if ( event.which === 3 ) {
          event.preventDefault();
        }
      });
    });
  }

  // Mounted to the Vue Component instead:
  /*
  document.addEventListener('DOMContentLoaded', addjQueryRightClickMagic());
  */


  /**************************************
   Sort items (alphabetically):
  **************************************/

  document.getElementById('sort-alpha').addEventListener('click', function() {
    toDoInstance.toDoList.sort(function(a, b) {
      let textOnlyA = a.textOnly.toUpperCase(); // ignore case
      let textOnlyB = b.textOnly.toUpperCase(); // ignore case
      if (textOnlyA < textOnlyB) {
        return -1;
      }
      if (textOnlyA > textOnlyB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  });


  /**************************************
   Sort items from newest to oldest.
   (reverse of order in which they were added):
  **************************************/

  document.getElementById('sort-new-old').addEventListener('click', function() {
    toDoInstance.toDoList.sort(function(a, b) {
      return b.id - a.id;
    });
  });


  /**************************************
   Sort items from oldest to newest (default).
   (reset to order in which they were added):
  **************************************/

  document.getElementById('sort-old-new').addEventListener('click', function() {
    toDoInstance.toDoList.sort(function(a, b) {
      return a.id - b.id;
    });
  });


  /**************************************
    Weather Ajax call:
  **************************************/
/*
  function getTempOttawa() {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET','http://api.openweathermap.org/data/2.5/weather?lat=45.4112&lon=-75.6982&APPID=ab28334e82ce5a2e6cc588a7a65c397b',true);
  httpRequest.send(null);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === httpRequest.DONE) {
      if (httpRequest.status === 200) {
        let json = JSON.parse(httpRequest.responseText);
        let kelvinDegreesOttawa = json.main.temp;
        let celciusDegreesOttawa = Math.round(kelvinDegreesOttawa - 273);
        let currentTempOttawa = celciusDegreesOttawa;
        let humidityOttawa = json.main.humidity;
        let windOttawa = Math.round(json.wind.speed * 60 * 60 / 1000);
        let windDirOttawa = getWindDir(json.wind.deg);
        let cloudCoverageOttawa = json.clouds.all;
        let sunsetOttawa = getSunset(json.sys.sunset);
        let tempOttawaId = document.getElementById('tempOttawa');
        if ( tempOttawaId ) {
          tempOttawaId.textContent = 'Ottawa temp:  ' + celciusDegreesOttawa + ' °C';
        } // for temp if displayed in the nav bar
        let weatherOttawaText = '<p><ins>Ottawa weather:</ins><br/><pre> temperature:  ' + celciusDegreesOttawa + ' °C<br/> humidity:  ' + humidityOttawa + ' %<br/> wind:  ' + windOttawa + ' km/hr <span id="windDir">' + windDirOttawa + '</span><br/> cloud coverage:  ' + cloudCoverageOttawa + '%<br/> sunset:  ' + sunsetOttawa + '</pre></p><p>(last updated at ' + timeRelatedFunctions.timeStampItem('update') + ')</p>';
        document.getElementById('weatherOttawa').innerHTML = weatherOttawaText;
        console.log('temp updated!');
      }
      else console.log('temp NOT updated: request failed');
    }
  };
  }

  document.addEventListener('DOMContentLoaded', getTempOttawa, false);
  window.setInterval(function() {
    getTempOttawa();
  },1000*60*15); //(every 15 minutes)
*/


  // Function to obtain sunset time:
  function getSunset(sunset) {
    let sunsetUTC = sunset * 1000; //convert to millisecs
    let currentUTC = Date.now();
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMin = currentTime.getMinutes();
    let hoursToAdd;
    let minutesUntilSunset = Math.round((sunsetUTC - currentUTC) / 1000 / 60);
    let minsToAdd = minutesUntilSunset % 60;
    let sunsetHour;
    let sunsetMin;
    if ( minutesUntilSunset > 0 ) {
      hoursToAdd = Math.floor(minutesUntilSunset / 60);
      sunsetHour = currentHour + hoursToAdd;
      sunsetMin = currentMin + minsToAdd;
      if ( sunsetMin >= 60 ) {
        sunsetMin -= 60;
        sunsetHour += 1;
      }
    }
    else if ( minutesUntilSunset < 0 ) {
      hoursToAdd = Math.ceil(minutesUntilSunset / 60);
      sunsetHour = currentHour + hoursToAdd;
      sunsetMin = currentMin + minsToAdd;
      if ( sunsetMin < 0 ) {
        sunsetMin += 60;
        sunsetHour -= 1;
      }
    }
    else {
      sunsetHour = currentHour;
      sunsetMin = currentMin;
    }
    if ( sunsetHour > 24 ) {
      sunsetHour -= 24;
    }

    sunsetMin === 0 ? sunsetMin = '00' :
    sunsetMin < 10 ? sunsetMin = '0' + sunsetMin :
    null;

    sunsetHour > 12 ? sunsetHour -= 12 :
    null;
    return sunsetHour + ':' + sunsetMin + 'pm';
  }


  // Function to obtain wind direction value:
  function getWindDir(degrees) {
    let compassKey;
    let compassVal;
    let compassValues = {
      0: 'N',
      1: 'NNE',
      2: 'NE',
      3: 'ENE',
      4: 'E',
      5: 'ESE',
      6: 'SE',
      7: 'SSE',
      8: 'S',
      9: 'SSW',
      10: 'SW',
      11: 'WSW',
      12: 'W',
      13: 'WNW',
      14: 'NW',
      15: 'NNW',
      16: 'N'
    };
    if ( degrees ) {
      compassKey = Math.round(degrees / 22.5);
      compassVal = compassValues[compassKey];
    }
    else compassVal = '';
    return compassVal;
  }


  /**************************************
   Add a priority item at a specified time:
  **************************************/

  window.setInterval(function() {
    let x = new Date();
    let hourNow = x.getHours();
    let minNow = x.getMinutes();
    let validHours = [23];
    let validMinutes = [0, 5, 10, 15];
    hourNow >= 18 && ( minNow === 0 || minNow === 30 ) ? addPriorityItem(1) :
    hourNow === 19 && minNow === 54 ? addPriorityItem(2) :
    hourNow === 19 && minNow === 55 ? addPriorityItem(3) :
    hourNow === 22 && minNow === 15 ? addPriorityItem(4) :
    validHours.includes(hourNow) && validMinutes.includes(minNow) ? addPriorityItem(5) :
    null;
  }, 1000*60); //(checks every minute)

  function addPriorityItem(number) {
    let scheduledItem;
    let color;
    if ( number === 2 ) {
      color = 3;
    } else color = 2;
    let commonText = '<br/> ----> (scheduled item)';
    number === 1 ? scheduledItem =
    'GET UP & TAKE A BREAK!' + commonText :
    number === 2 ? scheduledItem =
    'CHECK CAR COUNT!' + commonText :
    number === 3 ? scheduledItem =
    'CLOSE OFFICE & MONERIS TERMINAL!' + commonText :
    number === 4 ? scheduledItem =
    'REVIEW UNREAD EMAILS!' + commonText :
    number === 5 ? scheduledItem =
    'GO HOME!' + commonText :
    null;
    addingItem({priority: 1, scheduledItem: scheduledItem, itemColor: color});
  }


  /**************************************
   Change text of buttton using mediaQuery:
  **************************************/

  var mediaQueryList = window.matchMedia('(max-width: 430px)');

  function shortenButtonText() {
    if ( mediaQueryList.matches ) {
      document.getElementById('toDoItem1').textContent = 'add';
    }
    else document.getElementById('toDoItem1').textContent = 'add to list';
  }
  mediaQueryList.addListener(shortenButtonText);


  /**************************************
   Change Time Stamp if older than today:
   *************************************/

  function timeStampChange() {
    let timeStamp = document.getElementsByClassName('timeStamp');
    let now = new Date();
    let beginningOfYear = new Date(2016,11,31);
    const daysCalc = 1000 * 60 * 60 * 24;
    const hoursCalc = 1000 * 60 * 60;
    var dayOfYear = Math.floor(( now - beginningOfYear ) / daysCalc);
    var test = new RegExp(/(\d+)$/g);
    for ( let i = 0; i < timeStamp.length; i++ ) {
      var daysAgo = dayOfYear - Number(timeStamp[i].id.match(test));
      if ( daysAgo === 1 ) {
        timeStamp[i].textContent = `yesterday`;
      }
      else if ( daysAgo > 1 ) {
        timeStamp[i].textContent = `${daysAgo} days ago `;
      }
    }
  }


  /**************************************
   Module order testing
  *************************************/

  function iAmAfterModule () {
    console.log("Module order testing success!")
  }

// })(); // end of module

/**************************************
***************************************
**  Copyright (C) 2017
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
**    DATE:  September 2017
**
***************************************
**************************************/
