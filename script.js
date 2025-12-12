// Dark / Light Mode
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  themeBtn.innerHTML = newTheme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", newTheme);
});
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

// English Toggle (simple – full English page in future)
document.getElementById("langToggle").addEventListener("click", () => {
  alert("English version coming very soon! Stay tuned ❤️");
});

// Load latest 12 videos from your channel – works without API key
fetch("https://www.youtube.com/feeds/videos.xml?channel_id=UC" + "your-channel-id".split("@valerius-mh6ux")[1] || "valerius-mh6ux")
  .then(r => r.text())
  .then(str => new DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const grid = document.getElementById("videoGrid");
    const entries = data.querySelectorAll("entry");
    let html = "";
    entries.forEach((e, i) => {
      if (i >= 12) return;
      const id = e.querySelector("videoId").textContent;
      const title = e.querySelector("title").textContent;
      html += `
        <div class="col">
          <div class="card h-100 border-0 shadow-sm hover-shadow">
            <iframe height="200" src="https://www.youtube.com/embed/${id}" 
                    title="${title}" frameborder="0" allowfullscreen loading="lazy"></iframe>
            <div class="card-body">
              <p class="card-text small text-muted">${title.length > 80 ? title.substr(0,80)+"..." : title}</p>
            </div>
          </div>
        </div>`;
    });
    grid.innerHTML = html || "<p class='text-center'>ቪዲዮዎች በመጫን ላይ...</p>";
  })
  .catch(() => {
    document.getElementById("videoGrid").innerHTML = "<p class='text-center'>ቪዲዮዎች በቅርብ ጊዜ ይጫናሉ</p>";
  });
