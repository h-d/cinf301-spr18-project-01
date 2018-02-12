/*
 * See https://stackoverflow.com/questions/45656949/how-to-return-the-row-and-column-index-of-a-table-cell-by-clicking
 * which includes a Jquery solution too.
 */
window.onload = function() {
    const table = document.querySelector('table');
    const rows = document.querySelectorAll('tr');
    const button = document.querySelector('button');
    const rowsArray = Array.from(rows);

    //randomize_elems();

    table.addEventListener('click', (event) => {
        const rowIndex = rowsArray.findIndex(row => row.contains(event.target));
        const columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
        const columnIndex = columns.findIndex(column => column == event.target);
        console.log(rowIndex, columnIndex);
        switch_elems(rowIndex, columnIndex);
    })


    button.addEventListener('click', (event)=> {
        randomize_elems();
    })
}

function switch_elems(i, j) {
    const table = document.querySelector('table');

    let numRows = table.rows.length; // gets num rows
    let numCols = table.rows[0].cells.length; //gets num cols assuming each row has the same # of cols

    let rowPos = i +1;

    if (rowPos <= numRows - 1) {
        if (table.rows[rowPos].cells[j].innerHTML == "") {
            swap(i,j,rowPos,j);
            check_win();
            return;
        }
    }

    rowPos = i-1;

    if (rowPos>= 0) {
        if (table.rows[rowPos].cells[j].innerHTML == "") {
            swap(i,j,rowPos,j);
            check_win();
            return;
        }
    }

    let colPos = j + 1;

    if (colPos <= numCols - 1) {
        if (table.rows[i].cells[colPos].innerHTML == "") {
            swap(i,j,i,colPos);
            check_win();
            return;
        }
    }

    colPos = j - 1;

    if (colPos >= 0) {
        if (table.rows[i].cells[colPos].innerHTML == "") {
            swap(i,j,i,colPos);
            check_win();
            return;
        }
    }

    update_status("Unable to move square.");

}

function randomize_elems() {
    const table = document.querySelector('table');
    let numRows = table.rows.length; // gets num rows
    let numCols = table.rows[0].cells.length; //gets num cols assuming each row has the same # of cols

    var  nums = [];

    let i = 0;

    while (i < 9) {
        let temp_int = getRandomInt(0,8);
        if(checkForInt(temp_int, nums)) {
            nums.push(temp_int);
            i++
        }
    }

    var index = 0;

    for(let i = 0; i < numRows; i ++) {
        for (let j = 0; j < numCols; j++) {
            if (nums[index] == 0) {
                table.rows[i].cells[j].innerHTML = "";
            } else {
                table.rows[i].cells[j].innerHTML = nums[index];
            }

            index++;
        }
    }
}

function checkForInt(temp_int, nums)
{

    for(let i = 0; i < nums.length; i++)
    {
        if (temp_int == nums[i]) return false;
    }

    return true;

}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(i,j,rowIndex, colIndex){

    const table = document.querySelector('table');


    const val1 = table.rows[i].cells[j].innerHTML;
    const val2 = table.rows[rowIndex].cells[colIndex].innerHTML;

    table.rows[i].cells[j].innerHTML = val2.toString();
    table.rows[rowIndex].cells[colIndex].innerHTML = val1.toString();
}

function update_status(status) {
    const status_display = document.querySelector('p');

    status_display.innerText = status;
}

function check_win() {

    const table = document.querySelector('table');

    let numRows = table.rows.length; // gets num rows
    let numCols = table.rows[0].cells.length; //gets num cols assuming each row has the same # of cols

    let num = 0;

    let win_state = ["1", "2", "3", "8", "", "4", "7", "6", "5"];

    for(let i = 0; i < numRows; i ++) {
        for (let j = 0; j < numCols; j++) {
            if (num > 7) {
                update_status("WIN!");
                return;
            } else if (table.rows[i].cells[j].innerHTML != win_state[num])
            {
                update_status("");
                return;
            } else num += 1;
        }
    }
}

/*
 * See https://stackoverflow.com/questions/21033368/javascript-onclick-event-html-table
 */
// window.onload = function() {
//     var table = document.getElementById("tableID");
//     if (table != null) {
//         for (var i = 0; i < table.rows.length; i++) {
//             for (var j = 0; j < table.rows[i].cells.length; j++) {
//                 table.rows[i].cells[j].onclick = function () {
//                     tableText(this, i, j);
//                 };
//             }
//         }
//     }
// }
//
// function tableText(tableCell, i, j) {
//     alert(tableCell.innerHTML + " " + i + " " + j);
// }