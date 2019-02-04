// Initialize Firebase
var config = {
  apiKey: "AIzaSyDxvEKyC7YtARYD-zBcGp7UTvOrMKoWQx4",
  authDomain: "to-do-in-vue.firebaseapp.com",
  databaseURL: "https://to-do-in-vue.firebaseio.com",
  projectId: "to-do-in-vue",
  storageBucket: "to-do-in-vue.appspot.com",
  messagingSenderId: "563979381269"
};

firebase.initializeApp(config);

// Configure Realtime Database
const defaultDatabase = firebase.database();
/*
const refToDoItems = defaultDatabase.ref("to-do");
let dataAdded = {
  date: dateToString(),
  time: timeRelatedFunctions.timeStamp()
}
let result = refToDoItems.push(dataAdded);
// var newChildRef = ref.push();
// newChildRef.set('replaced-set');
refToDoItems.on('value', gotData1, errData1);

let refToDoItemsSnapshot = {};

function gotData1(dataSnapshot) {
  let obj = dataSnapshot.val();
  refToDoItemsSnapshot = dataSnapshot.val();
  // console.log(refToDoItemsSnapshot);
  // log data.val():
  // console.log('Data Object (data.val()): ', obj);
  // log result.key:
  // console.log('result.key: ', result.key);
  // retrieve time value
  let objLength = Object.keys(obj).length;
  // console.log('objLength: ', objLength);
  let lastObjKey = Object.keys(obj)[objLength-1];
  // console.log('lastObjKey: ', lastObjKey)
  let lastObjValue = Object.values(obj)[objLength-1];
  // console.log('lastObjValue: ', lastObjValue)
  let secondLastObjValue = Object.values(obj)[objLength-2];
  // console.log('secondLastObjValue: ', secondLastObjValue)
  let displayTime = secondLastObjValue.time;
  // console.log('time: ', displayTime);
}

function errData1(err) {
  console.log('Error! => ', err);
}

function dateToString() {
  let date = new Date();
  let dateString = date.toString();
  return dateString;
}

// Use to manually delete keys
function deleteKeys(start, end) {
  let objKeys = Object.keys(refToDoItemsSnapshot);
  console.log('objKeys: ', objKeys);
  let objValues = Object.values(refToDoItemsSnapshot);
  // console.log('objValues: ', objValues);
  for ( let i = start; i <= end; i++ ) {
    refToDoItems
      .child(objKeys[i])
        .remove();
  }
}
*/