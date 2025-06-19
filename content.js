// check if the current site is blocked
chrome.storage.local.get(["blockedSites", "blockingEnabled"], (result) => {
  const hostname = window.location.hostname;
  const blocked = result.blockedSites || [];
  const enabled = result.blockingEnabled ?? true;

  const isBlocked = blocked.some((domain) => hostname.includes(domain));
  if (enabled && isBlocked) {
    blockPage(hostname);
  }
});

// stop the current site from loading and replace the html content
function blockPage(site) {
  window.stop();
  document.documentElement.innerHTML = `
  <head><title>Blocked</title></head>
  <body style="font-family: sans-serif; background: #111; color: #eee; display: flex; align-items: center; justify-content: center; height: 100vh;">
  <div>
  <h1>⚠️ Access Blocked</h1>
  <p>The website <strong>${site}</strong> has been blocked by the WebsiteBlocker extension.</p>
  </div>
  </body>
  `;
}
