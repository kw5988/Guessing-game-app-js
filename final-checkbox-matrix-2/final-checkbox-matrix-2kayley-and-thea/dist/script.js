/** 
  Empty JavaScript file for CS317 Fall 2023 Project 1 Task 2b Checkbox Matrix 2. 
  Flesh out this file so that Checkox Matrix 1 has the behavior specified in the
  Project 1 description.
*/

let totalCountTd = [];
let rowCountTds = [];
let colCountTds = [];
let checkboxes = [];
let gameMode = 0;
let counter = 0;
/**
 * Lyn's quotient function.
 * Returns the integer quotient of dividing numer by denom.
 * The integer quotient is the integer q such that
 * numer = q*denom + (numer % denom).
 */
function quotient(numer,denom) {
    return Math.trunc(numer/denom);
    // Note: Math.trunc rounds toward 0, which works for the negative cases.
    // Math.floor, which rounds towards negative infinity, does not. 
}

/**
 * Lyn's Python-like range function in JavaScript
 * Creates an array based on start number, stop number, and step number
 */
function range(start, stop, step) {
    if (!Number.isInteger(start)) {
	return []; 
    }
    if (stop == undefined) {
	stop = start;
	start = 0;
    } else if (stop == 0 || !Number.isInteger(stop)) {
	return []; 
    } 
    if (step == undefined) {
	step = 1;
    } else if (!Number.isInteger(step)) {
	return [];
    }
    if (((stop - start)*step) < 0) {
	// I.e. (((stop > start) && (step < 0))
	//       || ((stop < start) && (step > 0)))
	return [];
    }
    let largestIndex = quotient(Math.abs(stop - start)-1, Math.abs(step));
    let indices = Array.from(Array(largestIndex+1).keys());
    return indices.map(i => i*step + start);
}

/**
 *updateHeaders(element, updateValue) takes 2 arguments
 *@param(element): an element (header) to update 
 *@param(updateValue):an integer for how much the element should be updated by
 *takes in an element header and a value to update the header by and updates the header.
 */
function updateHeaders(element, updateValue){
  element.innerText = parseInt(element.innerText) + updateValue;
}


/**
 *inclusiveGameMode() takes no parameters
 *sets and formats the game for inclusive mode
 */
function inclusiveGameMode(){
  if(gameMode == 1){ //previously exclusive mode. Reset background colors of boxes
    setColorForElements(rowCountTds, colCountTds, totalCountTd, "orange", "yellow", "magenta");
  }
  gameMode = 0; //change gameMode to inclusive mode
  checkAllButton = document.getElementById("checkAllButton");
  checkAllButton.disabled = false;
  exclusiveRadioButton.checked=false;
  inclusiveRadioButton.checked=true;
}

/**
 *setColorForElements takes 6 paramaters
 *@param(rowElements): an array of row elements
 *@param(colElements): an array of column elements
 *@param(totalElements): an array of total count elements
 *@param(rowColor): the color to give the row elements
 *@param(colColor): the color to give the column elements
 *@param(totalColor): the color to give the total count element
 *iterates through each array and sets the specified color to the elements
*/
function setColorForElements(rowElements, colElements, totalElements, rowColor, colColor, totalColor) {
  rowElements.forEach(element => element.style.backgroundColor = rowColor);
  colElements.forEach(element => element.style.backgroundColor = colColor);
  totalElements.forEach(element => element.style.backgroundColor = totalColor);
}

/**
 *updateCounts takes 6 paramaters
 *@param(rowHeaders): an array of row elements
 *@param(colHeaders): an array of column elements
 *@param(totalHeaders): an array of total count elements
 *@param(rowValue): the value to give the row elements
 *@param(colValue): the value to give the column elements
 *@param(totalValue): the value to give the total count element
 *iterates through each array and sets the specified values to the elements (headers)
 */
function updateCounts(rowHeaders, colHeaders, totalHeaders, rowValue, colValue, totalValue){
   rowHeaders.forEach(element => element.innerText = rowValue);
   colHeaders.forEach(element => element.innerText = colValue);
   totalHeaders.forEach(element => element.innerText = totalValue);
}
            

const matrixSizeTextbox = document.getElementById("matrixSizeTextbox"); //gets the text box

/**
*Upon a enter keypress, validates the user input. If the user inputs a valid 
*number for matrix size, program builds the appropriate matrix and 
*allows the user to start playing the game on either
*inclusive or exclusive mode.
*/
matrixSizeTextbox.addEventListener("keypress", function(event){
  
  const validityErrorMessage = document.getElementById("validityError");
  if(event.key == "Enter"){
    let trs = [];
    totalCountTd = [];
    rowCountTds = [];
    colCountTds = [];
    checkboxes = [];
    //counter=0;
    const enteredSize = matrixSizeTextbox.value;
    
    //check validity of user input
    if(enteredSize > 20 || enteredSize < 1){
      validityErrorMessage.innerHTML = enteredSize + " is outside the allowable size range [1,20]";
    }
    else if(!Number(enteredSize)){
      validityErrorMessage.innerHTML = enteredSize + " is not a valid integer string";
    }
    
    else{ //user input was valid 
      inclusiveGameMode();
      validityErrorMessage.innerHTML = "";
      
      const matrixNumberArray = range(0, parseInt(enteredSize)+1, 1);

      const matrixTable = document.querySelector("table");
      matrixTable.id = "matrixTable";
      
      let rowCount = 0;
      matrixNumberArray.forEach(() => { //loop through the array of numbers of user input size
        const row = document.createElement("tr");
        trs.push(row); //add tr element to trs array 

        let colCount = 0;
        let rowCountHeading = 0;
        
        matrixNumberArray.forEach(() => { //loop through array of numbers to create individual cells and checkboxes
          const tableCell = document.createElement("td");
          if(rowCount==0 && colCount != 0){ //create column headers
            tableCell.classList.add("colCount");
            tableCell.id = "colCount#"+colCount;
            tableCell.innerText = 0;
            colCountTds.push(tableCell); 
          }
          else if(rowCount==0 && colCount==0){ //Upper left hand corner of matrix. Only create totalCount box.
            tableCell.classList.add("totalCount");
            tableCell.id = "totalCount";
            tableCell.innerText = 0;
            totalCountTd.push(tableCell); 
          }
          else if(colCount == 0 && rowCount != 0){ //create row headers
            tableCell.classList.add("rowCount");
            tableCell.id = "rowCount#"+rowCount;
            tableCell.innerText = 0;
            rowCountTds.push(tableCell); 

          }
          else{ //create individual checkboxes
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.setAttribute("row", parseInt(rowCount));
            checkBox.setAttribute("col", parseInt(colCount));
            checkBox.onclick = function(){
              clickCheckbox(this);
            };
    
            //add elements to their appropriate parents in DOM tree
            checkboxes.push(checkBox);
            tableCell.appendChild(checkBox);
          }

          row.appendChild(tableCell);
          colCount += 1;
        })
        matrixTable.appendChild(row);
        rowCount+=1;
        rowCountHeading+=1;
      })
      
      //get inclusiveRadioButton and set gameMode and game settings
      inclusiveRadioButton = document.getElementById("inclusiveRadioButton");
      inclusiveRadioButton.disabled = false;
      inclusiveRadioButton.onclick=function(){
         if(gameMode == 1){ //previously exclusive mode. Reset background colors of boxes
           setColorForElements(rowCountTds, colCountTds, totalCountTd, "orange", "yellow", "magenta");
         }
         gameMode = 0; //change gameMode to inclusive mode
         checkAllButton = document.getElementById("checkAllButton");
         checkAllButton.disabled = false;
      }
      
      //get inclusiveRadioButton and set gameMode and game settings
      exclusiveRadioButton = document.getElementById("exclusiveRadioButton");
      exclusiveRadioButton.disabled = false;
      
      //set game properties and rules for exclusive mode
      exclusiveRadioButton.onclick=function(){
         gameMode = 1;
         counter=0;
        //reset headers to 0
         updateCounts(rowCountTds, colCountTds, totalCountTd, 0, 0, 0);
         // rowCountTds.forEach(element => element.innerText = 0);
         // colCountTds.forEach(element => element.innerText = 0);
         // totalCountTd.forEach(element => element.innerText = 0);
         checkboxes.forEach(element => element.checked=false);
        
        //disable checkAllButton
         checkAllButton = document.getElementById("checkAllButton");
         checkAllButton.disabled = true;
        
        //set background colors of all headers to red
         setColorForElements(rowCountTds, colCountTds, totalCountTd, "red", "red", "red");        
      }
      
      //enable checkAllButton 
      checkAllButton = document.getElementById("checkAllButton");
      checkAllButton.disabled = false;
      
      //checkAllButton checks all boxes and updates headers
      checkAllButton.onclick = function(){
         checkboxes.forEach(element => element.checked=true); //checks all checkboxes
         updateCounts(rowCountTds, colCountTds, totalCountTd, enteredSize, enteredSize, enteredSize**2);
      }
      
      //enable uncheckAllButton
      uncheckAllButton = document.getElementById("uncheckAllButton");
      uncheckAllButton.disabled = false;
      
      //uncheckAllButton unchecks all boxes and resets headers to show 0
      uncheckAllButton.onclick = function(){
         checkboxes.forEach(element => element.checked=false); //checks all checkboxes
         updateCounts(rowCountTds, colCountTds, totalCountTd, 0, 0, 0);
       
         if(gameMode==1){
         setColorForElements(rowCountTds, colCountTds, totalCountTd, "red", "red", "red");
         }
      }
  }
    //reset the table for next game
    matrixTable.replaceChildren(...trs);
    
    } //END OF THE ENTER EVENT BRACKETS
});


/**
 *checkRowsandCols(element, currentElement) takes two arguments
 *@param(element) - a checkbox to compare to (iterated on)
 *@param(currentElement) - the checkbox that was clicked on
 *Updates counts of checked checkboxes in exclusive mode.
 *Limits each column and row to only have one checked checkbox.
 */
function checkRowsandCols(element, currentElement){
  //get row and column information of iterated on element
  let elementRowNumber = parseInt(element.getAttribute('row')); 
  elementRow = rowCountTds[elementRowNumber-1];
  let elementColNumber = parseInt(element.getAttribute('col'));
  elementCol = colCountTds[elementColNumber-1];
  
  //get row and column information of clicked on element
  let currentRowNumber = parseInt(currentElement.getAttribute('row'));
  let currentColNumber = parseInt(currentElement.getAttribute('col'));
  currentElementRow = rowCountTds[currentRowNumber-1];
  currentElementCol = colCountTds[currentColNumber-1];
  
  if(currentElement.checked){ //previously unchecked
    if(currentRowNumber == elementRowNumber || currentColNumber == elementColNumber){ //if two checkboxes are in the same row or column
      if(!element.isEqualNode(currentElement)){ //if the checkboxes are not the same 
        if(element.checked){
          element.checked = false; //uncheck the other box in the same row/column
          
          //update header for unchecked box
          elementRow.innerText = 0;
          elementCol.innerText = 0;
          totalCountTd.forEach(element => element.innerText= parseInt(element.innerText) - 1);
          counter = counter-1;
          //reset headers to red
          elementRow.style.backgroundColor = "red";
          elementCol.style.backgroundColor = "red";
        }
        
        //update headers of checked box
        currentElementRow.innerText = 1;
        currentElementCol.innerText = 1;
        
        //update background color of checked box's headers
        currentElementRow.style.backgroundColor = "lime";
        currentElementCol.style.backgroundColor = "lime";
      }
      
    }
    
  }
  
  else{ //previously checked, user uncheked
    currentElementRow.innerText = 0;
    currentElementCol.innerText = 0;
    currentElementRow.style.backgroundColor = "red";
    currentElementCol.style.backgroundColor = "red";
  }
}

 

/**
 *clickCheckbox(box) takes one arguments
 *@param(box) - a checkbox
 *Has two modes: inclusive and exclusive mode. 
 *Counts the number of boxes checked per row and column.
 */
function clickCheckbox(box){
  let boxSize = rowCountTds.length;
  //get row and column numbers of clicked on checkbox
  let rowNumber = box.getAttribute('row'); 
  let colNumber = box.getAttribute('col');
  
  if(gameMode==0){ //Inclusive Mode
 
    currentRow = rowCountTds[parseInt(rowNumber)-1];
    currentCol = colCountTds[parseInt(colNumber)-1];
   
    if(box.checked == true){ //checked the box, previously unchecked
      //add 1 to checked box's row and column headers

      updateHeaders(currentRow, 1);
      updateHeaders(currentCol, 1);
 
      totalCountTd.forEach(element => element.innerText= parseInt(element.innerText) + 1); //update totalCount
      counter+=1;
    }
    
    else{ //unchecked the box, previously checked
      //decrement row and column headers by 1
      updateHeaders(currentRow, -1);
      updateHeaders(currentCol, -1)
      
      totalCountTd.forEach(element => element.innerText= parseInt(element.innerText) - 1); //update totalCount
      
    }
  }
  
  else{ //Exclusive mode
    
    checkboxes.forEach(element => checkRowsandCols(element, box)); //check that exclusive mode rules aren't violated
    
    //update the total count
    if(box.checked){
       totalCountTd.forEach(element => element.innerText =parseInt(element.innerText) + 1);
      counter += 1;
      console.log(counter);
    }
    else{
      totalCountTd.forEach(element => element.innerText= parseInt(element.innerText) - 1);
      counter= counter-1;
      //console.log(counter);
    }
    if(counter==boxSize){
      totalCountTd.forEach(element => element.style.backgroundColor="lime");
    }
    else if(counter != boxSize){
      totalCountTd.forEach(element => element.style.backgroundColor="red");
    }
    
  } 
}