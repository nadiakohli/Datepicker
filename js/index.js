window.onload = () => {
  const date = new Date();
  const buttonDisplay = document.getElementById('openButton');
  const calendar = document.getElementById('calendar');
  const input = document.querySelector('input.form-control');

  buttonDisplay.addEventListener('click', () => {
    const days = document.querySelectorAll('.current-date, .today');
    calendar.style.display = 'flex';
    input.style.display = 'none';
    input.value = '';
    buttonDisplay.style.display = 'none';
    days.forEach((day) => {
      if (day.classList.contains('active')) {
        day.classList.remove('active');
        day.style.backgroundColor = '';
      }
    });
  });
  
  const toggleButton = document.querySelector('.toggle-button');
  const datepicker = document.querySelector('.datepicker');
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');
  const containerDays = document.querySelector('.days');
  const weekdays = document.querySelector('.weekdays');
  const select = document.querySelector('select');
  const months = document.querySelectorAll('option');
  const toggleLabel = document.querySelector('.dark p');
  const currentMonth = date.getMonth();

  let isDarkMode = true;

  const toggleMode = (el) => {
    const today = document.querySelector('.today');
    const days = document.querySelectorAll('.current-date, .today');
    const year = document.querySelector('.year p');
  
    el.currentTarget.classList.toggle('active');
    isDarkMode = !isDarkMode;
    const active = el.currentTarget.classList.contains('active');
    const color = active ? 'black' : 'white';
    datepicker.style.backgroundColor = active ? 'white' : '';
    datepicker.style.color = color;
    btnPrev.style.color = color;
    btnNext.style.color = color;
    weekdays.classList.toggle('weekdays-light');
    containerDays.classList.toggle('days-light');
    if (today) {
      today.style.backgroundColor = isDarkMode ? '#201de7' : 'salmon';
    }
    select.style.color = color;
    

    months.forEach((opt) => {
      opt.style.backgroundColor = active ? '#fa80729a' : '';
    });

    toggleLabel.style.color = color;
    styleCells(year.innerText);
    
    days.forEach((day) => {
      if (day.classList.contains('active')) {
        day.style.backgroundColor = isDarkMode ? '#4d4c5a' : 'salmon';
      }
    })
  };

  const modifyingBackgroundColor = () => {
    const today = document.querySelector('.days div.today');
    if (today !== null && toggleButton.classList.contains('active')) {
      today.classList.add('today-light');
    };
  };
  
  const saveBtn = document.querySelector('.save');
  const cancelBtn = document.querySelector('.cancel');
  
  const styleCells = (year) => {
    let selectedDates = [];
    const days = document.querySelectorAll('.current-date, .today');
    days.forEach((day1) => {
      day1.addEventListener('click', (el) => {
        el.currentTarget.classList.add('active');
  
        let date1;
        let date2;
        console.log(selectedDates)
        
        if (selectedDates.length < 2) {
          selectedDates.push(`${month} ${el.currentTarget.innerText} ${year}`);
            date1 = +selectedDates[0].split(' ', 3).splice(1,1).join('');
            if (selectedDates[1]) {
              date2 = +selectedDates[1].split(' ', 3).splice(1,1).join('');
            }
          
            if (date1 > date2) {
              days.forEach((day) => {
                if (day.classList.contains('active')) {
                  day.classList.remove('active');
                  day.style.backgroundColor = '';
                };
              });
              selectedDates = []; 
              el.currentTarget.classList.add('active');
              selectedDates.push(`${month} ${el.currentTarget.innerText} ${year}`);
            };
            let range = [];
            for (let i = date1; i <= date2; i++) {
              range.push(i);
            }
            console.log(range, date1, date2);

            [...days].forEach((day) => {
              if (range.includes(+day.innerText)) {
                day.classList.add('active');
                day.style.backgroundColor = isDarkMode ? '#4d4c5a' : 'salmon';
              };
            });
        } else {
          days.forEach((day) => {
            if (day.classList.contains('active')) {
              day.classList.remove('active');
              day.style.backgroundColor = '';
            }
          });
          selectedDates = [];
          el.currentTarget.classList.add('active');
          selectedDates.push(`${month} ${el.currentTarget.innerText} ${year}`);
        };

        el.currentTarget.style.backgroundColor = isDarkMode ? '#4d4c5a' : 'salmon';

        saveBtn.addEventListener('click', () => {
          input.value = `${selectedDates[0]} - ${selectedDates[1]}`;
          calendar.style.display = 'none';
          input.style.display = 'flex';
          buttonDisplay.style.display = 'flex';
        });

        cancelBtn.addEventListener('click', () => {
          document.getElementById('form').reset();
          calendar.style.display = 'none';
          input.style.display = 'flex';
          buttonDisplay.style.display = 'flex';
        });
      });
    });

    const months = document.querySelectorAll('select');
    let month;
    months.forEach(() => {
      const selectMonths = document.getElementById('selectMonths');
      month = selectMonths.options[select.selectedIndex].text;
    });
  };

  toggleButton.addEventListener('click', toggleMode);

  const year = document.querySelector('.year p');
  const currentYear = date.getFullYear();
  let selectedYear = currentYear;
  year.innerHTML = currentYear;
  
  btnPrev.addEventListener('click', () => {
    if (selectedYear > 1970) {
      year.innerHTML = --selectedYear;
      const select = document.querySelector('select');
      const monthIndex = +select.value;
      const totalDaysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
      const totalPrevMonthDays = new Date(selectedYear, monthIndex, 0).getDate();
      const firstWeekDay = new Date(selectedYear, monthIndex, 1).getDay();
      displayDaysInMonth(totalPrevMonthDays, firstWeekDay, totalDaysInMonth, monthIndex, selectedYear);
      modifyingBackgroundColor();
    };
  });

  btnNext.addEventListener('click', () => {
    year.innerHTML = ++selectedYear;
    const select = document.querySelector('select');
    const monthIndex = +select.value;
    const totalDaysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
    const totalPrevMonthDays = new Date(selectedYear, monthIndex, 0).getDate();
    const firstWeekDay = new Date(selectedYear, monthIndex, 1).getDay();
    displayDaysInMonth(totalPrevMonthDays, firstWeekDay, totalDaysInMonth, monthIndex, selectedYear);
    modifyingBackgroundColor();
  });

  months.forEach((m) => {
    if (m.value == currentMonth) {
      m.setAttribute('selected', 'selected');
    }
  });

  select.addEventListener('click', (el) => { 
    const year = document.querySelector('.year p');
    const yearValue = +year.innerText;
    const monthIndex = +el.target.value;
    const totalDaysInMonth = new Date(yearValue, monthIndex + 1, 0).getDate();
    const totalPrevMonthDays = new Date(yearValue, monthIndex, 0).getDate();
    const firstWeekDay = new Date(yearValue, monthIndex, 1).getDay();
    displayDaysInMonth(totalPrevMonthDays, firstWeekDay, totalDaysInMonth, monthIndex, yearValue);
    modifyingBackgroundColor();
  });

  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalPrevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const firstWeekDay = new Date(currentYear, currentMonth, 1).getDay();

  const displayDaysInMonth = (totalPrevMonthDays, firstWeekDay, totalDaysInMonth, selectedMonth, selectedYear) => {
    containerDays.innerHTML = '';

    let days = [];
    if (firstWeekDay !== 0) {
      days = [...days, ...Array.from({ length: firstWeekDay }, (_, i) => i + totalPrevMonthDays - firstWeekDay + 1)];
    }

    days = [...days, ...Array.from({ length: totalDaysInMonth }, (_, i) => i + 1)];
    const daysLength = days.length;
    const currentDate = date.getDate();
    const currentDateIndex = days.findIndex((day, index) => index > firstWeekDay && day === currentDate);
    days = [...days, ...Array.from({ length: 42 - daysLength }, (_, i) => i + 1)];

    days.forEach((day, index) => {
      const div = document.createElement('div');
      if (index < firstWeekDay) {
        div.classList.add('prev-date');
      } else if (index >= daysLength) {
        div.classList.add('next-date');
      } else if (index === currentDateIndex && (currentMonth === selectedMonth && currentYear === selectedYear)) {
        div.classList.add('today');
      } else {
        div.classList.add('current-date');
      }

      div.append(day);
      containerDays.append(div);
    });

    styleCells(year.innerText);
    return days;
  }
  
  displayDaysInMonth(totalPrevMonthDays, firstWeekDay, totalDaysInMonth, currentMonth, currentYear);
};