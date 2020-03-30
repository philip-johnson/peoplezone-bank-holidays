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
        bookedHolidays[i].parentElement.firstElementChild.style.backgroundColor = "orange";
        bookedHolidays[i].parentElement.firstElementChild.style.borderColor = "orange";
        break;
      }
    }
  }
  };
})()
