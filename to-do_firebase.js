/**************************************
***************************************
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
** PROJECT:  To-Do With Vue.js
**    DATE:  Mar 2018
** VERSION:  1.01
**  Copyright (C) 2017
**
***************************************
**************************************/

var firebaseToDoModule = (function() {

  cachedDOM2 = {};

  function cacheDOM2() {
  };


  /************************************
   Realtime Database storage:
  ************************************/

  // This is the child of ref, which was defined in the firebase_config.js file:
  var refToDoItems = defaultDatabase.ref("to-do/items");
  var itemsData = {
    test_one: "item a",
    test_two: "item b"
  };
  // var pushedChild = refToDoItems.push(itemsData);
  // refToDoItems.child('lastStoredId').set('itemNum');

  refToDoItems.on('value', gotDataItems, errDataItems);

  let currentSnapshot = {};

  function gotDataItems(dataSnapshot) {
    let obj = dataSnapshot.val();
    currentSnapshot.items = dataSnapshot.val();
    console.log('snapshot exists: ', dataSnapshot.exists());
    if ( dataSnapshot.exists() ) {
      let objKeys = Object.keys(obj);
      // console.log('objKeys: ', objKeys);
      let objValues = Object.values(obj);
      // console.log('objValues: ', objValues);
      if ( objValues ) {
        objValues.forEach(function(x) {
          if ( typeof x === 'object' ) {
            let length = Object.values(x).length;
          }
          else {
          }
        });
      };
      // console.log(text);
    }
    else {
      console.log('no data');
    }
  }

  function errDataItems(dataSnapshot) {
    console.log('Error! => ', err);
  }


  refToDoItems.once('value', gotDataItemsOnce, errDataItemsOnce);

  function gotDataItemsOnce(dataSnapshot) {
    if ( dataSnapshot.exists() ) {
      retrieveFromFirebaseRD();
    }
  }

  function errDataItemsOnce(dataSnapshot) {
    console.log('Error! => ', err);
  }

  // let itemCounter;

  var refLastStoredIdNum = defaultDatabase.ref("to-do/storedIdNum");
  // refLastStoredIdNum.set(3);

  refLastStoredIdNum.once('value', gotLastStoredIdNum, errLastStoredIdNum);

  function gotLastStoredIdNum(dataSnapshot) {
    if ( dataSnapshot.exists() ) {
      let value = dataSnapshot.val();
      toDoInstance.itemCounter = value;
    }
    else {
      console.log('there is no stored Id Number');
    }
  }

  function errLastStoredIdNum(dataSnapshot) {
    console.log('Error! => ', err);
  }


  /************************************
  Public methods
  ************************************/

  function addToFirebaseRD(store, newObj) {
    // let toDoItem = {};
    // toDoItem[store] = JSON.stringify(newObj);
    refToDoItems.child(store).set(newObj)
      .then(function() {
        console.log('Synchronization succeeded');
      })
      .catch(function(error) {
        console.log('Synchronization failed');
      });
    // let newDatabaseItem = firebaseToDoModule.refToDoItems.push(firebaseData);
    // console.log(newDatabaseItem.key);
    // let element = document.getElementById("item" + y);
    // element.setAttribute('data-key', newDatabaseItem.key);
  }

  function deleteFromFirebaseRD(key) {
    refToDoItems
      .child(key)
        .remove();
  }

  function retrieveFromFirebaseRD() {
    if ( currentSnapshot.items ) {
      // let numOfItems = Object.keys(currentSnapshot.items).length;
      for ( var item in currentSnapshot.items ) {
        let storedObj = currentSnapshot.items[item];
        var retrievedObj = JSON.parse(storedObj);
        toDoInstance.toDoList.push(retrievedObj);
      }
      toDoInstance.toDoList.splice(0,3); //removes instructions
    }
  }

  // function setLastIdNum() {
  //   if ( refLastStoredIdNum ) {
  //     itemCounter = refLastStoredIdNum + 1;
  //   }
  //   else itemCounter = 3;
  //   console.log('setLastIdNum : ', refLastStoredIdNum);
  // }

  // not used in project (test only)
  function deleteKeys(start, end) {
    let objKeys = Object.keys(currentSnapshot.items);
    console.log('objKeys: ', objKeys);
    let objValues = Object.values(currentSnapshot.items);
    // console.log('objValues: ', objValues);
    for ( let i = start; i <= end; i++ ) {
      refToDoItems
        .child(objKeys[i])
          .remove();
    }
  }

  function init() {
    // renderDOM();
    // handleEvents();
    // cacheDOM();
    // bindEvents();
  }

  function testModuleOutput() {
    console.log('module output success!');
  }

  return {
    // init: init()
    refToDoItems: refToDoItems,
    addToFirebaseRD: addToFirebaseRD,
    deleteFromFirebaseRD: deleteFromFirebaseRD,
    retrieveFromFirebaseRD: retrieveFromFirebaseRD,
    refLastStoredIdNum: refLastStoredIdNum,
    deleteKeys: deleteKeys,
    testModuleOutput: testModuleOutput,
    currentSnapshot: currentSnapshot
  }


})(); // end of Module
