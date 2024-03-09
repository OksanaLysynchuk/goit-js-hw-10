import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.value');

let userSelectedDate = new Date();

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

function handleDateSelection(selectedDates) {
  userSelectedDate = selectedDates[0];
  const now = Date.now();

  if (userSelectedDate < now) {
    iziToast.error({
      message: 'Please choose a date in the future',
    });
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateSelection,
  clickOpens: true,
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.interval = null;
    this.endTime = null;
  }

  start() {
    this.endTime = userSelectedDate.getTime();
    const now = Date.now();
    const timeLeft = this.endTime - now;

    if (timeLeft <= 0) {
      this.stop();
      return;
    }

    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = this.endTime - currentTime;
      const time = convertMs(timeLeft);

      this.onTick(time);

      if (timeLeft <= 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    const time = convertMs(0);
    this.onTick(time);
    startBtn.disabled = false;
    datetimePicker.disabled = false;
  }
}

const timer = new Timer({
  onTick: updateTimer.bind(this),
});

startBtn.addEventListener('click', () => {
  timer.start();
  startBtn.disabled = true;
  datetimePicker.disabled = true;
});
