const defaultWebsites = {
  "home.web": [
    { "type": "head", "content": "Welcome to My Custom Browser" },
    { "type": "text", "content": "Click a link below to visit another site:" },
    { "type": "link", "text": "Go to News Site", "url": "news.web" }
  ],
  "news.web": [
    { "type": "head", "content": "Daily Tech News" },
    { "type": "text", "content": "Bundling HTML, CSS, and JS into an EXE works great!" },
    { "type": "link", "text": "Back to Home", "url": "home.web" }
  ],

  "home.sci": [
    { "type": "head", "content": "Welcome to SciBrowser" },
    { "type": "text", "content": "A lightweight, distraction-free browser for publishing and reading scientific work." },
    { "type": "link", "text": "Read Quantum Notes", "url": "quantum.sci" },
    { "type": "link", "text": "+ Publish New Scientific Page", "url": "upload.sci" }
  ],
  "quantum.sci": [
    { "type": "head", "content": "Notes on Quantum Entanglement" },
    { "type": "text", "content": "Entangled particles remain connected so that actions performed on one affect the other, regardless of distance." },
    { "type": "link", "text": "Back to SciBrowser Home", "url": "home.sci" }
  ]
}
