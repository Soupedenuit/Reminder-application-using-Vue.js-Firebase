/**************************************
 * Firebase Realtime Database
***************************************
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
** PROJECT:  To-Do With Vue.js
**    DATE:  Mar 2018
** VERSION:  1.01
**  Copyright (C) 2018
**
***************************************
**************************************/
  
const firebaseRDModule = (function() {

  // current session store to retrieve snapshot & populate toDoInstance.toDoList in to-do.js:  
  const firebaseDataStore = {
    current_uid: null,
    refToDoItemsSnapshot: {},
    refToDoItemsSnapshotReminders: {} 
  };

  // These will be the children of refToDo, and will be defined when readFirebaseRD is called on login. refToDo is defined in the to-do_firebase_config.js file upon page load:
  let refToDoItems_current; 
  let refToDoItems_reminders;
  let refToDoItems_lastStoredIdNum;
  
  // This is called on login & logout in to-do_firebase_auth.js: 
  function readFirebaseRD({uid, uidChange}) {
    console.log('log action: ' + uidChange) 
    setCurrentUid(uid)
    if ( uidChange === 'login' ) {
      setCurrentUid_Items(uid)
      setCurrentUid_Items_Reminders(uid) //ZZ
    }
    if ( uidChange === 'logout') {
      delete firebaseDataStore.refToDoItemsSnapshot.items;
      delete firebaseDataStore.refToDoItemsSnapshotReminders.items;
      refToDoItems_current = undefined; 
      refToDoItems_reminders = undefined;
      retrieveCurrentSnapshot('clear')
    }    
  }

  // called in readFirebaseRD: 
  function setCurrentUid(uid) {
    firebaseDataStore.current_uid = uid;
  }

  // called in readFirebaseRD(if 'login'): 
  function setCurrentUid_Items(uid) {
    refToDoItems_current = defaultDatabase.ref(`to-do/guests/${uid}`) || null;
    refToDoItems_current.once('value', gotCurrentDataItemsOnce, errCurrentDataItemsOnce)
    // .then(function() {
    //   retrieveCurrentSnapshot('clear')
    // })
    // .catch(function(err) {
    //   console.log(err.message)
    //   alert(err.message)
    // });      
  }
  
  // called in readFirebaseRD(if 'login'): 
  function setCurrentUid_Items_Reminders(uid) {
    refToDoItems_reminders = defaultDatabase.ref(`to-do/guests/${uid}/reminders`) || null;
    refToDoItems_reminders.once('value', gotRemindersDataItemsOnce, errRemindersDataItemsOnce)
    .then(function() {
      retrieveCurrentSnapshot('clear')
      console.log('DONE')
    })
    .catch(function(err) {
      console.log(err.message)
      alert(err.message)
    });      
  }

  function gotCurrentDataItemsOnce(dataSnapshot) {
    if ( dataSnapshot.exists() ) {
      firebaseDataStore.refToDoItemsSnapshot.items = dataSnapshot.val();
      let items = firebaseDataStore.refToDoItemsSnapshot.items;
      let items_length = Object.keys(items).length;
      console.log(`number of items: ${items_length}`)
    }
  }
  function errCurrentDataItemsOnce(err) {
    console.log('Error! => ', err)
  }

  function gotRemindersDataItemsOnce(dataSnapshot) {
    if ( dataSnapshot.exists() ) {
      firebaseDataStore.refToDoItemsSnapshotReminders.items = dataSnapshot.val();
      console.log(firebaseDataStore.refToDoItemsSnapshotReminders);
    }
  }
  function errRemindersDataItemsOnce(err) {
    console.log('Error! => ', err)
  }
  
  // Retrieve last item id number stored in Firebase
  // Called on login. Only works if auth != null; 
  function getFirebaseStoredIdNum() {
    refToDoItems_lastStoredIdNum = defaultDatabase.ref("to-do/storedIdNum") || null;
    refToDoItems_lastStoredIdNum.once('value', gotLocalStoredIdNum, errLocalStoredIdNum);
  }

  function gotLocalStoredIdNum(dataSnapshot) {
    if ( dataSnapshot.exists() ) {
      let value = dataSnapshot.val();
      console.log(`refToDoItems_lastStoredIdNumvalue: ${value}`)
      toDoInstance.itemCounter = value;
    }
    else {
      console.log('there is no stored Id Number in Firebase')
    }
  }
  function errLocalStoredIdNum(err) {
    console.log('Error! => ', err)
  }

  // For public value of refToDoItems_lastStoredIdNum, to be used in to-do.js
  function getrefToDoItems_lastStoredIdNum() {
    return refToDoItems_lastStoredIdNum;
  }

  // used in to-do.js:
  function addToFirebaseRD(store, newObj) {
    if ( refToDoItems_current ) {
      refToDoItems_current.child(store).set(newObj)
      .then(function() {
        console.log('Synchronization succeeded')
      })
      .catch(function(error) {
        console.log('Synchronization failed')
      });
    } else {
      console.log('logged out, cannot add to Firebase')
    }
  }

  // used in to-do.js:
  function deleteFromFirebaseRD(store) {
    refToDoItems_current
      .child(store)
        .remove()
  }

  // used in remindersModule.js:
  function addToFirebaseRD_Reminders(item) {  
    if ( refToDoItems_reminders ) {
      refToDoItems_reminders
        .child(Object.keys(item)[0])
          .set(Object.values(item)[0]) // push(item)
      .then(function() {
        console.log('Synchronization succeeded')
      })
      .catch(function(error) {
        console.log('Synchronization failed')
      });
    } else {
      console.log('logged out, cannot add to Firebase')
    }
  }

  // used in remindersModule.js:
  function deleteFromFirebaseRD_Reminders(item) {
    refToDoItems_reminders
      .child(Object.keys(item)[0])
        .remove()
  }

  // Populates toDoInstance.toDoList
  // Called on login & logout only:
  function retrieveCurrentSnapshot(clear) {
    // Clears toDoList prior to re-populating it. This is only necessary because of the initial 3 items which compose the instructions
    if ( clear ) {
      toDoInstance.toDoList = [];
    }
    // console.log(toDoInstance.toDoList.length);
    if ( firebaseDataStore.refToDoItemsSnapshot.items ) {
      for ( let item in firebaseDataStore.refToDoItemsSnapshot.items ) {
        if ( item !== 'reminders' ) {
          let storedObj = firebaseDataStore.refToDoItemsSnapshot.items[item];
          let retrievedObj = JSON.parse(storedObj);
          toDoInstance.toDoList.push(retrievedObj);
        }
      }
      if ( !clear ) {
        toDoInstance.toDoList.splice(0,3); // removes instructions
      }
    }
  }

  // not used in project (test only)
  function deleteKeys(start, end) {
    let objKeys = Object.keys(firebaseDataStore.refToDoItemsSnapshot.items);
    // console.log('objKeys: ', objKeys);
    let objValues = Object.values(firebaseDataStore.refToDoItemsSnapshot.items);
    // console.log('objValues: ', objValues);
    for ( let i = start; i <= end; i++ ) {
      refToDoItems_current
        .child(objKeys[i])
          .remove();
    }
  }

  function init() {
    // readFirebaseRD();
    // renderDOM();
    // handleEvents();
    // cacheDOM();
    // bindEvents();
  }

  return {
    // init: init(),
    addToFirebaseRD: addToFirebaseRD,
    addToFirebaseRD_Reminders: addToFirebaseRD_Reminders,
    deleteFromFirebaseRD: deleteFromFirebaseRD,
    deleteFromFirebaseRD_Reminders: deleteFromFirebaseRD_Reminders,
    retrieveCurrentSnapshot: retrieveCurrentSnapshot,
    refToDoItems_lastStoredIdNum: refToDoItems_lastStoredIdNum,
    deleteKeys: deleteKeys,
    setCurrentUidItems: setCurrentUid_Items,
    setCurrentUidItemsReminders: setCurrentUid_Items_Reminders,
    firebaseDataStore: firebaseDataStore,
    readFirebaseRD: readFirebaseRD,
    refToDoItems_current: refToDoItems_current,
    refToDoItems_reminders: refToDoItems_reminders,
    getFirebaseStoredIdNum: getFirebaseStoredIdNum,
    getrefToDoItems_lastStoredIdNum: getrefToDoItems_lastStoredIdNum
  }


})(); // end of Module