/**************************************
 * Firebase Authentication
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

const auth = firebase.auth();
// console.log(firebaseRDModule.readFirebaseRD);

const firebaseAuthModule = (function() {
  // console.log(firebaseRDModule.readFirebaseRD);

  function logIn(credentials) {
    console.time('login');
    let signInPromise;
    if ( credentials === 'credentials' ) {
    let email = toDoInstance.cachedDOM.emailInput.value;
    let passw = toDoInstance.cachedDOM.passwordInput.value;
    signInPromise = auth.signInWithEmailAndPassword(email, passw)
    } else signInPromise = auth.signInAnonymously();
    signInPromise.then(closeLogin)
    .then(changeSignInIconToUnLocked)
    .then(function() {
      addSignInText(auth.currentUser.email || 'guest');
    })
    .then(activateSignOutBtn)
    .then(function() {
      console.log(auth.currentUser.uid || 'guest');
      firebaseRDModule.readFirebaseRD({uid: auth.currentUser.uid, uidChange: 'login'});
      // firebaseRDModule.retrieveCurrentSnapshot('clear');
    })
    // .then(remindersModule.setRemindersStore)
    .then(function() {
      addItemsContainerTransitions('vue');
    })
    .then(function() {
      window.setTimeout(function() {
        slideContainerIn('vue');
      },300) // delay to let login window slide back up
    })
    .then(slideIndividualItemsIn)
    .then(function() {
      removeItemsContainerTransitions('vue');
      console.timeEnd('login');
    })
    .then(firebaseRDModule.getFirebaseStoredIdNum)
    .catch(function(err) {
      console.log(err.message);
      alert(err.message);
    });
    passw = '';
    window.setTimeout(remindersModule.setRemindersStore,5000)
  }

  function logOut() {
    slideIndividualItemsOut() // returns a Promise
    .then(function() {
      addItemsContainerTransitions('vue');
    })
    .then(function() {
      slideContainerOut('vue');
    })
    .then(function() {
      removeItemsContainerTransitions('vue');
      return 3000;
    })
    .then(function(delay) {
      window.setTimeout(function() {
        auth.signOut();
        // console.log("delay:  " + delay);
      }, delay);
    })
    .then(changeSignInIconToLocked)
    .then(removeSignInText)
    .then(activateSignInBtn)
    .then(function() {
      // console.log(auth.currentUser.uid);
      firebaseRDModule.readFirebaseRD({uid: null, uidChange: 'logout'});
      // firebaseRDModule.retrieveCurrentSnapshot('clear');
    })
    // .then(removeItemsContainerTransitions)
    .then(remindersModule.clearRemindersStore)
    .catch(function(err) {
      console.log(err.message);
      alert(err.message);
    });
    // toDoInstance.cachedDOM.signInBtn.innerText = "Login";
    /*setTimeout(function() {
      storedFunctions.removeData();
    }, 900); // transition time + 100ms */
  }

  function openLogin() {
    toDoInstance.cachedDOM.authContainer.classList.add('translateY-slider-login');
  }

  function closeLogin() {
    toDoInstance.cachedDOM.authContainer.classList.remove('translateY-slider-login');
  }

  function changeSignInIconToUnLocked() {
    toDoInstance.cachedDOM.signInBtn.setAttribute('value', 'lock_open');
  }

  function changeSignInIconToLocked() {
    toDoInstance.cachedDOM.signInBtn.setAttribute('value', 'lock_outline');
  }

  function slideContainerIn(vue) {
    if ( vue ) {
      toDoInstance.boundClasses.slideContainer = true;
    } else {
      toDoInstance.cachedDOM.itemsContainer.classList.add('translateX-slider-items');
    }
  }

  function slideContainerOut(vue) {
    if ( vue ) {
      toDoInstance.boundClasses.slideContainer = false;
    } else {
      toDoInstance.cachedDOM.itemsContainer.classList.remove('translateX-slider-items');
    }
    let lgt = toDoInstance.toDoList.length;
    // return new Promise(function(resolve, reject) {
    //   window.setTimeout(function() {
    //     resolve();
    //   }, 900); //* lgt + 900);
    // });
  }

  function addItemsContainerTransitions(vue) {
    if ( vue ) {
      toDoInstance.boundClasses.containerTransitionsOn = true;
      toDoInstance.boundClasses.containerTransitionsOff = false;
    } else {
      toDoInstance.cachedDOM.itemsContainer.classList.add('items-container-transitions-on');
      toDoInstance.cachedDOM.itemsContainer.classList.remove('items-container-transitions-off');
    }
  }

  function removeItemsContainerTransitions(vue) {
    if ( vue ) {
      setTimeout(function() {
        toDoInstance.boundClasses.containerTransitionsOff = true;
        toDoInstance.boundClasses.containerTransitionsOn = false;
      }, 900); // transition time + 100ms
    } else {
      setTimeout(function() {
        toDoInstance.cachedDOM.itemsContainer.classList.add('items-container-transitions-off');
        toDoInstance.cachedDOM.itemsContainer.classList.remove('items-container-transitions-on');
      }, 900); // transition time + 100ms
    }
  }

  function addSignInText(username) {
    toDoInstance.cachedDOM.signInText.innerText = `${username}`;
  }

  function removeSignInText() {
    toDoInstance.cachedDOM.signInText.innerText = 'sign in';
  }

  toDoInstance.cachedDOM.signInBtn.addEventListener('click', openLogin, false);

  toDoInstance.cachedDOM.authContainerClose.addEventListener('click', closeLogin, false);

  function activateSignInBtn() {
    let el = toDoInstance.cachedDOM.signInBtn;
    el.addEventListener('click', openLogin, false);
    el.removeEventListener('click', logOut, false);
  }

  function activateSignOutBtn() {
    let el = toDoInstance.cachedDOM.signInBtn;
    el.addEventListener('click', logOut, false);
    el.removeEventListener('click', openLogin, false);
  }

  function slideIndividualItemsIn() {
    let li = toDoInstance.cachedDOM.li;
    Vue.nextTick()
    .then(function () {
      window.setTimeout(function() {
        let lgt = toDoInstance.toDoList.length;
        for ( let i = 0; i < lgt; i++ ) {
          window.setTimeout(function() {
            // console.log(`classList ${i} added`);
            li[i].classList.add('translateX-slider-li');
          }, 25 * i); //ZZ 60
        }
      }, 800);
    });
  }

  function slideIndividualItemsOut() {
    let li = toDoInstance.cachedDOM.li;
    // Vue.nextTick()
    let lgt = toDoInstance.toDoList.length;
    for ( let i = 0; i < lgt; i++ ) { //( let i = lgt - 1; i <= 0; i-- ) {
      window.setTimeout(function() {
        // console.log(`classList ${i} removed`);
        li[i].classList.remove('translateX-slider-li');
      }, 25 * (lgt - i)); //ZZ 60
    }
    return new Promise(function(resolve, reject) {
      window.setTimeout(function() {
        resolve();
      }, 25 * lgt + 300); //ZZ 60
    });
  }

  toDoInstance.cachedDOM.loginBtn.addEventListener('click', function() {
    logIn('credentials');
  }, false);

  toDoInstance.cachedDOM.guestBtn.addEventListener('click', logIn, false);

  toDoInstance.cachedDOM.passwordInput.addEventListener('keydown', function(event) {
    if ( event.keyCode === 13 ) {
      logIn('credentials');
      event.preventDefault();
    }
  }, false);

  return {
    slideContainerIn,
    slideContainerOut
  }


})(); // end of Module
