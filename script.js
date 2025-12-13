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

      updateTOC();
    });
  });

  document.querySelector('.file[data-target="main"]').click();
  updateTOC();

  function switchFile(targetId) {
    files.forEach(f => f.classList.remove('active'));
    
    const file = document.querySelector(`.file[data-target="${targetId}"]`);
    if(file) file.classList.add('active');

    showContent(targetId);

    updateTOC();
}

let currentLang = null;
let isSwitchingLang = false;

function applyLang(data) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        el.textContent = data[key] || key;
    });
    updateTOC();
}

function setLang(lang, animated = true) {
    if (lang === currentLang || isSwitchingLang) return;

    const content = document.querySelector(".content");

    if (!animated) {
        fetch(`lang/${lang}.json`)
            .then(r => r.json())
            .then(data => {
                applyLang(data);
                currentLang = lang;
            });
        return;
    }

    isSwitchingLang = true;
    content.classList.add("fading");

    setTimeout(() => {
        fetch(`lang/${lang}.json`)
            .then(r => r.json())
            .then(data => {
                applyLang(data);
                currentLang = lang;
                localStorage.setItem("lang", lang);

                content.classList.remove("fading");
                isSwitchingLang = false;
            })
            .catch(err => {
                console.error(err);
                content.classList.remove("fading");
                isSwitchingLang = false;
            });
    }, 250);
}



  function updateTOC() {
    const active = document.querySelector(".content > div.active");
    const items = document.querySelector(".toc-items");

    items.innerHTML = "";

    if (!active) return;

    const headers = active.querySelectorAll("h1, h2, h3");

    headers.forEach((h, i) => {
        if (!h.id) h.id = "section_" + i;

        const item = document.createElement("div");
        item.className = "toc-item";

        const short = h.textContent.length > 15 
            ? h.textContent.slice(0, 15) + "…" 
            : h.textContent;

        item.textContent = short;

        item.onclick = () => {
            document.getElementById(h.id).scrollIntoView({
                behavior: "smooth"
            });
        };

        items.appendChild(item);
    });
}

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});