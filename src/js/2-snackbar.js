import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(this.elements['delay'].value);
  const state = document.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise
    .then(resolvedDelay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
      });
    })
    .catch(rejectedDelay => {
      iziToast.error({
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
      });
    });
});
