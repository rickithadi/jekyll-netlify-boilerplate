// Inline success/error feedback for the Netlify contact form
(function() {
  'use strict';

  var form = document.querySelector('form[name="contact"]');
  if (!form) {
    return;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var button = form.querySelector('button[type="submit"]');
    var originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending…';
    button.classList.add('is-loading');

    var data = new FormData(form);
    data.append('form-name', 'contact');

    fetch('/', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    })
      .then(function(res) {
        if (!res.ok) {
          throw new Error('Request failed');
        }
        form.innerHTML =
          '<p class="form-success">Thanks — your message is on its way. I\u2019ll reply shortly.</p>';
      })
      .catch(function() {
        button.disabled = false;
        button.textContent = originalText;
        button.classList.remove('is-loading');

        var error = form.querySelector('.form-error');
        if (!error) {
          error = document.createElement('p');
          error.className = 'form-error';
          form.appendChild(error);
        }
        error.textContent =
          'Something went wrong sending your message. Please email me directly at rickithadi@gmail.com.';
      });
  });
})();
