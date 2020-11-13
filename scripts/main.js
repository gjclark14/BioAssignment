/*eslint-env browser*/

let vertString, horizString;


if (typeof (document) !== "undefined") {
    //script
    let words = document.getElementById("words");
    words.addEventListener("submit", function (e){

        vertString = document.getElementById("word1").value;
        horizString = document.getElementById("word2").value;

        // alert(vertString.concat("\n").concat(horizString).concat("\n"));
        createTable(vertString, horizString);
        e.preventDefault();
    });



    function createTable(word1, word2) {
        let para = document.createElement("p");
        let node = document.createTextNode("This is new.");
        para.appendChild(node);

        let element = document.getElementById("tableView");
        element.appendChild(para);
        const ROWS = vertString.length + 2;
        const COLS = horizString.length + 2;

        let matrix = createMatrix(ROWS, COLS);
        matrix = setMatrixHeaders(matrix, ROWS, COLS)
        matrix = calculateEditDistance(matrix, ROWS, COLS)
        let table = makeTable(matrix);

        calculateAlignments(table, ROWS, COLS);
        element.appendChild(table);
    }

    function calculateAlignments(matrix, row, col) {

        let i = row - 2;
        let j = col - 2;

        row = matrix.rows[5];
        col = matrix.rows[3];

        let y;
        for(let i = 2; i < col; i++) {
            for(let j = 2; j < row; j++) {
                y = matrix[i].cells;
                y[j].style.color = "#83a598";
            }
        }

        matrix[5].cells[4].style.color = "#83a598";

        // matrix[i][j].style.backgroundColor    = "#83a598";
        // matrix[i][j].style.color = "";
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











