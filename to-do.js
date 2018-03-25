/**************************************
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

// To Do Vue.js Project module:
// (depends on the timeRelatedFunctions module)

// var toDoVueProject = (function() {

  // const cachedDOM = {};
  //
  // function cacheDOM() {
  //   cachedDOM.colorPicker = document.getElementById('pickColor');
  //   cachedDOM.restoreId = document.getElementById('restore');
  //   cachedDOM.clearId = document.getElementById('clear');
  // }
  //
  // cacheDOM();

  // const restoreId = document.getElementById('restore');
  //const clearId = document.getElementById('clear');
  // var colorPicker = document.getElementById('pickColor');


  /*****************************************
   Composing with Vue Components
   (session-time custom)
  *****************************************/

  Vue.component('session-time', {
    //props: ['alpha'],
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

  /*var navInstance = new Vue({
    el: '#nav',
    data: {
      timeStampDynamicCSS: false,
      navDynamicCSS: false,
      buttonDynamicCSS: false
    }
  });
  */

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

  /*
  var data2 = {};
  var footerScroll = new Vue({
    el: '#footerScroll',
    data: data2,
    computed: {
      footerScroll: function() {
        return this.temp;
      }
    }
  });
  */


  /************************************
   TO DO LIST
   (Vue.js component and instance):
  ************************************/

  // THIS DOES NOT WORK:
  Vue.component('todo-item', {
    //props: ['todo.text'],
    template: '<li></li>',
    data: function() {
      return {
        item0: 'learn Vue.js', //not working
        item1: 'learn MongoDB',
        item2: 'learn Kung Fu',
        delta: ''
      }
    /*data: function() {
      return {toDoList: [
        { id: 0, text: '<button type="button" class="del" onclick="deleteItem(0)" style="text-align: right;">x</button>learn Vue.js' },
        { id: 1, text: '<button type="button" class="del" onclick="deleteItem(1)">x</button>learn MongoDB' },
        { id: 2, text: '<button type="button" class="del" onclick="deleteItem(2)">x</button>learn Kung Fu' }
        ]
      };
    }*/
    },
    mounted() {
      resetButtonColors();
      addjQueryHighlightMagic();
      addjQueryCheckboxMagic();
      disableButton(document.getElementById('restore'));
      disableButton(document.getElementById('clear'));
      timeStampChange();
    } /*,
    methods: {
      timeStampItemMethod: function() {
        this.delta = timeStampItem();
      }
    } */
  });

  // THIS DOES WORK FINE:
  var toDoInstance = new Vue({
    el: '#toDoInstance',
    data: {
      //textitem0: 'learn Vue.js',
      //textitem1: 'learn MongoDB',
      //textitem2: 'learn Kung Fu',
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
      itemCounter: 2,
      cachedDOM: {
        colorPicker: document.getElementById('pickColor'),
        restoreId: document.getElementById('restore'),
        clearId: document.getElementById('clear')
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

  /* END OF VUE.JS MODULES ****************/


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

  // Check if there is a stored item in localStorage & set the itemCounter accordingly:
  // var lastStoredId = localStorage.getItem('lastStoredKey');
  // if ( lastStoredId ) {
  //   var lastStoredIdNumber = idNumberIsolator(lastStoredId);
  //   var itemCounter = lastStoredIdNumber + 1;
  // }
  // else var itemCounter = 3;

  // var itemCounter = 3;

  // Check if there is a stored item in FirebaseRD & set the itemCounter accordingly (added March 23 2018) ZZZ
  // Done directly in to-do_firebase.js file
  // firebaseToDoModule.setLastIdNum()

  // Action when item is added:
  document.getElementById('toDoItem1').addEventListener('click', addingItem.bind(null, 2), false);
  document.getElementById('toDoItem2').addEventListener('click', addingItem.bind(null, 1), false);

  function addingItem(priority, scheduledItem, itemColor) {
    var y = toDoInstance.itemCounter + 1;
    console.log(y);
    var textToAdd = function() {
      if ( typeof scheduledItem === 'string' ) {
        return scheduledItem;
      }
      else return addToList.value;
    }
    var buttonStyle = 'style="background-color: ' + toDoInstance.cachedDOM.colorPicker.value + ';"';
    var newItem = '<span id="item' + y + '" contenteditable="true" spellcheck="false" style="color:' + itemColor + ';">' +  timeRelatedFunctions.timeStampItem(y) + textToAdd() + '</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + y + '" onclick="crossOutItem(' + y + ')"/><button type="button" title="move up"' + buttonStyle + '  class="up" onclick="moveUp(' + y + ')">↑</button><button type="button" title="move to top" class="up top" ' + buttonStyle + ' onclick="moveToTop(' + y + ')">↑↑</button><button type="button" title="move down" class="down" ' + buttonStyle + ' onclick="moveDown(' + y + ')">↓</button><button type="button" title="move to bottom" class="down bottom" ' + buttonStyle + 'onclick="moveToBottom(' + y + ')">↓↓</button><button type="button" title="delete" class="del" ' + buttonStyle + ' onclick="deleteItem(' + y + ')">x</button></span>';
    console.log('addToList.value:  ' + addToList.value);
    var newObj = { id: y, text: newItem, textOnly: textToAdd() };
    var scheduledItemTest;
    /*typeof scheduledItem != "object" ? scheduledItemTest === true : scheduledItemTest === false; //test to reject empty items, otherwise "[Object MouseEvent] was being added to the list"
    if ( addToList.value || scheduledItemTest ) { */

    if ( priority === 1 ) {
      toDoInstance.toDoList.unshift(newObj);
    }
    if ( priority === 2 ) {
      toDoInstance.toDoList.push(newObj);
    }

    addToList.value = '';

    toDoInstance.itemCounter++;

    // Store items in localStorage:
    var store = 'savedListItem' + y;
    localStorage.setItem(store, JSON.stringify(newObj));

    // Keep track of last saved item in localStorage:
    localStorage.setItem('lastStoredKey', store);

    // Keep track of last saved item in FirebaseRD: ZZZ
    firebaseToDoModule.refLastStoredIdNum.set(y);

    // Store item in Firebase Realtime Database
    // (added March 17 2018) ZZZ
    firebaseToDoModule.addToFirebaseRD(store, JSON.stringify(newObj));

    //  Wait until Vue.js has finished updating the DOM after a data change. Here I'm simply adding a title to the latest entry. It will be removed on page refresh because it is not saved in localStorage:
    Vue.nextTick(function() {
      let element = document.getElementById("item" + y);
      element.setAttribute('title', 'id: item ' + y);
    });

    addjQueryCheckboxMagic();
    addjQueryHighlightMagic();
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
      return item.id === id;  // WTF?
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
    localStorage.removeItem(store);
    /* try using this?  toDoInstance.toDoList.$remove(itemObj);
    */

    // Remove item from Firebase Realtime Database
    // (added March 22 2018) ZZZ
    firebaseToDoModule.deleteFromFirebaseRD(store);
  }


  /************************************
   Move items up & down the list:
  ************************************/

  function moveUp(id) {
    let asdf = itemObjectById(id);
    let itemObj = toDoInstance.toDoList.find(asdf);
    let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
    if ( indexOfItemObj === 0 ) {
      window.alert('cannot be moved up any higher');
    }
    else {
    toDoInstance.toDoList.splice(indexOfItemObj,1);
    let newIndexOfObject = indexOfItemObj - 1;
    toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
    }
  }

  function moveDown(id) {
    let asdf = itemObjectById(id);
    let itemObj = toDoInstance.toDoList.find(asdf);
    let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
    let lastIndex = toDoInstance.toDoList.length - 1;
    if ( indexOfItemObj == lastIndex ) {
      window.alert('cannot be moved down any lower');
    }
    else {
    toDoInstance.toDoList.splice(indexOfItemObj,1);
    let newIndexOfObject = indexOfItemObj + 1;
    toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
    }
  }


  /************************************
   Move items to top & bottom of the list:
  ************************************/

  function moveToTop(id) {
    let asdf = itemObjectById(id);
    let itemObj = toDoInstance.toDoList.find(asdf);
    let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
    if ( indexOfItemObj === 0 ) {
      window.alert('already at the top');
    }
    else {
    toDoInstance.toDoList.splice(indexOfItemObj,1);
    let newIndexOfObject = 0;
    toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
    }
  }

  function moveToBottom(id) {
    let asdf = itemObjectById(id);
    let itemObj = toDoInstance.toDoList.find(asdf);
    let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
    var lastIndex = toDoInstance.toDoList.length - 1;
    if ( indexOfItemObj == lastIndex ) {
      window.alert('already at the bottom');
    }
    else {
    toDoInstance.toDoList.splice(indexOfItemObj,1);
    let newIndexOfObject = lastIndex;
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
    else document.getElementById('item' + id).style.cssText = 'text-decoration: none; color: #ddd;';
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
        localStorage.setItem(store, JSON.stringify(newObj));
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
    addjQueryHighlightMagic(); //re-applies to restored
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
        $('#toDoItem1').click();
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
  //var colorPicker = document.getElementById('pickColor');
  toDoInstance.cachedDOM.colorPicker.addEventListener('change', changeTheme);

  function changeTheme() {
    document.querySelector('nav').style.color = toDoInstance.cachedDOM.colorPicker.value;  //'#707ac0;';
    let button = document.getElementsByTagName('button');
    let restoreId = document.getElementById('restore');
    let clearId = document.getElementById('clear');
    for ( let i = 0; i < button.length; i++ ) {
      button[i].style.backgroundColor = toDoInstance.cachedDOM.colorPicker.value;
    }
    document.getElementById('color-picker-wrapper').style.backgroundColor = toDoInstance.cachedDOM.colorPicker.value;
    let timeStamp = document.getElementsByClassName('timeStamp');
    for ( let i = 0; i < timeStamp.length; i++ ) {
      timeStamp[i].style.color = toDoInstance.cachedDOM.colorPicker.value;
    }
    document.getElementById('logo1-color').style.fill = toDoInstance.cachedDOM.colorPicker.value;
    //Save theme color:
    localStorage.setItem('storedThemeColor', toDoInstance.cachedDOM.colorPicker.value);
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
    var storedThemeColor = localStorage.getItem('storedThemeColor');
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

  // if ( localStorage.length > 0 ) {
  //   document.addEventListener('DOMContentLoaded',function() {
  //     for ( let i = 3; i <= lastStoredIdNumber; i++ ) {
  //       var storedObj = localStorage.getItem('savedListItem' + i);
  //       if ( storedObj ) {
  //         var retrievedObj = JSON.parse(storedObj);
  //         toDoInstance.toDoList.push(retrievedObj);
  //       }
  //     }
  //     toDoInstance.toDoList.splice(0,3); //removes instructions
  //   });
  // }

  document.getElementById('logo1').addEventListener('click', function() {
    var clearOnlyIfConfirmed = window.confirm('Ok to clear local storage? Beware, this will clear local memory; you will lose all added items on page reload.');
    if ( clearOnlyIfConfirmed ) {
      localStorage.clear();
    }
  });

  // Retrieve Firebase Realtime Database
  // items on page reload:
  // (added March 23 2018) ZZZ

  // Done directly from gotDataItems(dataSnapshot) in to-do_firebase.js file
  // document.addEventListener('DOMContentLoaded',function() {
  //   firebaseToDoModule.retrieveFromFirebaseRD();
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
          $(this).css({'color': 'yellow', 'font-weight': 'bold'});
          event.preventDefault();
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
      var textOnlyA = a.textOnly.toUpperCase(); // ignore upper and lowercase
      var textOnlyB = b.textOnly.toUpperCase(); // ignore upper and lowercase
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
    var x = new Date();
    var hourNow = x.getHours();
    var minNow = x.getMinutes();
    //var secNow = x.getSeconds();
    hourNow >= 18 && ( minNow === 0 || minNow === 30 ) ? addPriorityItem(1) :
    hourNow === 19 && minNow === 15 ? addPriorityItem(2) :
    hourNow === 19 && minNow === 58 ? addPriorityItem(3) :
    hourNow === 22 && minNow === 15 ? addPriorityItem(4) :
    hourNow === 23 && minNow === 15 ? addPriorityItem(5) :
    null;
  },1000*60); //(checks every minute)

  function addPriorityItem(number) {
    var scheduledItem;
    var commonText = '<br/> ----> (scheduled item)';
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
    addingItem(1, scheduledItem, "red");
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
