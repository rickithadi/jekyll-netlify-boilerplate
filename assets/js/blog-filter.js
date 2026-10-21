// Category filter for the blog post grid
(function() {
  'use strict';

  var buttons = document.querySelectorAll('.blog-filter');
  var posts = document.querySelectorAll('#blog-posts .insight-card');

  if (!buttons.length || !posts.length) {
    return;
  }

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.getAttribute('data-filter');

      buttons.forEach(function(b) {
        b.classList.remove('blog-filter--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('blog-filter--active');
      btn.setAttribute('aria-pressed', 'true');

      posts.forEach(function(post) {
        var category = post.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          post.style.display = '';
        } else {
          post.style.display = 'none';
        }
      });
    });
  });
})();
