﻿/******************************************************
*******************************************************
**  Copyright (C) 2017
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
**    DATE:  September 2017
**
*******************************************************
******************************************************/
//"use strict";

//Global constants:
// const restoreId = document.getElementById("restore");
// const clearId = document.getElementById("clear");

/******************************************************
 Composing with Vue Components - session-time custom:
******************************************************/

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
      this.alpha = sessionTime(this.hours,this.minutes)
    }
  },
  mounted() {
    this.interval = setInterval(this.session, 1000),
    this.beta = displayTimeOpened(this.hours,this.minutes)
  }
});

var sessionTimeComponent = new Vue({
  el: '#sessionTimeComponent'
});


/******************************************************
 Vue Instances (misc):
******************************************************/

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
      return "Today is " + todayDate();
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
      return currentTempOttawa; //"Ottawa temp:  " + this.temp + " °C";
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


/******************************************************
 TO DO LIST (Vue.js component and instance):
******************************************************/

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
    disableButton(document.getElementById("clear"));
    disableButton(document.getElementById("restore"));
    //highlightItemOnHover();
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
  },
  computed: {
    listLength: function() {
      var itemsCount = this.toDoList.length;
      if ( itemsCount === 1 ) {
        return itemsCount + " item";
      }
      else return itemsCount + " items";
    }
  }
});


/******************************************************
 Add items to the list (button, item, checkbox):
******************************************************/

/* Version 1.0
document.getElementById("toDoItem").addEventListener("click", function() {
  var y = toDoInstance.toDoList.length;
  var newItem = '<button type="button" class="del" onclick="deleteItem(' + y + ')">x</button>' + addToList.value + '<input type="checkbox" class="crossout" id="checkbox' + y + '" onclick="crossOutItem(' + y + ')"/>';
  toDoInstance.toDoList.push({ id: y, text: newItem });
  addToList.value = '';
});
*/

// Version 1.1

// Function to get item id by number only:
function idNumberIsolator(idWithLetters) {
  var y = new RegExp(/\d/g);
  var numbersOnly = idWithLetters.match(y).join('');
  var idDigitsToNumber = Number(numbersOnly)
  return idDigitsToNumber;
}

// Check if there is a stored item in localStorage
//  & set the itemCounter accordingly:
var lastStoredId = localStorage.getItem("lastStoredKey");
if ( lastStoredId ) {
  var lastStoredIdNumber = idNumberIsolator(lastStoredId);
  var itemCounter = lastStoredIdNumber + 1;
}
else var itemCounter = 3;

// Action when item is added:
document.getElementById("toDoItem1").addEventListener("click", addingItem.bind(null, 2), false);
document.getElementById("toDoItem2").addEventListener("click", addingItem.bind(null, 1), false);

/*
function addingItem2() {
  return addingItem1(1); //setting priority
}
*/

function addingItem(priority) {
  var y = itemCounter;
  var buttonStyle = 'style="background-color: ' + colorPicker.value + ';"';
  var newItem = '<span id="item' + y + '" contenteditable="true" spellcheck="false">' +  timeStampItem(y) + addToList.value + '</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + y + '" onclick="crossOutItem(' + y + ')"/><button type="button" title="move up"' + buttonStyle + '  class="up" onclick="moveUp(' + y + ')">↑</button><button type="button" title="move to top" class="up top" ' + buttonStyle + ' onclick="moveToTop(' + y + ')">↑↑</button><button type="button" title="move down" class="down" ' + buttonStyle + ' onclick="moveDown(' + y + ')">↓</button><button type="button" title="move to bottom" class="down bottom" ' + buttonStyle + 'onclick="moveToBottom(' + y + ')">↓↓</button><button type="button" title="delete" class="del" ' + buttonStyle + ' onclick="deleteItem(' + y + ')">x</button></span>';
  /* Doesn't work:
  document.getElementById("item" + y).setAttribute('title', 'just do it!');
  */
  console.log("addToList.value:  " + addToList.value);
  var newObj = { id: y, text: newItem, textOnly: addToList.value };
  if ( priority === 1 ) {
    toDoInstance.toDoList.unshift(newObj);
  }
  if ( priority === 2 ) { toDoInstance.toDoList.push(newObj);
  }
  addToList.value = '';
  itemCounter++;

  // Store items in localStorage:
  var store = "savedListItem" + y;
  localStorage.setItem(store, JSON.stringify(newObj));

  // Keep track of last saved item:
  localStorage.setItem("lastStoredKey", store);

  addjQueryCheckboxMagic();
  addjQueryHighlightMagic();
  //highlightItemOnHover();
  //addPrioritizeClick(y);

  // modify button colors according to theme:
  /*
  var colorPicker = document.getElementById("pickColor");
  for ( let i = 0; i < (document.getElementsByTagName('button').length); i++ ) {
  document.getElementsByTagName('button')[i].style.backgroundColor = colorPicker.value;  //"#707ac0;";
  }
  document.getElementById('timeStamp' + y).style.color = colorPicker.value;
  */
}


/******************************************************
 Function for finding item based on id:
******************************************************/

function itemObjectById(id) {
  return function(item) {
    return item.id === id;
  }
}


/******************************************************
 Delete items from the list:
******************************************************/

var deletedItemsCount = 0;
function deleteItem(id) {
  let restoreId = document.getElementById("restore");
  let clearId = document.getElementById("clear");
  /*function itemObjectById(item) {
    return item.id === id;
  }*/
  let asdf = itemObjectById(id);
  let itemObj = toDoInstance.toDoList.find(asdf);
  let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  toDoInstance.toDoList.splice(indexOfItemObj, 1);
  console.log("itemObj:  " + itemObj.text);
  toDoInstance.deletedList.push(itemObj);
  deletedItemsCount++;
  document.getElementById("restore").disabled = false;
  restoreId.disabled = false;
  restoreId.style.cursor = "pointer";
  restoreId.style.backgroundColor = colorPicker.value;
  clearId.disabled = false;
  clearId.style.cursor = "pointer";
  clearId.style.backgroundColor = colorPicker.value;
  if ( deletedItemsCount == 1 ) {
    document.getElementById("restore").innerHTML = "restore " + deletedItemsCount + " deleted item";
  }
  else document.getElementById("restore").innerHTML = "restore " + deletedItemsCount + " deleted items";
  var x = "savedListItem" + id;
  localStorage.removeItem(x);
  /* try using this?  toDoInstance.toDoList.$remove(itemObj);
  */
}


/******************************************************
 Move items up & down the list:
******************************************************/

function moveUp(id) {
  //var remove = this.text;
  /*function itemObjectById(item) {
    return item.id === id;
  }*/
  let asdf = itemObjectById(id);
  let itemObj = toDoInstance.toDoList.find(asdf);
  let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  if ( indexOfItemObj == 0 ) {
    window.alert("cannot be moved up any higher");
  }
  else {
  toDoInstance.toDoList.splice(indexOfItemObj,1);
  let newIndexOfObject = indexOfItemObj - 1;
  toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
  }
}

function moveDown(id) {
  //var remove = this.text;
  /*function asdf(item) {
    return item.id === id;
  }*/
  let asdf = itemObjectById(id);
  let itemObj = toDoInstance.toDoList.find(asdf);
  let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  let lastIndex = toDoInstance.toDoList.length - 1;
  if ( indexOfItemObj == lastIndex ) {
    window.alert("cannot be moved down any lower");
  }
  else {
  toDoInstance.toDoList.splice(indexOfItemObj,1);
  let newIndexOfObject = indexOfItemObj + 1;
  toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
  }
}


/******************************************************
 Move items to top & bottom of the list:
******************************************************/

function moveToTop(id) {
  //var remove = this.text;
  /*function itemObjectById(item) {
    return item.id === id;
  }*/
  let asdf = itemObjectById(id);
  let itemObj = toDoInstance.toDoList.find(asdf);
  let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  if ( indexOfItemObj == 0 ) {
    window.alert("already at the top");
  }
  else {
  toDoInstance.toDoList.splice(indexOfItemObj,1);
  let newIndexOfObject = 0;
  toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
  }
}

function moveToBottom(id) {
  //var remove = this.text;
  /*function itemObjectById(item) {
    return item.id === id;
  }*/
  let asdf = itemObjectById(id);
  let itemObj = toDoInstance.toDoList.find(asdf);
  let indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  var lastIndex = toDoInstance.toDoList.length - 1;
  if ( indexOfItemObj == lastIndex ) {
    window.alert("already at the bottom");
  }
  else {
  toDoInstance.toDoList.splice(indexOfItemObj,1);
  let newIndexOfObject = lastIndex;
  toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
  }
}


/******************************************************
 Cross out items on the list:
******************************************************/
/* Version 1.0
function crossOutItem(id) {
  function itemObjectById(idNum) {
    return idNum.id === id;
  }
  var itemObj = toDoInstance.toDoList.find(itemObjectById);
  var indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  var crossOutItemObj = indexOfItemObj;
  document.getElementById("y").style.cssText = "text-decoration: line-through; color: red;";
}
*/

/* Version 1.1
function crossOutItem(listItem) {
var x = toDoInstance.toDoList.text
  var x = document.querySelectorAll("li")[listItem];
  x.style.cssText = "text-decoration: line-through; color: red;";
}
*/

/* Version 1.2
function crossOutItem(id) {
  var checkbox = document.getElementById('checkbox' + id);
  if ( checkbox.checked ) {
    checkbox.parentNode.style.cssText = "text-decoration: line-through; color: green;";
  }
  else checkbox.parentNode.style.cssText = "text-decoration: none; color: #CCC;";
}
*/

// Version 1.3
function crossOutItem(id) {
  var checkbox = document.getElementById('checkbox' + id);
  if ( checkbox.checked ) {
    document.getElementById('item' + id).style.cssText = "text-decoration: line-through; color: #555;";
  }
  else document.getElementById('item' + id).style.cssText = "text-decoration: none; color: #bbb;";
}


/******************************************************
 Restore deleted items:
******************************************************/

document.getElementById("restore").addEventListener("click", function() {
  var deletedListLength = toDoInstance.deletedList.length;
  if ( deletedListLength > 0 ) {
    toDoInstance.deletedList.forEach(function(newObj) {
      toDoInstance.toDoList.push(newObj);
      //Restore items in localStorage:
      var store = "savedListItem" + newObj.id;
      localStorage.setItem(store, JSON.stringify(newObj));
    });
  }
  toDoInstance.deletedList = [];
  deletedItemsCount = 0;
  //disableButton(clearId);
  //disableButton(restoreId);
  addjQueryHighlightMagic();
  addjQueryCheckboxMagic();
  let restoreId = document.getElementById("restore");
  if ( deletedListLength == 1 ) {
    restoreId.innerHTML = "the deleted item was restored";
  }
  else if ( deletedListLength > 1 ) {
    restoreId.innerHTML = "all deleted items were restored";
  }
  else restoreId.innerHTML = "0 items to restore";
});

/*
var x = "savedListItem" + id;
localStorage.removeItem(x);
*/

function disableButton(target) {
  var deletedListLength = toDoInstance.deletedList.length;
  if ( deletedListLength === 0 ) {
    target.style.backgroundColor = "#777";
    target.disabled = true;
    target.style.cursor = "default";
  }
}

/******************************************************
 Clear deleted items:
******************************************************/

document.getElementById("clear").addEventListener("click", function() {
  var deletedListLength = toDoInstance.deletedList.length;
  let restoreId = document.getElementById("restore");
  let clearId = document.getElementById("clear");
  if ( deletedListLength > 0 ) {
    toDoInstance.deletedList = [];
    deletedItemsCount = 0;
    disableButton(restoreId);
    disableButton(clearId);
  }
  restoreId.innerHTML = "0 items to restore";
});


/******************************************************
 Make "enter" key in input field work by preventing
 it from refreshing page & instead making it click
 "add to list" button:
******************************************************/

/*Version 1.0
document.getElementById("addToList").addEventListener("keydown", function(event) {
  if ( event.keycode === 13 ) {
    document.getElementById("toDoItem").click();
    event.preventDefault();
  }
});
*/

// Version 1.1
$( document ).ready(function() { $("#addToList").on('keydown', function(event){
    if ( event.keyCode === 13 ) {
      $("#toDoItem1").click();
      event.preventDefault();
    }
});
});


/******************************************************
 Make "enter" key work on all checkboxes:
******************************************************/

function addjQueryCheckboxMagic() {
  $( document ).ready(function() {  $("input[type=checkbox]").on('keypress', function(event){
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


/******************************************************
 Change theme (button colors, text of h1 and p):
******************************************************/

// Change colours using the color picker:
var colorPicker = document.getElementById('pickColor');
colorPicker.addEventListener("change", changeTheme);

function changeTheme() {
  document.querySelector('nav').style.color = colorPicker.value;  //"#707ac0;";
  let button = document.getElementsByTagName('button');
  for ( let i = 0; i < button.length; i++ ) {
    button[i].style.backgroundColor = colorPicker.value;
  }
  document.getElementById('color-picker-wrapper').style.backgroundColor = colorPicker.value;
  let timeStamp = document.getElementsByClassName('timeStamp');
  for ( let i = 0; i < timeStamp.length; i++ ) {
    timeStamp[i].style.color = colorPicker.value;
  }
  document.getElementById('logo1-color').style.fill = colorPicker.value;
  //Save theme color:
  localStorage.setItem('storedThemeColor', colorPicker.value);
  disableButton(document.getElementById("clear"));
  disableButton(document.getElementById("restore"));
}

// NAC theme:
document.getElementById("NAC-theme").addEventListener("click", function() {
  document.getElementById("pickColor").value = "#707ac0";
  welcomeInstance.welcomeMsg1 = "Today will be awesome!";
  var h1 = document.querySelector('h1');
  h1.innerHTML = "h1 Text Changed on click";
  h1.style.fontSize = "1.8em";
  h1.style.marginTop = "10px";
  changeTheme();
});

// Reset all buttons to default color at page reload:
function resetButtonColors() {
  const button = document.getElementsByTagName('button');
  for ( let i = 0; i < button.length; i++ ) {
    button[i].style.backgroundColor = colorPicker.value;
  }
  const timeStamp = document.getElementsByClassName('timeStamp');
  for ( let i = 0; i < timeStamp.length; i++ ) {
    timeStamp[i].style.color = colorPicker.value;
  }
}

// Detect saved theme color on page reload:
function loadSavedThemeColor() {
  var storedThemeColor = localStorage.getItem('storedThemeColor');
  if ( storedThemeColor ) {
    colorPicker.value = storedThemeColor;
  }
  changeTheme();
}

document.addEventListener('DOMContentLoaded',loadSavedThemeColor);


/******************************************************
 Retrieve localStorage items on page reload:
******************************************************/

if ( localStorage.length > 0 ) {
  document.addEventListener('DOMContentLoaded',function() {
    for ( let i = 3; i <= lastStoredIdNumber; i++ ) {
      var storedObj = localStorage.getItem('savedListItem' + i);
      if ( storedObj ) {
        var retrievedObj = JSON.parse(storedObj);
        toDoInstance.toDoList.push(retrievedObj);
      }
    }
    toDoInstance.toDoList.splice(0,3); //remove instructions
  });
}

document.getElementById("logo1").addEventListener("click", function() {
  var clearOnlyIfConfirmed = window.confirm("Ok to clear local storage? (this will clear local memory; you will lose all added items on tab reload)");
  if ( clearOnlyIfConfirmed ) {
    localStorage.clear();
  }
});


/******************************************************
 Time Stamp function:
******************************************************/

function timeStampItem(id, hh, mm) {
  let getTime = new Date();
  var hours;
  var minutes;
  var am_pm;
  if ( hh || hh === 0 ) {
    hours = hh;
  }
  else hours = getTime.getHours();
  if ( mm || mm === 0 ) {
    minutes = mm;
  }
  else minutes = getTime.getMinutes();
  minutes === 0 ? minutes = "00" :
  minutes < 10 ? minutes = "0" + minutes :
  null;
  hours === 0 ? (hours = 12, am_pm = "am") :
  hours < 12 ? (am_pm = "am") :
  hours === 12 ? (am_pm = "pm") :
  hours > 12 ? (hours -= 12, am_pm = "pm"):
  null;
  var buttonStyle = 'style="background-color: ' + colorPicker.value + ';"';
  var timeOpened = `<div class="timeStamp" id="timeStamp${id}" style="color:${colorPicker.value}">${hours}:${minutes}${am_pm}&nbsp&nbsp&nbsp&nbsp </div>`;
  return timeOpened;
}


/******************************************************
 Highlight targeted items:
******************************************************/

/*
function prioritizeItem(y) {
  document.getElementById('item' + y).style.color = "yellow";
}

function addPrioritizeClick(y) {
  document.getElementById('item' + y).addEventListener('mousedown', function(event) {
    if ( event.which === 3 ) {
      prioritizeItem(y);
      event.preventDefault();
    }
  });
}
*/

//Using jQuery:
function addjQueryHighlightMagic() {
  $( document ).ready(function() {
    $("li span:first-child").on('mousedown', function(event) {
      if ( event.which === 3 ) {
        $(this).css({'color': 'yellow', 'font-weight': 'bold'});
        event.preventDefault();
      }
    });
  });
  $( document ).ready(function() {
    $("li span:first-child").on('mouseup', function(event) {
      if ( event.which === 3 ) {
        event.preventDefault();
      }
    });
  });
}

/*
function addjQueryHighlightMagic() {
  $( document ).ready(function() {
    $('li span:first-child').on('mousedown', function() {
      $(this).on('keydown', function(event) {
        if ( event.which === 13 ) {
          $(this).toggleClass('active'); // adds class active
          event.preventDefault();
        }
      });
    });
  });
}
*/

//Not currently used:
function highlightItemOnHover() {
  $( document ).ready(function() {
    $('li span:first-child').hover(function() {
      $(this).toggleClass('active');
    });
  });
  $( document ).on('keydown', function(event) {
    if ( event.which === 13 ) {
      $('.active').css({'color':'yellow'}); // if hovered then it has class active
      event.preventDefault();
    }
  });
}

// Mounted to the Vue Component instead:
/*
document.addEventListener('DOMContentLoaded', addjQueryRightClickMagic());
*/


/******************************************************
 Sort items (alphabetically):
******************************************************/

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


/******************************************************
 Sort items (reset to order in which they were added):
******************************************************/

document.getElementById('sort-reset').addEventListener('click', function() {
  toDoInstance.toDoList.sort(function(a, b) {
    return a.id - b.id;
  });
});


/******************************************************
  Weather Ajax call:
******************************************************/

function getTempOttawa() {
httpRequest = new XMLHttpRequest();
httpRequest.open("GET",'http://api.openweathermap.org/data/2.5/weather?lat=45.4112&lon=-75.6982&APPID=ab28334e82ce5a2e6cc588a7a65c397b',true);
httpRequest.send(null);
httpRequest.onreadystatechange = function() {
  if (httpRequest.readyState === httpRequest.DONE) {
    if (httpRequest.status === 200) {
      var json = JSON.parse(httpRequest.responseText);
      var kelvinDegreesOttawa = json.main.temp;
      var celciusDegreesOttawa = Math.round(kelvinDegreesOttawa - 273);
      currentTempOttawa = celciusDegreesOttawa;
      var humidityOttawa = json.main.humidity;
      var windOttawa = Math.round(json.wind.speed * 60 * 60 / 1000);
      var windDirOttawa = getWindDir(json.wind.deg);
      console.log("windDirOttawa (degrees): " + json.wind.deg);
      var cloudCoverageOttawa = json.clouds.all;
      var sunsetOttawa = getSunset(json.sys.sunset);
      document.getElementById('tempOttawa').innerHTML = "Ottawa temp:  " + celciusDegreesOttawa + " °C";
      var weatherOttawaText = "<p><ins>Ottawa weather:</ins><br/><pre> temperature:  " + celciusDegreesOttawa + " °C<br/> humidity:  " + humidityOttawa + " %<br/> wind:  " + windOttawa + " km/hr <span id='windDir'>" + windDirOttawa + "</span><br/> cloud coverage:  " + cloudCoverageOttawa + "%<br/> sunset:  " + sunsetOttawa + "</pre></p>";
      document.getElementById('weatherOttawa').innerHTML = weatherOttawaText;
      console.log("temp updated!");
    }
    else console.log("temp NOT updated: request failed");
  }
}
}

document.addEventListener('DOMContentLoaded', getTempOttawa);

window.setInterval(function() {
  getTempOttawa();
  },1000*60*15); //(every 15 minutes)


// Function to obtain sunset time:
function getSunset(sunset) {
  var sunsetUTC = sunset * 1000; //convert to millisecs
  var currentUTC = Date.now();
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMin = currentTime.getMinutes();
  var hoursToAdd;
  var minutesUntilSunset = Math.round((sunsetUTC - currentUTC) / 1000 / 60);
  var minsToAdd = minutesUntilSunset % 60;
  var sunsetHour;
  var sunsetMin;
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

  sunsetMin === 0 ? sunsetMin = "00" :
  sunsetMin < 10 ? sunsetMin = "0" + sunsetMin :
  null;

  sunsetHour > 12 ? sunsetHour -= 12 :
  null;
  return sunsetHour + ":" + sunsetMin + "pm";
}


// Function to obtain wind direction value:
function getWindDir(degrees) {
  var compassValues = {
    0: "N",
    1: "NNE",
    2: "NE",
    3: "ENE",
    4: "E",
    5: "ESE",
    6: "SE",
    7: "SSE",
    8: "S",
    9: "SSW",
    10: "SW",
    11: "WSW",
    12: "W",
    13: "WNW",
    14: "NW",
    15: "NNW",
    16: "N"
  };
  if ( degrees ) {
  var compassKey = Math.round(degrees / 22.5);
  var compassVal = compassValues[compassKey];
  }
  else compassVal = '';
  return compassVal;
}


/******************************************************
 CUSTOM ELEMENT method 1 (named created-ago):
 (irrelevant to the project)
******************************************************/

/*
var Custom1 = Object.create(HTMLElement.prototype);

Custom1.createdCallback = function() {
  this.innerHTML = '<div>Custom element here</div>';
};

document.registerElement("created-ago", {
  prototype: Custom1
});

// Remove custom element from page:
$( document ).ready(function() {
  $("created-ago").on("click", function() {
    $(this).css({'display': 'none'})
  });
});
*/


/******************************************************
  Scrolling testing (irrelevant to the project):
******************************************************/

/* currently unused:
var scrollerElement1 = document.getElementById('scroller1');
var scrollerElement2 = document.getElementById('scroller2');

function scrollMe(element, method) {
  var up = true;
  var value = 50;
  var increment = 1;
  var ceiling = 500;
  var count = 2;
  function scroll() {
    if ( count > 0 ) {
      if (up === true && value <= ceiling) {
      value += increment;
      }
      if (value === ceiling) {
        up = false;
        count--;
        value -= increment;
      }
      if (up === false && value <= ceiling) {
        value -= increment;
      }
      if ( value === 50 ) {
        up = true;
        count--;
        value += increment;
      }
    }
    if ( method === 1 ) {
      element.style.left = value + "px";
      element.innerHTML = "Scroll by changing <em>left position - method 1</em> (left: " + element.getBoundingClientRect().left + "px)";
    }
    if ( method === 2 ) {
      var valueAdj = value - 50;
      element.style.transform = "translateX(" + valueAdj + "px)";
      element.innerHTML = "Scroll by using <em>transform - method 2</em> (left: " + element.getBoundingClientRect().left + "px)";
    }
  }
  window.setInterval(function() {
    scroll()
  },16);
}

scrollerElement1.addEventListener('click', function() {
   scrollMe(scrollerElement1, 1);
 });
scrollerElement2.addEventListener('click', function() {
  scrollMe(scrollerElement2, 2);
});
*/


/******************************************************
*******************************************************
**  Copyright (C) 2017
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
**    DATE:  September 2017
**
*******************************************************
******************************************************/
