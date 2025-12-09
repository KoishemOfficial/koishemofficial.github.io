const files = document.querySelectorAll('.file');
  const contentBlocks = document.querySelectorAll('.content > div');

  function showContent(targetId) {
    contentBlocks.forEach(block => block.classList.remove('active'));
    const target = document.getElementById(targetId);
    if(target) target.classList.add('active');
  }

  files.forEach(file => {
    file.addEventListener('click', () => {
      files.forEach(f => f.classList.remove('active'));
      file.classList.add('active');

      const targetId = file.dataset.target;
      showContent(targetId);
    });
  });

  document.querySelector('.file[data-target="main"]').click();

function setLang(lang) {
    fetch(`lang/${lang}.json`)
      .then(r => {
        if (!r.ok) throw new Error('JSON not found.');
        return r.json();
      })
      .then(data => {
        document.querySelectorAll("[data-translate]").forEach(el => {
          const key = el.getAttribute("data-translate");
          el.textContent = data[key] || key;
        });
      })
      .catch(err => console.error(err));
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });