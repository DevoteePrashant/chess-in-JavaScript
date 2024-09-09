function insertImage() {
    let gameState = [];
    document.querySelectorAll('li.box').forEach(liElement => {
        gameState.push({
            id: liElement.id,
            text: liElement.textContent,
            outerHTML: liElement.outerHTML,
        });
    });
    localStorage.setItem('gameState 1', JSON.stringify(gameState));
  
    document.querySelectorAll('.box').forEach(image => {
        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class='all-img all-pown' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'  
            }
            else {
                image.innerHTML = `${image.innerText} <img class='all-img' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
            }
        }
    })
     
    

// // Retrieve the current game state from localStorage
// let currentState = localStorage.getItem('gameState 1')

// if (currentState === null) {
//   console.error("No game state found in localStorage.");
//   return;
// }

// try {
//   // Parse the current state into a usable format (assuming it's a stringified JSON object)
//   let gameState = JSON.parse(currentState);
//   // Rest of your code...
// } catch (error) {
//   console.error("Error parsing game state:", error);
//   return;
// }

// // Update the game state (e.g., move a piece, update the board, etc.)
// // gameState.board[0][0] = 'new piece'; // Replace with your actual game logic

// // Stringify the updated game state
// let updatedState = JSON.stringify(gameState);

// // Store the updated game state in localStorage
// localStorage.setItem('gameState 1', updatedState);

// // Add event listeners to the boxes
// document.querySelectorAll('.box').forEach(item => {
//   item.addEventListener('click', function () {
//     updateGameState(); 
//   });
// });

// // Define the updateGameState function
// function updateGameState() {
//   // Retrieve the updated game state from localStorage
//   let currentState = localStorage.getItem('gameState 1');
//   let gameState = JSON.parse(currentState);

//   // Update the game state based on the clicked box (e.g., move a piece, update the board, etc.)
//   // Replace with your actual game logic

//   // Stringify the updated game state
//   let updatedState = JSON.stringify(gameState);

//   // Store the updated game state in localStorage
//   localStorage.setItem('gameState 1', updatedState);
// }






}

insertImage()



//Coloring the board

function coloring() {
    const color = document.querySelectorAll('.box')

    color.forEach(color => {
        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = Number(arr.pop())
        aup = Number(arr.shift())
        a = aside + aup

        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(232 235 239)'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(125 135 150)'
        }
    })
}
coloring()


//function to not remove the same team element

function reddish() {
    document.querySelectorAll('.box').forEach(i1 => {
        if (i1.style.backgroundColor == 'blue') {

            document.querySelectorAll('.box').forEach(i2 => {

                if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {


                    greenText = i2.innerText

                    blueText = i1.innerText

                    blueColor = ((Array.from(blueText)).shift()).toString()
                    greenColor = ((Array.from(greenText)).shift()).toString()

                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = Number(arr.pop())
                    aup = Number(arr.shift())
                    a = aside + aup

                    if (a % 2 == 0 && blueColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(232 235 239)'
                    }
                    if (a % 2 !== 0 && blueColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(125 135 150)'
                    }

                }
            })
        }
    })
}

//reset button
document.getElementById("reset-btn").addEventListener("click", function () {
    location.reload();
});

let gameEnded = false;
tog = 1

let timer = null;
let timeLeft = 10 * 60; // 10 minutes in seconds
let display = document.querySelector('#timer');

function startTimer() {
  clearInterval(timer);
  timeLeft = 10 * 60;
  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeLeft--;


    if (timeLeft < 0) {
        timeLeft = 10 * 60;
        // count++
        document.getElementById('message').innerText = ' now black player Time is close!';
    }else{
        document.getElementById('message').innerText = ' now white player Time is !'; 
    }
  }, 1000); // update every 1 second
}

startTimer();

document.querySelectorAll('.box').forEach(item => {
    

    item.addEventListener('click', function () {
        
        if (gameEnded) return; 

        if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
            tog = tog + 1;
        } else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {
            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'blue') {
                    blueId = i.id;
                    blueText = i.innerText;

                    // Check if the White King is captured
                        if (item.innerText == 'Wking') {
                            document.getElementById('message').innerText = 'Bking wins!';
                            gameEnded = true; 
                        }

                        if (item.innerText == 'Bking') {
                            document.getElementById('message').innerText = 'wking wins!';
                            gameEnded = true; 
                        }

                    document.getElementById(blueId).innerText = '';
                    item.innerText = blueText;
                    coloring();
                    insertImage();
                    tog = tog + 1;
                }
            });
        }

        if (gameEnded) return; 


        getId = item.id
        arr = Array.from(getId)
        arr.shift()
        aside = Number(arr.pop())
        arr.push('0')
        aup = Number(arr.join(''))
        a = aside + aup

        //function to display the available paths for all pieces

        function whosTurn(toggle) {
            // PAWN

            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'blue';

           
                if (tog % 2 !== 0 && aup < 800) {


                    // First move for white pawns
                    if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green';
                        if (document.getElementById(`b${a + 200}`).innerText.length == 0 && aup < 300) {
                            document.getElementById(`b${a + 200}`).style.backgroundColor = 'green';
                        }
                    }
                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green';
                    }
                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green';
                    }
                }

                if (tog % 2 == 0 && aup > 100) {
                    // First move for black pawns
                    if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green';
                        if (document.getElementById(`b${a - 200}`).innerText.length == 0 && aup > 600) {
                            document.getElementById(`b${a - 200}`).style.backgroundColor = 'green';
                        }
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green';
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green';
                    }
                }
                // Second move for pawns
                if (tog % 2 !== 0 && aup >= 800) {
                    if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green';
                    }
                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green';
                    }
                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green';
                    }
                }
                if (tog % 2 == 0 && aup <= 100) {
                    if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green';
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green';
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green';
                    }
                }
            }

            // KING

            if (item.innerText == `${toggle}king`) {


                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = 'green'

                }
                if (aside > 1) {

                    document.getElementById(`b${a - 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800) {

                    document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'  
                }
                if (aup > 100) {

                    document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                }

                if (aup > 100 && aside < 8) {

                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                }
                if (aup > 100 && aside > 1) {

                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800 && aside < 8) {

                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800 && aside > 1) {

                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
                }

                item.style.backgroundColor = 'blue'

            }

            // KNIGHT

            if (item.innerText == `${toggle}knight`) {


                if (aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 7 && aup > 200) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup < 800) {
                    document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'green'
                }

                item.style.backgroundColor = 'blue'

            }

            // QUEEN

            if (item.innerText == `${toggle}queen`) {
                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }



                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                item.style.backgroundColor = 'blue'
            }

            // BISHOP

            if (item.innerText == `${toggle}bishop`) {
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                 item.style.backgroundColor = 'blue'
            }

            // ROOK

            if (item.innerText == `${toggle}rook`) {

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                item.style.backgroundColor = 'blue'
            }
        }

        // Toggling the turn
        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "White's Turn"
            whosTurn('W')
        }
        if (tog % 2 == 0) {
            document.getElementById('tog').innerText = "Black's Turn"
            whosTurn('B')
        }
        reddish()
        startTimer();
    })
})
   window.onload = () => {
    const tenMinutes = 60 * 10; 
    const display = document.querySelector('#timer');
    startTimer(tenMinutes, display);
    
  
};




document.querySelectorAll('.box').forEach(hathiTest => {

    hathiTest.addEventListener('click', function () {

        if (hathiTest.style.backgroundColor == 'blue') {

            blueId = hathiTest.id
            blueText = hathiTest.innerText

            document.querySelectorAll('.box').forEach(hathiTest2 => {

                hathiTest2.addEventListener('click', function () {
                    if (hathiTest2.style.backgroundColor == 'green' && hathiTest2.innerText.length == 0) {
                        document.getElementById(blueId).innerText = ''
                        hathiTest2.innerText = blueText
                        coloring()
                        insertImage()
                    }
                })
            })
        }
    })
})

// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.box').forEach(ee => {
  ee.addEventListener('click', function () {
      z = z + 1
      if (z % 2 == 0 && ee.style.backgroundColor !== 'green') {
          coloring()
      }
  })
})





let startTime;
let endTime;
let timeRanges = [];

function setTime() {
  startTime = new Date();
}


function addTimeRange() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value;
    const newTimeRange = {
      id: timeRanges.length + 1,
      userName: name,
      endTime: formatTime(endTime), // pass endTime to formatTime
      currentTime: formatTime(endTime),
    };
    timeRanges.push(newTimeRange);
    console.log(timeRanges);
    localStorage.setItem('timeRanges', JSON.stringify(timeRanges));
    printTimeRanges()
  }


  function stopTimer() {
      endTime = new Date();
      addTimeRange();
    }
    setTime() 

    const myElement = document.getElementById('stop-btn');

   if (myElement) {
       myElement.addEventListener('click', function() {
           document.getElementById('stop-btn').addEventListener("click", stopTimer)
       });
   } else {
       console.error('Element not found!');
   }


function printTimeRanges() {
  const timeRangesDiv = document.getElementById('timeRangesDiv');
  const storedTimeRanges = JSON.parse(localStorage.getItem('timeRanges'));
  let html = '<table border="1">';
  html += `
    <tr>
      <th>Id</th>
      <th>User Name</th>
      <th>Current Time</th>
    </tr>
  `;
  storedTimeRanges.forEach((timeRange) => {
    html += `
      <tr>
        <td>${timeRange.id}</td>
        <td>${timeRange.userName} start game</td>
        <td>${timeRange.currentTime}</td>
      </tr>
    `;
  });
  html += '</table>';
  timeRangesDiv.innerHTML = html;
}
function formatTime(date) {
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return (number < 10 ? '0' : '') + number;
}