/**************************************
 Firebase Realtime Database:
**************************************/

cachedDataDOM = {};

function cacheDataDOM() {
};

const storedFunctions = {};

function retrieveData(uid) {

  var refTestingChild = defaultDatabase.ref(`testing1/${uid}`);
  // refTestingChild.child('grandKid').set('it\'s Wednesday!');

  // var childData = {
  //   one: "a",
  //   two: "b"
  // };
  // var pushedChild = refTestingChild.push(childData);
  // refTestingChild.set('child tested2');

  refTestingChild.on('value', gotData2, errData2);

  function gotData2(dataSnapshot) { // snapshot of testing1/child1
    let obj = dataSnapshot.val();
    console.log('snapshot exists: ', dataSnapshot.exists());
    if ( dataSnapshot.exists() ) {
      let objKeys = Object.keys(obj);
      console.log('objKeys: ', objKeys);
      let objValues = Object.values(obj);
      console.log('objValues: ', objValues);
      let text = '';
      if ( objValues ) {
        objValues.forEach(function(x) {
          if ( typeof x === 'object' ) {
            let length = Object.values(x).length;
            for ( let i = 0; i < length; i++ ) {
              text += `<li data-key="${objKeys[objValues.indexOf(x)]}"> <pre>Object entry ${i+1} =>     ${Object.keys(x)[i]}:   ${Object.values(x)[i]}</pre></li>`;
            }
          }
          else {
            text += `<li data-key="${objKeys[objValues.indexOf(x)]}">  <pre>String =>     ${x}</pre></li>`;
          }
        });
      };
      testingFBModule.cachedDOM.displayedData.innerHTML = text;
    }
    else {
      testingFBModule.cachedDOM.displayedData.innerHTML = '';
    }
    console.log(testingFBModule.cachedDOM.displayedData.childNodes);
  }

  function errData2(err) {
    console.log('Error! => ', err);
    testingFBModule.cachedDOM.displayedData.innerHTML = '';
  }

  function submitData() {
    let newData = {};
    newData.text = testingFBModule.cachedDOM .addInput.value;
    newData.time = timeStamp();
    // newData.date = dateToString();
    console.log(newData);
    var pushedData = refTestingChild.push(newData);
    // console.log('pushedData: ', pushedData.key)
    testingFBModule.cachedDOM.addInput.value = '';
  }

  function searchData() {
    let searchText = testingFBModule.cachedDOM.searchInput.value.toLowerCase();
    let list = testingFBModule.cachedDOM.displayedData.childNodes;
    let lgt = list.length;
    for ( let i = 0; i < lgt; i++ ) {
      let text = list[i].textContent.toLowerCase();
      if ( text.search(searchText) !== -1 ) {
        console.log(text);
        list[i].classList.add('found');
        setTimeout(function() {
          list[i].classList.remove('found');
        }, 2000);
      }
    }
    // cachedDOM .searchInput.value = '';
  }

  function removeData() {
    refTestingChild.off('value', gotData2);
    testingFBModule.cachedDOM.displayedData.innerHTML = '';
  }

  storedFunctions.submitData = submitData;
  storedFunctions.searchData = searchData;
  storedFunctions.removeData = removeData;
  storedFunctions.refTestingChild = refTestingChild;

  return {};

} // end of retrieveData function