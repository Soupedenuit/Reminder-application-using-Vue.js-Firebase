/***************************
 1. Today's Date function:
***************************/

var todayDate = function() {
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"
  ];

  var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var x = new Date();
  var day = x.getDate();
  var weekday = weekDays[x.getDay()];
  var month = months[x.getMonth()];
  var year = x.getFullYear();
  var today = `${weekday} ${month} ${day}, ${year}`;
  // Ternary Operator in lieu of if else statement
  var weekdayNum = x.getDay();
  var commentTemplate = '<br /><span style="font-size: 0.9em">'
  var comment =
  weekdayNum === 0 ? commentTemplate + 'Sundays give me the dreads</span>' :
  weekdayNum === 1 ? commentTemplate + 'Mondays suck balls</span>' :
  weekdayNum === 2 ? commentTemplate + 'Tuesdays suck less then Mondays</span>' :
  weekdayNum === 3 ? commentTemplate + 'Happy HUMP day!</span>' :
  weekdayNum === 4 ? commentTemplate + 'I hate Thursdays</span>' :
  weekdayNum === 5 ? commentTemplate + 'TGIF mofos!</span>' :
  commentTemplate + 'Saturdays RULE the world!</span>';
  return today + comment;
};


/***************************
 2. Elapsed Time function:
***************************/

var elapsedTimeSinceCreated = function() {
  var x = new Date();
  var creationDate = new Date(2017, 06, 24, 13, 0);
  var diffInMinutes = Math.round((x - creationDate) / 1000 / 60);
  var text = '';

  var diffInHours = Math.floor(diffInMinutes/60);
  var diffInDays = Math.floor(diffInMinutes/60/24);

  var minAfterHours = diffInMinutes - diffInHours * 60;
  var hoursAfterDays = diffInHours - diffInDays * 24;

  var mins;
  if ( minAfterHours === 1 ) {
    mins = " minute";
  }
  else mins = " minutes";

  var hours;
  if ( hoursAfterDays === 1 ) {
    hours = " hour";
  }
  else hours = " hours";

  var days;
  if ( diffInDays === 1 ) {
    days = " day";
  }
  else days = " days";

  if ( diffInMinutes < 60 ) {
    text = text + diffInMinutes + mins;
  }

  else if ( diffInMinutes < 3600 ) {
    text = text + diffInHours + hours + " and " + minAfterHours + mins;
  }

  else {
    text = text + ` ${diffInDays} ${days} ${hoursAfterDays} ${hours} and ${minAfterHours} ${mins} `;
  }

  return text;
};


/***************************
 3. Session Time function:
***************************/

/*
var sessionOpen;
window.addEventListener('DOMContentLoaded', function() {
  sessionOpen = new Date();
}); */

const sessionOpen = new Date();
var sessionTime = function() {
  var x = new Date();
  var diffInSeconds = Math.round((x - sessionOpen) / 1000);
  var text = '';

  var diffInMinutes = Math.floor(diffInSeconds/60);
  var diffInHours = Math.floor(diffInSeconds/60/60);
  var diffInDays = Math.floor(diffInSeconds/60/60/24);

  var secsAfterMinutes = diffInSeconds - diffInMinutes * 60;
  var minAfterHours = diffInMinutes - diffInHours * 60;
  var hoursAfterDays = diffInHours - diffInDays * 24;

  var secs;
  if ( secsAfterMinutes === 1 ) {
    secs = " second";
  }
  else secs = " seconds";

  var mins;
  if ( minAfterHours === 1 ) {
    mins = " minute";
  }
  else mins = " minutes";

  var hours;
  if ( hoursAfterDays === 1 ) {
    hours = " hour";
  }
  else hours = " hours";

  var days;
  if ( diffInDays === 1 ) {
    days = " day";
  }
  else days = " days";


  if ( diffInSeconds < 60 ) {
      text = text + `This session just opened now<br /> (${diffInSeconds} ${secs} ago)`;
    }

  else if ( diffInMinutes < 60 ) {
    text = text + `This session has been open for<br /> ${diffInMinutes} ${mins} and ${secsAfterMinutes} ${secs}`;
  }

  else if ( diffInMinutes < 1440 ) {
    text = text + `This session has been open for ${diffInHours} ${hours} ${minAfterHours} ${mins} and ${secsAfterMinutes} ${secs}`;
  }

  else {
    text = text + `This session has been open for ${diffInDays} ${days} ${hoursAfterDays} ${hours} ${minAfterHours} ${mins} and ${secsAfterMinutes} ${secs}`;
  }

  return text;
};

// Currently not in use:
function go() {
  var y = setInterval(function() {
  sessionTime();
  }, 1000);
}
