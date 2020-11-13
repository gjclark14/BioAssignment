/*eslint-env browser*/

let vertString, horizString;


if (typeof (document) !== "undefined") {
    //script
    let words = document.getElementById("words");
    words.addEventListener("submit", function (e){

        vertString = document.getElementById("word2").value;
        horizString = document.getElementById("word1").value;

        // alert(vertString.concat("\n").concat(horizString).concat("\n"));
        createTable();
        e.preventDefault();
    });



    function createTable() {
        let para = document.createElement("p");
        let node = document.createTextNode("Alignment path marked in blue");
        para.appendChild(node);

        let element = document.getElementById("tableView");
        element.appendChild(para);
        const ROWS = vertString.length + 2;
        const COLS = horizString.length + 2;

        let matrix = createMatrix(ROWS, COLS);
        matrix = setMatrixHeaders(matrix, ROWS, COLS);
        matrix = calculateEditDistance(matrix, ROWS, COLS);

        let table = makeTable(matrix);

        calculateAlignments(table);
        element.appendChild(table);
    }

    // split this function into two:
    // one for horizontal checks
    // one for vertical checks
    function calculateAlignments(matrix) {
        // vertical movements are insertions to the second string
        // horizontal movements are insertions to the first sting

        let r = matrix.rows.length - 1;
        let c = matrix.rows[r].cells.length - 1;
        matrix.rows[matrix.rows.length-1].cells[matrix.rows[0].cells.length-1].style.color = "#83a598";
        while(r > 1) {
            while( c > 1) {
                let diag = matrix.rows[r-1].cells[c-1].innerHTML;
                let cur = matrix.rows[r].cells[c].innerHTML;
                let horiz = matrix.rows[r].cells[c-1].innerHTML;
                if(diag === cur) {
                    matrix.rows[r-1].cells[c-1].style.color = "#83a598";
                    r--;
                    c--;
                    break;
                }
                if(parseInt(horiz) === (cur-"1")) {
                    matrix.rows[r].cells[c-1].style.color = "#83a598";
                    c--;
                }
                else /*(horiz === (cur-1))*/ {
                    matrix.rows[r-1].cells[c].style.color = "#83a598";
                    r--;
                }
            }
        }
        return matrix;
    }

    function calculateEditDistance(matrix, row, col) {
        for(let i = 2; i < col; i++) {
            for(let j = 2; j < row; j++) {
                if(horizString[i-2] !== vertString[j-2]) {
                    matrix[i][j] = Math.min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]) + 1;
                } else {
                    matrix[i][j] = matrix[i-1][j-1];
                }
            }
        }
        return matrix;
    }

    function setMatrixHeaders(matrix, row, col){
        matrix[0][0] = "-";
        matrix[0][1] = "-";
        matrix[1][0] = "-";
        for(let i = 2; i < row; i++) {
            matrix[0][i] = vertString.charAt(i-2);
            matrix[1][i] = i-1;
        }

        for(let i = 2; i < col; i++) {
            matrix[i][0] = horizString.charAt(i-2);
            matrix[i][1] = i-1;
        }

        return matrix;
    }

    function createMatrix(row, col) {
        let matrix = [];
        for(let i = 0; i < col; i++) {
            matrix.push(new Array(row).fill(0));
        }
        return matrix;
    }

    function makeTable(array) {
        let table = document.createElement('table');
        for (let i = 0; i < array.length; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < array[i].length; j++) {
                let cell = document.createElement('td');
                cell.textContent = array[i][j];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        return table;
    }
}











