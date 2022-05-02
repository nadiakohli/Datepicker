window.onload = () => {
  const date = new Date();
  const buttonDisplay = document.getElementById('openButton');
  const calendar = document.getElementById('calendar');

  buttonDisplay.addEventListener('click', () => {
    calendar.style.display = 'flex';
    buttonDisplay.style.display = 'none';
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
  
    el.currentTarget.classList.toggle('active');
    isDarkMode = !isDarkMode;
    const active = el.currentTarget.classList.contains('active');
    const color = active ? 'black' : 'white';
    if (today) {
      today.style.backgroundColor = active ? 'salmon' : '';
    }
    datepicker.style.backgroundColor = active ? 'white' : '';
    datepicker.style.color = color;
    btnPrev.style.color = color;
    btnNext.style.color = color;
    weekdays.classList.toggle('weekdays-light');
    containerDays.classList.toggle('days-light');
    select.style.color = color;

    months.forEach((opt) => {
      opt.style.backgroundColor = active ? '#fa80729a' : '';
    });

    toggleLabel.style.color = color;
    styleCells();
    days.forEach((day) => {
      if (day.classList.contains('active')) {
        day.style.backgroundColor = isDarkMode ? '#4d4c5a' : 'salmon';
      }
    })
  };

  const styleCells = () => {
    const days = document.querySelectorAll('.current-date, .today');
    days.forEach((day1, index1) => {
      day1.addEventListener('click', (el) => {
        el.currentTarget.classList.add('active');
        el.currentTarget.style.backgroundColor = isDarkMode ? '#4d4c5a' : 'salmon';
        days.forEach((day2, index2) => {
          if (index1 !== index2) {
            day2.classList.remove('active');
            if (day2.classList.contains('today')) {
              day2.style.backgroundColor = isDarkMode ? '' : 'salmon';
            } else {
              day2.style.backgroundColor = '';
            }
          };
        });
      });
    });
  }

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
  })

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

    styleCells();

    return days;
  }
  
  displayDaysInMonth(totalPrevMonthDays, firstWeekDay, totalDaysInMonth, currentMonth, currentYear);
};