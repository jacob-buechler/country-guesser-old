

// Initialize constants
const worldmap = document.getElementById('worldmap');
const countrys = document.querySelectorAll('#worldmap path.normal');
const chatGuessesOutput = document.querySelectorAll('#chatFld #chatterGuess');
const countryArray = Array.from(countrys); 
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');

const timerElement = document.getElementById('timer');
const guessElement = document.getElementById('guessFld');
const chatElement = document.getElementById('chatFld');
const guessInput = document.getElementById('streamersGuess');
const resultElement = document.getElementById('resultCard');
const statusElement = document.getElementById('status');

const resultHeading = document.getElementById('resultHeading');
const resultStreamer = document.getElementById('resultStreamer');
const resultChat = document.getElementById('resultChat');

// Initialize variables
var randomCountry;
var guess;
var chatGuess;
var showFor;
var guessFor = "germany";
var streamer;
var countryGuesses = {};
var mostGuessedCountrys = {};   
var guessesArray = [];

// Initialize states
var states = {
    isShowing: false,
    isGuessing: false,
};

// Get the php Variables
function getPhp(show, guess, streamerName) {
    showFor = show;
    guessFor = guess;
    streamer = streamerName;
}

// Function select a random contry
function getRandomCountry() {
    randomCountry = countryArray[Math.floor(Math.random() * countryArray.length)];
    // Apply fill 'red' to the country
    randomCountry.setAttribute('fill', 'rgb(255, 0, 0)');
}

// 
// Start the gameloop
//

// Function to start showing
function startShowing() {
    startTimer(showFor, timerElement); // start the timer with showFor
    startBtn.disabled = true; // disable the start button
    getRandomCountry(); // get a random country
    states.isShowing = true; // set the isShowing state
}

// Function to end showing
function endShowing() {
    nextBtn.disabled = false; // enable the next button
    nextBtn.innerHTML = 'Start Guessing'; // change the next button text
    nextBtn.setAttribute('onclick','getChatGuesses()'); // change the next button onclick
    states.isShowing = false; // set the isShowing state
}

// Function to start guessing
function startGuessing() {
    startTimer(guessFor, timerElement); // start the timer with guessFo
    nextBtn.innerHTML = 'Guessing...'; // change the next button text
    states.isGuessing = true; // set the isGuessing state
    chatElement.style.display = 'block'; // display the chat element
}

// Function to end guessing
function endGuessing() {
    ComfyJS.Disconnect();
    nextBtn.disabled = false; // enable the next button
    nextBtn.innerHTML = 'Auflösung'; // change the next button text
    nextBtn.setAttribute('onclick', 'showResult()'); // chanche the next button onclick
    timerElement.style.display = 'none'; // hide the timer element
    guessElement.style.display = 'block'; // display the guess element
    states.isGuessing = false; // set the isGuessing state
    chatElement.style.display = 'none'; // display the chat element
}

function startTimer(duration, display) {
    var timer = duration; // Duration is in seconds
    var intervalId = setInterval(function () {
        var seconds = Math.floor(timer);
        var milliseconds = Math.floor((timer - seconds) * 1000); // Extract milliseconds
        
        // Format seconds with leading zero if necessary
        var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        
        // Format milliseconds to always have 3 digits
        milliseconds = ("00" + milliseconds).slice(-3);

        // Update the display with the formatted timer
        display.textContent = "Timer: " + formattedSeconds + ":" + milliseconds;

        // Decrement the timer
        if (timer <= 0) {
            clearInterval(intervalId); // Stop the timer
            timerElement.innerHTML = "Timer: 00:000";
            // Hide the map children after the timer expires
            if (states.isGuessing) {
                endGuessing();
            } else if (states.isShowing) {
                endShowing();
            }
            setTimeout(function () {
                worldmap.style.display = 'none';
            }, 0); // Delay execution until after the current script completes
        } else {
            timer -= 0.01; // Decrement by 0.01 second (10 milliseconds)
        }
    }, 10); // Update the timer every 10 milliseconds
}

// addeventlistener for guessElement set guess
if (guessInput) {
    guessInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            showResult(); // show the result
            guessInput.value = ''; // reset the guess value
        }
    });
    // addeventlistener input for guesselement and set guess
    guessInput.addEventListener('input', function (event) {
        guess = guessInput.value; // get the guess value
    });
}




// Function to show the results
function showResult() {
    guessElement.style.display = 'none'; // hide the guess element
    resultElement.style.display = 'block'; // display the result element
    resultHeading.innerHTML = "Das Land war: " + randomCountry.id;

    // Call the function to build the initial chart
    buildBarChart();

    // Check if guess is defined before calling toLowerCase()
    const guessedCorrectly = (guess ? guess.toLowerCase() : "") === (randomCountry.id).toLowerCase() ? "richtig" : "falsch";
    resultStreamer.innerHTML = streamer + " hat das Land " + ((guess ? guess + " gewählt" : "") || "nicht geraten") + ", und liegt somit " + guessedCorrectly + "!";

    // Check if chatGuess is defined before calling toLowerCase()
    const chatGuessedCorrectly = (chatGuess ? chatGuess.toLowerCase() : "") === (randomCountry.id).toLowerCase() ? "richtig" : "falsch";
    resultChat.innerHTML = "Der größte Teil des Chats hat das Land " + ((chatGuess ? chatGuess + " gewählt" : "") || "nicht geraten") + ", und liegt somit " + chatGuessedCorrectly + "!";

    nextBtn.disabled = false; // enable the next button
    nextBtn.innerHTML = 'Nächste Runde'; // change the next button text
    nextBtn.setAttribute('onclick','resetGame()'); // change the next button onclick


    
    setPoints(guessedCorrectly == "richtig" ? 1 : 0, chatGuessedCorrectly == "richtig" ? 1 : 0 , false, false);
}


// Function to calculate the top 10 most guessed countries
function calculateTop10() {
    var sortedCountries = Object.entries(countryGuesses).sort((a, b) => b[1].length - a[1].length);
    var top10 = sortedCountries.slice(0, 10);
    mostGuessedCountrys = {};
    top10.forEach(entry => {
        mostGuessedCountrys[entry[0]] = entry[1].length;
    });

    // Set chatGuess as the most guessed country
    chatGuess = Object.keys(mostGuessedCountrys)[0]; // Get the first (most guessed) country from the top 10
}


// Function to get chats guesses and calculate the top 10 most guessed countries
function getChatGuesses() {
    nextBtn.disabled = true; // disable the next button
    nextBtn.innerHTML = 'Connecting...'; // change the next button text
        ComfyJS.onCommand = (user, command, message, flags, extra) => {
            if (states.isGuessing) {
                if (command === "co") {
                    // store the guess in the guessedCountry Object with user and message
                    if (!countryGuesses[message]) {
                        countryGuesses[message] = [];
                    }
                    countryGuesses[message].push({
                        user: user,
                        message: message
                    });
                    // Push the new guess object into the guessesArray
                    guessesArray.push({
                        user: user,
                        message: message
                    });

                    // Ensure only the latest ten items are kept in guessesArray
                    if (guessesArray.length > 10) {
                        guessesArray.splice(0, guessesArray.length - 10);
                    }

                    // Loop through the first ten elements selected by document.querySelectorAll
                    for (let i = 0; i < 10 && i < chatGuessesOutput.length; i++) {
                        // Check if there's a corresponding guess in guessesArray
                        if (guessesArray[i]) {
                            // Set the inner HTML of the current element to the representative from guessesArray
                            chatGuessesOutput[i].innerHTML = `${guessesArray[i].user} hat ein Land gewählt`;
                        } else {
                            // If there's no corresponding guess, clear the inner HTML of the current element
                            chatGuessesOutput[i].innerHTML = "";
                        }
                    }
                    calculateTop10();
                  }
              }

        }
        ComfyJS.Init(streamer);
        // on connect call startGuessing
        ComfyJS.onConnected = () => {
            startGuessing();
        }
        logTop10Changes(); // Start logging changes in the top 10 most guessed countries
}


// Function to reset the game
function resetGame() {
    // Reset the states
    states.isShowing = false;
    states.isGuessing = false;
    // Reset the elements
    worldmap.style.display = 'block';
    resultElement.style.display = 'none';
    guessElement.style.display = 'none';
    timerElement.style.display = 'block';
    guessInput.value = '';
    countryGuesses = {};
    // reset mostGuessedCountrys
    mostGuessedCountrys = {};
    guessesArray = [];
    startBtn.disabled = false;
    nextBtn.disabled = true;
    for (var i = 0; i < countryArray.length; i++) {
        countryArray[i].setAttribute('fill', '');
    }
    for (var i = 0; i < chatGuessesOutput.length; i++) {
      chatGuessesOutput[i].innerHTML = "";
  }
  // remove all attributes and childs from #hs-single-bar-chart
  var hsSingleBarChart = document.getElementById("hs-single-bar-chart");
  hsSingleBarChart.removeAttribute('style');
  hsSingleBarChart.innerHTML = ''; // Clear the contents of the chart container


}

// Function to set points for the streamer and chat
function setPoints(pointsStreamer, pointsChat, reset, get) {
    // Check if local storage is supported
    if (typeof(Storage) !== "undefined") {
        // Get current points from local storage, if any
        let currentPoints = JSON.parse(localStorage.getItem('points')) || { streamer: 0, chat: 0 };
        
        // Reset points if requested
        if (reset) {
            currentPoints.streamer = 0;
            currentPoints.chat = 0;
        }
        
        // Update points only if 'get' flag is not set
        if (!get) {
            currentPoints.streamer += pointsStreamer;
            currentPoints.chat += pointsChat;
            statusElement.innerHTML = "Streamer: " + currentPoints.streamer + " | Chat: " + currentPoints.chat;
        }

        // Update local storage with new points
        localStorage.setItem('points', JSON.stringify(currentPoints));

        // Display current status if 'get' flag is set
        if (get) {
            statusElement.innerHTML = "Streamer: " + currentPoints.streamer + " | Chat: " + currentPoints.chat;
        }
    } else {
        console.log("Local storage is not supported in this browser.");
    }
}

// Function to build the bar chart
function buildBarChart() {

    const top10Countries = Object.keys(mostGuessedCountrys);
    const top10Counts = Object.values(mostGuessedCountrys);
  
    const truncatedTop10Countries = top10Countries.slice(0, 10);
    const truncatedTop10Counts = top10Counts.slice(0, 10);
  
    buildChart('#hs-single-bar-chart', (mode) => ({
      chart: {
        type: 'bar',
        height: 300,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      series: [{
        name: 'Guess Count',
        data: truncatedTop10Counts
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '16px',
          borderRadius: 0
        }
      },
      xaxis: {
        categories: truncatedTop10Countries,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          show: false
        },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontWeight: 400
          },
          offsetX: -2,
          formatter: (title) => title // Retained your spelling
        }
      },
      yaxis: {
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontWeight: 400
          },
          formatter: (value) => value >= 1000 ? `${value / 1000}k` : value
        }
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.9
          }
        }
      }
    }), {
      colors: ['#2563eb'],
      grid: {
        borderColor: '#e5e7eb'
      }
    }, {
      colors: ['#3b82f6'],
      grid: {
        borderColor: '#374151'
      }
    });
  }
  




// Function to clear local storage
function clearLocalStorage() {
  setPoints(0,0,true);
}

setPoints(0,0,false ,true);

const HSThemeAppearance = {
  init() {
      const defaultTheme = 'default'
      let theme = localStorage.getItem('hs_theme') || defaultTheme

      if (document.querySelector('html').classList.contains('dark')) return
      this.setAppearance(theme)
  },
  _resetStylesOnLoad() {
      const $resetStyles = document.createElement('style')
      $resetStyles.innerText = `*{transition: unset !important;}`
      $resetStyles.setAttribute('data-hs-appearance-onload-styles', '')
      document.head.appendChild($resetStyles)
      return $resetStyles
  },
  setAppearance(theme, saveInStore = true, dispatchEvent = true) {
      const $resetStylesEl = this._resetStylesOnLoad()

      if (saveInStore) {
          localStorage.setItem('hs_theme', theme)
      }

      if (theme === 'auto') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
      }

      document.querySelector('html').classList.remove('dark')
      document.querySelector('html').classList.remove('default')
      document.querySelector('html').classList.remove('auto')

      document.querySelector('html').classList.add(this.getOriginalAppearance())

      setTimeout(() => {
          $resetStylesEl.remove()
      })

      if (dispatchEvent) {
          window.dispatchEvent(new CustomEvent('on-hs-appearance-change', {detail: theme}))
      }
  },
  getAppearance() {
      let theme = this.getOriginalAppearance()
      if (theme === 'auto') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
      }
      return theme
  },
  getOriginalAppearance() {
      const defaultTheme = 'default'
      return localStorage.getItem('hs_theme') || defaultTheme
  }
}
HSThemeAppearance.init()

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (HSThemeAppearance.getOriginalAppearance() === 'auto') {
      HSThemeAppearance.setAppearance('auto', false)
  }
})

window.addEventListener('load', () => {
  const $clickableThemes = document.querySelectorAll('[data-hs-theme-click-value]')
  const $switchableThemes = document.querySelectorAll('[data-hs-theme-switch]')

  $clickableThemes.forEach($item => {
      $item.addEventListener('click', () => HSThemeAppearance.setAppearance($item.getAttribute('data-hs-theme-click-value'), true, $item))
  })

  $switchableThemes.forEach($item => {
      $item.addEventListener('change', (e) => {
          HSThemeAppearance.setAppearance(e.target.checked ? 'dark' : 'default')
      })

      $item.checked = HSThemeAppearance.getAppearance() === 'dark'
  })

  window.addEventListener('on-hs-appearance-change', e => {
      $switchableThemes.forEach($item => {
          $item.checked = e.detail === 'dark'
      })
  })
})