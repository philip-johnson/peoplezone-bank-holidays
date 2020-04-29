(function UpdateBankHolidays() {
  const endpoint = 'https://www.gov.uk/bank-holidays.json';
  fetch(endpoint).then((response) => response.json()).then((data) => handleData(data));
  
  function handleData(data) {
    let bankHolidays = data;
    var englandDates = bankHolidays["england-and-wales"].events;

    var monthNameMap = {
                    January: '01',
                    February: '02',
                    March: '03',
                    April: '04',
                    May: '05',
                    June: '06',
                    July: '07',
                    August: '08',
                    September: '09',
                    October: '10',
                    November: '11',
                    December: '12',
               };
            
    var bookedHolidays = document.getElementsByClassName("pickadate-partialdate");

    if (bookedHolidays.length == 0) {
      var monthYear = document.getElementsByClassName("pickadate-centered-heading")[1].innerText.trim().split(' ');
      var monthYearFormatted = monthYear[1] + '-' + monthNameMap[monthYear[0]] + '-';    
      
      var teamMemberRows = document.getElementsByClassName("pickadate-cell");      
      processRows(teamMemberRows, englandDates, monthYearFormatted);
      
      var otherTeamMemberRows = teamMemberRows[teamMemberRows.length - 1].lastElementChild.firstElementChild.children;
      processRows(otherTeamMemberRows, englandDates, monthYearFormatted);
    }
    else {
      var i;
      for (i = 0; i < bookedHolidays.length; i++) {
        var date = bookedHolidays[i].textContent;
        var monthYear = bookedHolidays[i].parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.textContent.trim().split(' ');

        if (date.length == 1) {
          date = '0' + date;
        }

        var holidayDate = monthYear[1] + '-' + monthNameMap[monthYear[0]] + '-' + date;

        var j;	
        for (j = 0; j < englandDates.length; j++) {
          if (englandDates[j].date == holidayDate) {
            bookedHolidays[i].style.backgroundColor = "orange";
            bookedHolidays[i].style.borderColor = "orange";
            bookedHolidays[i].parentElement.firstElementChild.style.backgroundColor = "#fcb05f !important";
            bookedHolidays[i].parentElement.firstElementChild.style.borderColor = "#fcb05f !important";
            break;
          }
        }
      }
    }
  };
  
  function processRows(rows, bankHolidayDates, monthYearFormatted) {
    var i;
    for (i = 0; i < rows.length; i++) {
      var teamMemberCells;
      var teamMemberCells = rows[i].children;

      processCells(teamMemberCells, bankHolidayDates, monthYearFormatted);
    }
  };

  function processCells(cells, bankHolidayDates, monthYearFormatted)
  {
    var i;
    for (i = 0; i < cells.length; i++) {
      if (cells[i].classList.contains("pickadate-partial")) {
        var date = '' + i;

        if (date.length == 1) {
          date = '0' + date;
        }

        var holidayDate = monthYearFormatted + date;

        var j;	
        for (j = 0; j < bankHolidayDates.length; j++) {
          if (bankHolidayDates[j].date == holidayDate) {
            cells[i].firstElementChild.style.backgroundColor = "#fcb05f !important";
            cells[i].firstElementChild.style.borderColor = "#fcb05f !important";
            break;
          }
        }
      }
    }
  };
})()
