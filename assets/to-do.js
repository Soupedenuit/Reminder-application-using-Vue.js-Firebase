/******************************************************
*******************************************************
**  Copyright (C) 2017
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
**    DATE:  September 2017
**
*******************************************************
******************************************************/

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
      hours: undefined, // enter hour or undefined
      minutes: undefined // enter minute or undefined
    };
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

var todayDateInstance = new Vue({
  el: '#todayDateInstance',
  data: {},
  methods: {
    todayDate: function() {
      return "Today is " + todayDate();
    }
  }
});

var data = {};
var tempOttawa = new Vue({
  el: '#tempOttawa',
  data: data,
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
      item0: 'learn Vue.js',
      item1: 'learn MongoDB',
      item2: 'learn Kung Fu'
    };
  /*data: function() {
    return {toDoList: [
      { id: 0, text: '<button type="button" class="del" onclick="deleteItem(0)" style="text-align: right;">x</button>learn Vue.js' },
      { id: 1, text: '<button type="button" class="del" onclick="deleteItem(1)">x</button>learn MongoDB' },
      { id: 2, text: '<button type="button" class="del" onclick="deleteItem(2)">x</button>learn Kung Fu' }
      ]
    };
  }*/
  }
});

// THIS DOES WORK FINE:
var toDoInstance = new Vue({
  el: '#toDoInstance',
  data: {
    //textitem0: 'learn Vue.js',
    //textitem1: 'learn MongoDB',
    //textitem2: 'learn Kung Fu',
    toDoList: [
      { id: 0, text: '<span id="item' + 0 + '" contenteditable="true" spellcheck="false">add, edit, move, delete and restore items</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + 0 + '" onclick="crossOutItem(' + 0 + ')"/><button type="button" title="move up" class="up" onclick="moveUp(' + 0 + ')">↑</button><button type="button" title="move to top" class="up top" onclick="moveToTop(' + 0 + ')">↑↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 0 + ')">↓</button><button type="button" title="move to bottom" class="down bottom" onclick="moveToBottom(' + 0 + ')">↓↓</button><button type="button" title="delete" class="del" onclick="deleteItem(' + 0 + ')">x</button></span>' },
      { id: 1, text: '<span id="item' + 1 + '" contenteditable="true" spellcheck="false">added items will be saved in local storage (excluding restored)</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + 1 + '" onclick="crossOutItem(' + 1 + ')"/><button type="button" title="move up" class="up" onclick="moveUp(' + 1 + ')">↑</button><button type="button" title="move to top" class="up top" onclick="moveToTop(' + 1 + ')">↑↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 1 + ')">↓</button><button type="button" title="move to bottom" class="down bottom" onclick="moveToBottom(' + 1 + ')">↓↓</button><button type="button" title="delete" class="del" onclick="deleteItem(' + 1 + ')">x</button></span>' },
      { id: 2, text: '<span id="item' + 2 + '" contenteditable="true" spellcheck="false">clicking the logo on the left will clear local storage</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + 2 + '" onclick="crossOutItem(' + 2 + ')"/><button type="button" title="move up" class="up" onclick="moveUp(' + 2 + ')">↑</button><button type="button" title="move to top" class="up top" onclick="moveToTop(' + 2 + ')">↑↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 2 + ')">↓</button><button type="button" title="move to bottom" class="down bottom" onclick="moveToBottom(' + 2 + ')">↓↓</button><button type="button" title="delete" class="del" onclick="deleteItem(' + 2 + ')">x</button></span>' }
    ],
    project: '<p>To-Do app project.</p>',
    anotherList: [
      { name: "tony", age: 44},
      { name: "karen", age: "also 44"},
      { name: "mia", age: 3}
    ],
    deletedList: [],
    dynamicCSS: false
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
document.getElementById("toDoItem").addEventListener("click", function() {
  var y = itemCounter;
  var newItem = '<span id="item' + y + '" contenteditable="true" spellcheck="false">' + addToList.value + '</span><span><input type="checkbox" title="done" class="crossout" id="checkbox' + y + '" onclick="crossOutItem(' + y + ')"/><button type="button" title="move up" class="up" onclick="moveUp(' + y + ')">↑</button><button type="button" title="move to top" class="up top" onclick="moveToTop(' + y + ')">↑↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + y + ')">↓</button><button type="button" title="move to bottom" class="down bottom" onclick="moveToBottom(' + y + ')">↓↓</button><button type="button" title="delete" class="del" onclick="deleteItem(' + y + ')">x</button></span>';
  /* Doesn't work:
  document.getElementById("item" + y).setAttribute('title', 'just do it!');
  */
  var textValue = { id: y, text: newItem };
  toDoInstance.toDoList.push(textValue);
  //console.log("newItem:  " + newItem);
  addToList.value = '';
  itemCounter++;

  // Store items in localStorage:
  var x = "savedListItem" + y;
  localStorage.setItem(x, newItem);

  // Keep track of last saved item:
  localStorage.setItem("lastStoredKey", x);
});


/******************************************************
 Delete items from the list:
******************************************************/

var deletedItemsCount = 0;
function deleteItem(id) {
  //var remove = this.text;
  const restore = document.getElementById("restore");
  const clear = document.getElementById("clear");
  function itemObjectById(item) {
    return item.id === id;
  }
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  toDoInstance.toDoList.splice(indexOfItemObj, 1);
  //console.log("itemObj:  " + itemObj.text);
  toDoInstance.deletedList.push(itemObj);
  deletedItemsCount++;
  if ( deletedItemsCount == 1 ) {
    restore.innerHTML = "restore " + deletedItemsCount + " deleted item";
  }
  else restore.innerHTML = "restore " + deletedItemsCount + " deleted items";
  var x = "savedListItem" + id;
  restore.disabled = false;
  restore.style.cursor = "pointer";
  clear.disabled = false;
  clear.style.cursor = "pointer";
  localStorage.removeItem(x);
  /* try using this?  toDoInstance.toDoList.$remove(itemObj);
  */
}


/******************************************************
 Move items up & down the list:
******************************************************/

function moveUp(id) {
  //var remove = this.text;
  function itemObjectById(item) {
    return item.id === id;
  }
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  if ( indexOfItemObj == 0 ) {
    window.alert("cannot be moved up any higher");
  }
  else {
  toDoInstance.toDoList.splice(indexOfItemObj,1);
  var newIndexOfObject = indexOfItemObj - 1;
  toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
  }
}

function moveDown(id) {
  //var remove = this.text;
  function itemObjectById(item) {
    return item.id === id;
  }
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  var lastIndex = toDoInstance.toDoList.length - 1;
  if ( indexOfItemObj == lastIndex ) {
    window.alert("cannot be moved down any lower");
  }
  else {
  toDoInstance.toDoList.splice(indexOfItemObj,1);
  var newIndexOfObject = indexOfItemObj + 1;
  toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
  }
}


/******************************************************
 Move items to top & bottom of the list:
******************************************************/

function moveToTop(id) {
  //var remove = this.text;
  function itemObjectById(item) {
    return item.id === id;
  }
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  if ( indexOfItemObj == 0 ) {
    window.alert("already at the top");
  }
  else {
  toDoInstance.toDoList.splice(indexOfItemObj,1);
  var newIndexOfObject = 0;
  toDoInstance.toDoList.splice(newIndexOfObject,0,itemObj);
  }
}

function moveToBottom(id) {
  //var remove = this.text;
  function itemObjectById(item) {
    return item.id === id;
  }
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  var lastIndex = toDoInstance.toDoList.length - 1;
  if ( indexOfItemObj == lastIndex ) {
    window.alert("already at the bottom");
  }
  else {
  toDoInstance.toDoList.splice(indexOfItemObj,1);
  var newIndexOfObject = lastIndex;
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
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
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
  const restore = document.getElementById("restore");
  const clear = document.getElementById("clear");
  if ( deletedListLength > 0 ) {
    toDoInstance.deletedList.forEach(function(x) {
      toDoInstance.toDoList.push(x);
    });
  }
  toDoInstance.deletedList = [];
  deletedItemsCount = 0;
  if ( deletedListLength == 1 ) {
    restore.innerHTML = "the deleted item was restored";
    restore.disabled = true;
    clear.disabled = true;
  }
  else if ( deletedListLength > 1 ) {
    restore.innerHTML = "all deleted items were restored";
    restore.disabled = true;
    clear.disabled = true;
  }
  else restore.innerHTML = "0 items to restore";
  restore.disabled = true;
  clear.disabled = true;
  restore.style.cursor = "default";
  clear.style.cursor = "default";
});

/*
var x = "savedListItem" + id;
localStorage.removeItem(x);
*/


/******************************************************
 Clear deleted items:
******************************************************/

document.getElementById("clear").addEventListener("click", function() {
  var deletedListLength = toDoInstance.deletedList.length;
  const restore = document.getElementById("restore");
  const clear = document.getElementById("clear");
  if ( deletedListLength > 0 ) {
    toDoInstance.deletedList = [];
    deletedItemsCount = 0;
    restore.disabled = true;
    clear.disabled = true;
    restore.style.cursor = "default";
    clear.style.cursor = "default";
  }
  restore.innerHTML = "0 items to restore";
  clear.disabled = true;
  clear.style.cursor = "default";
});


/******************************************************
 Prevent "enter" key in input field from refreshing page & instead make it click "add to list" button:
******************************************************/

/*Version 1.0
document.getElementById("addToList").addEventListener("keydown", function(event) {
  if ( event.keycode === 13 ) {
    event.preventDefault();
    document.getElementById("toDoItem").click();
  }
});
*/

// Version 1.1
$( document ).ready(function() { $("#addToList").on('keydown', function(event){
    if ( event.keyCode === 13 ) {
        event.preventDefault();
        $("#toDoItem").click();
    }
});
});


/******************************************************
 Misc functions:
******************************************************/

// Get "enter" key to click checkbox:
// XX-NOT WORKING => UNRESOLVED!
$( document ).ready(function() {  $("input[type=checkbox]").on('keypress', function(event){
    if ( event.keyCode === 13 ) {
      event.preventDefault();
      $(this).click();
    }
  });
});


// Remove custom element from page:
$( document ).ready(function() {
  $("created-ago").on("click", function() {
    $(this).css({'display': 'none'})
  });
});


// Change theme (color, text of h1 and p):
document.getElementById("switch-theme").addEventListener("click", function() {
  var colorPicker = document.getElementById("pickColor");
  document.querySelector('nav').style.cssText = "color: " + colorPicker.value + ";";  //"#707ac0;";
  for ( i = 0; i < document.getElementsByTagName('button').length; i++ ) {
    document.getElementsByTagName('button')[i].style.cssText = "background-color: " + colorPicker.value + ";";  //"#707ac0;";
  }
  welcomeInstance.welcomeMsg1 = "Today will be awesome!";
  var h1 = document.querySelector('h1');
  h1.innerHTML = "NAC PARKING SERVICES";
  h1.style.fontSize = "1.8em";
  h1.style.marginTop = "10px";
  document.getElementById("logo1").src = "checkmark_NAC_colour.svg";

  // // XX-NOT WORKING => UNRESOLVED!:
  // identify my stylesheet (to-do.css):
  //var myStylesheet = document.styleSheets[0];
  // find length of my stylesheet (# of rules):
  //var numberOfStylesheetRules = myStylesheet.cssRules.length;
  // Inserts a rule at the end of my Stylesheet:
  //stylesheet.insertRule("button { background-color: #707ac0;}", numberOfStylesheetRules);
});


// Change theme using color picker:
var colorPicker = document.getElementById("pickColor");

colorPicker.addEventListener("change", function() {
  document.querySelector('nav').style.cssText = "color: " + colorPicker.value + ";";  //"#707ac0;";
  for ( i = 0; i < document.getElementsByTagName('button').length; i++ ) {
    document.getElementsByTagName('button')[i].style.cssText = "background-color: " + colorPicker.value + ";";
  }
  document.getElementById("color-picker-wrapper").style.backgroundColor = colorPicker.value;
});


/******************************************************
 CUSTOM ELEMENT method 1 (named created-ago):
******************************************************/

/*
var Custom1 = Object.create(HTMLElement.prototype);

Custom1.createdCallback = function() {
  this.innerHTML = '<div>Custom element here</div>';
};

document.registerElement("created-ago", {
  prototype: Custom1
});
*/


/******************************************************
 Retrieve localStorage items:
******************************************************/

if ( localStorage.length > 0 ) {
  document.addEventListener('DOMContentLoaded',function() {
    for ( i = 3; i <= lastStoredIdNumber; i++ ) {
      var beta = localStorage.getItem('savedListItem' + i);
      if ( beta ) {
        toDoInstance.toDoList.push({ id: i, text: beta });
      }
    }
  });
}

  document.getElementById("logo1").addEventListener("click", function() {
    localStorage.clear();
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
  }
else console.log("temp NOT updated: request failed");
}
}

document.addEventListener('DOMContentLoaded',getTempOttawa());

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
  var compassKey = Math.round(degrees / 22.5);
  var compassVal = compassValues[compassKey];
  return compassVal;
}


/******************************************************
   Footer Scroll:
******************************************************/

document.getElementById('footerScroll').addEventListener('click', function() {
  var up = true;
  var value = 51;
  var increment = 1;
  var ceiling = 1280;
  var count = 4;
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
  document.getElementById('footerScroll').style.left = value + "px";
  }
  window.setInterval(function() {
    scroll()
  },24);
});


/******************************************************
*******************************************************
**  Copyright (C) 2017
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
**    DATE:  September 2017
**
*******************************************************
******************************************************/
