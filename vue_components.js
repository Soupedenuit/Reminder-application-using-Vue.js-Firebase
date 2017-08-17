/*******************************
 Composing with Vue Components:
*****************
 SESSION TIME:
*******************************/

Vue.component('session-time', {
  //props: ['alpha'],
  template: '<p v-html="alpha"></p>',
  data: function() {
    return {alpha: 'session started!'};
  },
  methods: {
    created() {
      this.alpha = sessionTime()
    }
  },
  mounted() {
    this.interval = setInterval(this.created, 1000)
  }
});

var sessionTimeComponent = new Vue({
  el: '#sessionTimeComponent'
});


/*******************************
 Vue Instances:
*******************************/

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


/*****************************************
 TO DO LIST (component and instance):
*****************************************/

// THIS DOES NOT WORK:
Vue.component('todo-item', {
  //props: ['todo.text'],
  template: '<li></li>',
  /*data: function() {
    return {toDoList: [
      { id: 0, text: '<button type="button" class="del" onclick="deleteItem(0)" style="text-align: right;">x</button>learn Vue.js' },
      { id: 1, text: '<button type="button" class="del" onclick="deleteItem(1)">x</button>learn MongoDB' },
      { id: 2, text: '<button type="button" class="del" onclick="deleteItem(2)">x</button>learn Kung Fu' }
      ]
    };
  }*/
});

// THIS DOES WORK FINE:
var toDoInstance = new Vue({
  el: '#toDoInstance',
  data: {
    temp_1: '<button type="button" class="del" onclick="deleteItem(0)" style="text-align: right;">x</button>',
    temp_2: '<input type="checkbox" class="crossout" id="checkbox' + 0 + '" />',
    toDoList: [
      { id: 0, text: '<button type="button" class="del" onclick="deleteItem(0)" style="text-align: right;">x</button>learn Vue.js<input type="checkbox" class="crossout" id="checkbox' + 0 + '" onclick="crossOutItem(' + 0 + ')"/>' },
      { id: 1, text: '<button type="button" class="del" onclick="deleteItem(1)">x</button>learn MongoDB<input type="checkbox" class="crossout" id="checkbox' + 1 + '" onclick="crossOutItem(' + 1 + ')"/>' },
      { id: 2, text: '<button type="button" class="del" onclick="deleteItem(2)">x</button>learn Kung Fu<input type="checkbox" class="crossout" id="checkbox' + 2 + '" onclick="crossOutItem(' + 2 + ')"/>' }
    ],
    project: '<p>a To-Do app project (work in progress). Try&nbspit&nbspout!</p>'
  }
});


/*********************************************
 Adding to the list (button, item, checkbox):
**********************************************/

var itemCounter = 3;
/*
document.getElementById("toDoItem").addEventListener("click", function() {
  var y = toDoInstance.toDoList.length;
  var newItem = '<button type="button" class="del" onclick="deleteItem(' + y + ')">x</button>' + addToList.value + '<input type="checkbox" class="crossout" id="checkbox' + y + '" onclick="crossOutItem(' + y + ')"/>';
  toDoInstance.toDoList.push({ id: y, text: newItem });
  addToList.value = '';
});
*/
document.getElementById("toDoItem").addEventListener("click", function() {
  var y = itemCounter;
  var newItem = '<button type="button" title="delete" class="del" onclick="deleteItem(' + y + ')">x</button>' + addToList.value + '<input type="checkbox" title="done" class="crossout" id="checkbox' + y + '" onclick="crossOutItem(' + y + ')"/>';
  toDoInstance.toDoList.push({ id: y, text: newItem });
  addToList.value = '';
  itemCounter++;
});



function deleteItem(id) {
  //var remove = this.text;
  function itemObjectById(idNum) {
    return idNum.id === id;
  }
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  console.log(itemObj);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  var removeObj = indexOfItemObj;
  //window.alert("removing item with id " + id);
  toDoInstance.toDoList.splice(removeObj, 1);
}


/****************************
 Crossing out list items:
****************************/
/*
function crossOutItem(id) {
  function itemObjectById(idNum) {
    return idNum.id === id;
  }
  itemObj = toDoInstance.toDoList.find(itemObjectById);
  indexOfItemObj = toDoInstance.toDoList.indexOf(itemObj);
  var crossOutItemObj = indexOfItemObj;
  document.getElementById("y").style.cssText = "text-decoration: line-through; color: red;";
}


function crossOutItem(listItem) {
var x = toDoInstance.toDoList.text
  var x = document.querySelectorAll("li")[listItem];
  x.style.cssText = "text-decoration: line-through; color: red;";
}
*/

function crossOutItem(id) {
  var checkbox = document.getElementById('checkbox' + id);
  if ( checkbox.checked ) {
    checkbox.parentNode.style.cssText = "text-decoration: line-through; color: green;";
  }
  else checkbox.parentNode.style.cssText = "text-decoration: none; color: #CCC;";
}


/*
document.getElementById("addToList").addEventListener("keydown", function(event) {
  if ( event.keycode === 13 ) {
    event.preventDefault();
    document.getElementById("toDoItem").click();
  }
});
*/

// Prevent "enter" key from refreshing page (input field):
$( document ).ready(function() { $("#addToList").keydown(function(event){
    if ( event.keyCode === 13 ) {
        event.preventDefault();
        $("#toDoItem").click();
    }
});
});


// Regex Object to get checkbox by number only:
function checkboxNumberFinder(id) {
  var y = new RegExp(/\d/g);
  var word = id;
  var checkboxNumber = word.match(y).join('');
}

// Get "enter" key to click checkbox:
$( document ).ready(function() {  $(".crossout").on('keydown', function(event){
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


/**********************************************
 CUSTOM ELEMENT method 1 (named created-ago):
**********************************************/

var Custom1 = Object.create(HTMLElement.prototype);

Custom1.createdCallback = function() {
  this.innerHTML = '<div>Custom element here</div>';
};

document.registerElement("created-ago", {
  prototype: Custom1
});
