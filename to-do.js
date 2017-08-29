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
      minutes: undefined // enter minute or undefined (0 doesn't work!!!)
    };
  },
  methods: {
    created: function() {
      this.alpha = sessionTime(this.hours,this.minutes)
    }
  },
  mounted() {
    this.interval = setInterval(this.created, 1000),
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


var welcomeInstance = new Vue({
  el: '#welcomeInstance',
  data: {
    welcomeMsg1: 'Welcome to my Vue.js testing ground!'
  }
});


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
      { id: 0, textitem0: 'Learn Vue.js', text: '<button type="button" title="delete" class="del" onclick="deleteItem(' + 0 + ')">x</button><button type="button" title="move up" class="up" onclick="moveUp(' + 0 + ')">↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 0 + ')">↓</button><input type="checkbox" title="done" class="crossout" id="checkbox' + 0 + '" onclick="crossOutItem(' + 0 + ')"/><span id="item' + 0 + '" contenteditable="true" spellcheck="false">Learn Vue.js</span>' },
      { id: 1, text: '<button type="button" title="delete" class="del" onclick="deleteItem(' + 1 + ')">x</button><button type="button" title="move up" class="up" onclick="moveUp(' + 1 + ')">↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 1 + ')">↓</button><input type="checkbox" title="done" class="crossout" id="checkbox' + 1 + '" onclick="crossOutItem(' + 1 + ')"/><span id="item' + 1 + '" contenteditable="true" spellcheck="false">learn MongoDB</span>' },
      { id: 2, text: '<button type="button" title="delete" class="del" onclick="deleteItem(' + 2 + ')">x</button><button type="button" title="move up" class="up" onclick="moveUp(' + 2 + ')">↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + 2 + ')">↓</button><input type="checkbox" title="done" class="crossout" id="checkbox' + 2 + '" onclick="crossOutItem(' + 2 + ')"/><span id="item' + 2 + '" contenteditable="true" spellcheck="false">learn Kung Fu</span>' }
    ],
    project: '<p>To-Do app project (work in progress).</p>',
    anotherList: [
      { name: "tony", age: 44},
      { name: "karen", age: "also 44"},
      { name: "mia", age: 3}
    ]
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
var itemCounter = 3;
document.getElementById("toDoItem").addEventListener("click", function() {
  var y = itemCounter;
  var newItem = '<button type="button" title="delete" class="del" onclick="deleteItem(' + y + ')">x</button><button type="button" title="move up" class="up" onclick="moveUp(' + y + ')">↑</button><button type="button" title="move down" class="down" onclick="moveDown(' + y + ')">↓</button><input type="checkbox" title="done" class="crossout" id="checkbox' + y + '" onclick="crossOutItem(' + y + ')"/><span id="item' + y + '" contenteditable="true" spellcheck="false">' + addToList.value + '</span>';
  toDoInstance.toDoList.push({ id: y, text: newItem });
  addToList.value = '';
  itemCounter++;
});


/******************************************************
 Adding attribute to li elements:
 *****************************************************/
 //PAIN IN THE ASS TO MAKE IT WORK:
 //document.querySelector("li").setAttribute('contenteditable', true);


/******************************************************
 Delete items from the list:
******************************************************/

function deleteItem(id) {
  //var remove = this.text;
  function itemObjectById(item) {
    return item.id === id;
  }
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  toDoInstance.toDoList.splice(indexOfItemObj, 1);
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

// Regex Object to get checkbox by number only:
// (currently unused)
function checkboxNumberFinder(id) {
  var y = new RegExp(/\d/g);
  var word = id;
  var checkboxNumber = word.match(y).join('');
}


// Get "enter" key to click checkbox:
// XX-UNRESOLVED!
$( document ).ready(function() {  $(".crossout").on('keydown', function(event){
    if ( event.keyCode === 13 ) {
        event.preventDefault();
        alert('yo');
    }
  });
});


// Remove custom element from page:
$( document ).ready(function() {
  $("created-ago").on("click", function() {
    $(this).css({'display': 'none'})
  });
});


/******************************************************
 CUSTOM ELEMENT method 1 (named created-ago):
******************************************************/

var Custom1 = Object.create(HTMLElement.prototype);

Custom1.createdCallback = function() {
  this.innerHTML = '<div>Custom element here</div>';
};

document.registerElement("created-ago", {
  prototype: Custom1
});
