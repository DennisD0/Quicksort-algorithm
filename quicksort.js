// Global Variables for "Open"
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getSheetByName('Open');

// Quicksort Function
function quicksort(arr, left, right) {
  if (left < right) {
    var pivotIndex = partition(arr, left, right);
    quicksort(arr, left, pivotIndex - 1);
    quicksort(arr, pivotIndex + 1, right);
  }
}

function partition(arr, left, right) {
  var pivot = arr[Math.floor((right + left) / 2)];
  var i = left;
  var j = right;

  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}

// Sort Deadlines Function (Date column - Column F) using Quicksort
function sortDeadlines() {
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("F2:F" + lastRow);
  var values = range.getValues().flat(); // Get values as a flat array

  quicksort(values, 0, values.length - 1);

  // Write sorted values back to the spreadsheet
  var sortedRange = sheet.getRange(2, 6, values.length, 1);
  sortedRange.setValues(values.map(function(value) { return [value]; }));
}
