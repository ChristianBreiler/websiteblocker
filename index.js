let blocked = [];

// load up all blocked sites from chrome storage into the blocked list
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blockedSites"], (result) => {
    blocked = result.blockedSites || [];
    renderList();
  });

  // block a site and add it to the html file
  document.getElementById("blockbutton").addEventListener("click", () => {
    let site = document.getElementById("inputfield").value.trim();
    if (site === "") return;
    let lowertext = site.toLowerCase();

    if (!blocked.includes(lowertext)) {
      blocked.push(lowertext);
      chrome.storage.local.set({ blockedSites: blocked }, renderList);
    }
    document.getElementById("inputfield").value = "";
  });
});

// render the list of all blocked websites as elements
function renderList() {
  const list = document.getElementById("blockedList");
  list.innerHTML = "";
  blocked.forEach((site, index) => {
    const li = document.createElement("li");
    li.textContent = site;

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.addEventListener("click", () => {
      const confirmDelete = confirm(
        `Are you sure you want to unblock "${blocked[index]}"?`
      );
      if (!confirmDelete) return;
      blocked.splice(index, 1);
      chrome.storage.local.set({ blockedSites: blocked }, renderList);
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}
