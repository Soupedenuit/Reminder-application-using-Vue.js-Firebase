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
})


/*****************************************
 TO DO LIST (component and instance):
*****************************************/

Vue.component('todo-item', {
  //props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var toDoInstance = new Vue({
  el: '#toDoInstance',
  data: {
    toDoList: [
      { id: 0, text: '<button type="button" class="del" onclick="deleteItem(0)" style="text-align: right;">x</button>learn Vue.js' },
      { id: 1, text: '<button type="button" class="del" onclick="deleteItem(1)">x</button>learn MongoDB' },
      { id: 2, text: '<button type="button" class="del" onclick="deleteItem(2)">x</button>learn Kung Fu' }
    ],
    project: '<p>a To-Do app project (work in progress). Try&nbspit&nbspout!</p>'
  }
});


/*******************************
 Functions to delete items:
*******************************/

document.getElementById("toDoItem").addEventListener("click", function() {
  var y = toDoInstance.toDoList.length;
  /*
  var newItem = addToList.value + '<input type="image" src="del_button.png" class="del" onclick="deleteItem(' + y + ')">del: ' + y + ' />';
  */
  var newItem = '<button type="button" class="del" onclick="deleteItem(' + y + ')">x</button>' + addToList.value;
  toDoInstance.toDoList.push({ id: y, text: newItem });
  addToList.value = '';
});

function deleteItem(id) {
  //var remove = this.text;
  function findById(idNum) {
    return idNum.id === id;
  }

  foundObj = toDoInstance.toDoList.find(findById);
  indexOfFoundObj = toDoInstance.toDoList.indexOf(foundObj);
  var remove = indexOfFoundObj;
  //window.alert("removing item with id " + id);
  toDoInstance.toDoList.splice(remove, 1);
}

/*
document.getElementById("addToList").addEventListener("keydown", function(event) {
  if ( event.keycode === 13 ) {
    event.preventDefault();
    document.getElementById("toDoItem").click();
  }
});
*/

$("#addToList").keydown(function(event){
    if ( event.keyCode === 13 ) {
        event.preventDefault();
        $("#toDoItem").click();
    }
});
