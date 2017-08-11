/*******************************
 Composing with Vue Components:
********************************
 SESSION TIME:
 ******************************/

Vue.component('session-time', {
  //props: ['alpha'],
  template: '<p>{{ alpha }}</p>',
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

var component1 = new Vue({
  el: '#component1'
});


/*******************************
 Vue Instances:
*******************************/

var instance1 = new Vue({
  el: '#instance1',
  data: {
    welcomeMsg: 'Welcome to my Vue.js testing ground!'
  },
  methods: {
    todayDate: function() {
      return "Today is " + todayDate();
    }
  }
});


/*****************************************
 TO DO LIST (component and instance):
*****************************************/

Vue.component('todo-item', {
  //props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var instance2 = new Vue({
  el: '#instance2',
  data: {
    toDoList: [
      { id: 0, text: 'learn Vue.js' },
      { id: 1, text: 'learn MongoDB' },
      { id: 2, text: 'learn Kung Fu' }
    ]
  }
});


document.getElementById("toDoItem").addEventListener("click", function() {
  var newItem = addToList.value;
  instance2.toDoList.push({ text: newItem });
  addToList.value = '';
});

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
