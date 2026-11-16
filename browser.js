const viewport = document.getElementById('viewport');
const urlInput = document.getElementById('url-input');
const goBtn = document.getElementById('go-btn');
const homeBtn = document.getElementById('home-btn');
const uploadNavBtn = document.getElementById('upload-nav-btn');

const renderer = {
  head(src) {
    const h1 = document.createElement('h1');
    h1.textContent = src;
    viewport.appendChild(h1);
  },
  text(src) {
    const p = document.createElement('p');
    p.textContent = src;
    viewport.appendChild(p);
  },
  linkTo(text, link) {
    const a = document.createElement('a');
    a.textContent = text;
    a.href = "#";
    a.onclick = (e) => {
      e.preventDefault();
      loadWebsite(link);
    };
    viewport.appendChild(a);
  }
};

const savedSites = JSON.parse(localStorage.getItem('sci_custom_sites') || '{}');
let allWebsites = { ...defaultWebsites, ...savedSites };

function loadWebsite(url) {
  url = url.trim().toLowerCase();
  urlInput.value = url;
  viewport.innerHTML = '';

  if (url === 'upload.sci') {
    renderUploadPage();
    return;
  }

  const pageData = allWebsites[url];

  if (!pageData) {
    renderer.head("404 - Page Not Found");
    renderer.text(`The scientific address "${url}" does not exist.`);
    renderer.linkTo("Return Home", "home.sci");
    return;
  }

  pageData.forEach(item => {
    if (item.type === 'head') renderer.head(item.content);
    if (item.type === 'text') renderer.text(item.content);
    if (item.type === 'link') renderer.linkTo(item.text, item.url);
  });
}

function renderUploadPage() {
  renderer.head("Publish to SciBrowser");
  renderer.text("Write your page using head(\"...\"), text(\"...\"), and linkTo(\"text\", \"url\"):");

  const form = document.createElement('div');
  form.className = 'upload-box';
  form.innerHTML = `
    <input type="text" id="site-name" spellcheck="false" placeholder="Website address (e.g., physics.sci)" />
    <textarea id="site-code" spellcheck="false" autocorrect="off" autocapitalize="off" placeholder='head("My Research Paper")\ntext("Here are my findings...")\nlinkTo("Back Home", "home.sci")'></textarea>
    <button id="publish-btn" class="accent-btn">Publish Website</button>
  `;
  viewport.appendChild(form);

  document.getElementById('publish-btn').onclick = () => {
    const siteName = document.getElementById('site-name').value.trim().toLowerCase();
    const rawCode = document.getElementById('site-code').value;

    if (!siteName) return alert("Please enter a website name!");

    const parsedInstructions = [];
    const lines = rawCode.split('\n');

    lines.forEach(line => {
      line = line.trim();
      const headMatch = line.match(/^head\(["'](.+?)["']\);?$/);
      const textMatch = line.match(/^text\(["'](.+?)["']\);?$/);
      const linkMatch = line.match(/^linkTo\(["'](.+?)["'],\s*["'](.+?)["']\);?$/);

      if (headMatch) parsedInstructions.push({ type: 'head', content: headMatch });
      if (textMatch) parsedInstructions.push({ type: 'text', content: textMatch });
      if (linkMatch) parsedInstructions.push({ type: 'link', text: linkMatch, url: linkMatch });
    });

    if (parsedInstructions.length === 0) {
      return alert("No valid head(), text(), or linkTo() functions found!");
    }

    allWebsites[siteName] = parsedInstructions;
    const currentSaved = JSON.parse(localStorage.getItem('sci_custom_sites') || '{}');
    currentSaved[siteName] = parsedInstructions;
    localStorage.setItem('sci_custom_sites', JSON.stringify(currentSaved));

    loadWebsite(siteName);
  };
}

goBtn.onclick = () => loadWebsite(urlInput.value);
urlInput.onkeydown = (e) => { if (e.key === 'Enter') loadWebsite(urlInput.value); };
homeBtn.onclick = () => loadWebsite('home.sci');
uploadNavBtn.onclick = () => loadWebsite('upload.sci');

// Start on home.sci
loadWebsite('home.sci');