/* ===== EDIT EVERYTHING HERE ===== */
const CONFIG = {
  code: "9",
  voiceWords: ["love you", "love u", "luv you"],
  music: "song.mp3",
  sceneNames: ["Premiere", "Credits", "Countdown", "Gallery", "Reasons", "Letters", "The End"],
  lock: {
    eyebrow: "★ Admit One ★", small: "The World Premiere of", title: "OUR MOVIE",
    cast: "Starring Chinthana · Directed by Duduu",
    mic: "Tap & say “I love you”", listening: "Listening…",
    wrong: "Hmm… say “I love you”", noVoice: "Voice not available, type the code",
    codeHint: "or type the secret code", enter: "Enter"
  },
  credits: [
    { t: "Soma Production", c: "b" },
    { t: "Starring", c: "s" },
    { t: "Bubyyyyyyyyyyyy 🩷", c: "b big" },
    { t: "Advance happiest birthday 🎂🎉", c: "b mid" },
    { t: "Directed by your husband 😜🩷", c: "s" }
  ],
  countdown: {
    eyebrow: "Premiere · 9 Dec 2026", date: "2026-12-09T00:00:00",
    rows: [["PROD", "Our Movie"], ["DIRECTOR", "Duduu"], ["STAR", "Chinthana"]],
    labels: ["Days", "Hours", "Mins", "Secs"],
    line: "Advance happiest birthday goluuuu ♥️",
    doneLine: "Happy Birthday goluuuu ♥️"
  },
  gallery: {
    eyebrow: "Scene 4", title: "My Darling ❤️", hint: "Swipe to see all 5 photos", done: "✓ You saw them all! Tap › to continue",
    photos: [
      { src: "photos/1.jpg", caption: "Babyy" },
      { src: "photos/2.jpg", caption: "Sweety" },
      { src: "photos/3.jpg", caption: "Hotty" },
      { src: "photos/4.jpg", caption: "Cutie" },
      { src: "photos/5.jpg", caption: "I love you 😘" }
    ]
  },
  reasons: {
    eyebrow: "Scene 5", title: "Reasons I Love You", hint: "Tap a ticket to flip it",
    list: [
      "Your smile fixes my worst days",
      "The way you laugh at my silly jokes",
      "You care so deeply about everyone",
      "You're my calm in every storm",
      "Even your angry face is cute",
      "With you, home is a person"
    ]
  },
  letters: {
    eyebrow: "Scene 6", title: "A Letter For You",
    lines: [
      "Heyy bubyyy",
      "Adv hpy birday sweety ❤️",
      "I love you soo much bubduuuuuu ❤️",
      "You make my everyday beautiful with your geaorgeaous smile and voice",
      "I love you 💕 babyyy",
      "You are my home"
    ]
  },
  end: {
    eyebrow: "Final Scene", title: "THE END", sub: "...or just the beginning",
    message: "Advance happiest birthday babyyyyyy, I love you, and I will always try my bestestest to keep you happy",
    sign: "— Duduu", replay: "↻ Replay"
  }
};
/* ================================= */

const C = CONFIG, N = 7, pad = n => String(n).padStart(2, "0");
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const E = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const head = o => `<div class="eyebrow fi">${E(o.eyebrow)}</div><h2 class="fi" style="--d:1">${E(o.title)}</h2>`;

const scenes = [
/* 0 lock */
`<div class="ticket fi" id="tk">
  <div class="t-main nb2"><div class="eyebrow">${E(C.lock.eyebrow)}</div><div class="sm">${E(C.lock.small)}</div><h1>${E(C.lock.title)}</h1><div class="sm">${E(C.lock.cast)}</div></div>
  <div class="t-stub nt">
    <button id="mic" class="mic" aria-label="Speak">🎤</button>
    <div class="mt">${E(C.lock.mic)}</div><div id="vs"></div>
    <div class="code"><span>${E(C.lock.codeHint)}</span><input id="code" inputmode="numeric" maxlength="6" autocomplete="off"><button id="go" class="btn">${E(C.lock.enter)}</button></div>
  </div></div>`,
/* 1 credits */
`<div class="reel"><div id="credits" class="credits"></div></div>`,
/* 2 countdown */
`<div class="eyebrow fi">${E(C.countdown.eyebrow)}</div>
 <div class="clap fi" style="--d:1"><div class="arm"></div><div class="board">
  <div class="rows">${C.countdown.rows.map(r => `<span>${E(r[0])}</span><b>${E(r[1])}</b>`).join("")}</div>
  <div class="count">${C.countdown.labels.map((l, i) => `<div><b id="cd${i}">00</b><small>${E(l)}</small></div>`).join("")}</div>
 </div></div>
 <p class="cline fi" style="--d:3" id="cline">${E(C.countdown.line)}</p>`,
/* 3 gallery */
`${head(C.gallery)}
 <div class="swrap fi" style="--d:2"><div class="strip" id="strip" data-noswipe>${C.gallery.photos.map(p => `<div class="frame"><img src="${E(p.src)}" alt=""><div class="cap">${E(p.caption)}</div></div>`).join("")}</div><div class="nudge" id="nudge">›</div></div>
 <div class="dots" id="dots">${C.gallery.photos.map(() => "<i></i>").join("")}</div>
 <div class="shint" id="sh"></div>`,
/* 4 reasons */
`${head(C.reasons)}
 <div class="grid fi" style="--d:2">${C.reasons.list.map((r, i) => `<div class="card"><div class="in"><div class="face front nv"><span class="mini">ADMIT ONE</span><b class="serif">No. ${pad(i + 1)}</b><span class="mini">TAP TO FLIP</span></div><div class="face back nv"><p>${E(r)}</p></div></div></div>`).join("")}</div>
 <div class="hint">${E(C.reasons.hint)}</div>`,
/* 5 letter */
`${head(C.letters)}
 <div class="letter">${C.letters.lines.map((l, i) => `<p class="fi ln${i === 0 ? " first" : ""}" style="--d:${i + 2}">${E(l)}</p>`).join("")}</div>`,
/* 6 end */
`<div class="end" style="display:contents">
 <div class="eyebrow fi">${E(C.end.eyebrow)}</div>
 <h1 class="fi" style="--d:1">${E(C.end.title)}</h1>
 <div class="sub fi" style="--d:3">${E(C.end.sub)}</div>
 <div class="msg fi" style="--d:5">${E(C.end.message)}</div>
 <div class="sign fi" style="--d:6">${E(C.end.sign)}</div>
 <button class="btn fill fi" style="--d:7" id="replay">${E(C.end.replay)}</button></div>`
];

const stage = $("#stage");
stage.insertAdjacentHTML("afterbegin", scenes.map((h, i) => `<section class="scene" id="s${i}">${h}</section>`).join(""));
$("#prog").innerHTML = "<i></i>".repeat(N);

let cur = 0, locked = true, run = 0;

function go(i) {
  if (i < 0 || i >= N || (locked && i > 0) || (!locked && i < 1)) return;
  if (cur === 3 && i > 3 && !galleryDone) { const sh = $("#sh"); sh.classList.remove("shake"); void sh.offsetWidth; sh.classList.add("shake"); return; }
  cur = i;
  if (i !== 1) run++;
  $$(".scene").forEach((s, k) => { s.classList.toggle("active", k === i); s.classList.toggle("prev", k < i); });
  $$("#prog i").forEach((p, k) => p.classList.toggle("done", k <= i));
  $("#nav").classList.toggle("off", locked);
  $("#sname").textContent = i ? `Scene ${i}/${N - 1} · ${C.sceneNames[i]}` : "";
  $("#prev").disabled = i <= 1;
  $("#next").disabled = i >= N - 1 || (i === 3 && !galleryDone);
  if (i === 1) typeCredits();
  if (i === 3) { $("#strip").scrollLeft = 0; updSeen(); }
  if (i === 4) $$(".card").forEach(c => c.classList.remove("flip"));
  if (i === 5) $$(".env").forEach(e => e.classList.remove("open"));
}

/* lock */
function unlock() { if (!locked) return; locked = false; playMusic(); setTimeout(() => go(1), 350); }
function tryCode() {
  if ($("#code").value.trim() === C.code) return unlock();
  $("#vs").textContent = C.lock.wrong;
  const t = $("#tk"); t.classList.remove("shake"); void t.offsetWidth; t.classList.add("shake");
}
function listen() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const vs = $("#vs"), mic = $("#mic");
  if (!SR) { vs.textContent = C.lock.noVoice; return; }
  const rec = new SR(); rec.lang = "en-IN"; rec.interimResults = true;
  let ok = false;
  rec.onstart = () => { mic.classList.add("on"); vs.textContent = C.lock.listening; };
  rec.onresult = e => {
    const t = [...e.results].map(r => r[0].transcript).join(" ").toLowerCase();
    if (C.voiceWords.some(w => t.includes(w))) { ok = true; rec.stop(); unlock(); }
    else vs.textContent = "“" + t + "”";
  };
  rec.onerror = () => { vs.textContent = C.lock.noVoice; };
  rec.onend = () => { mic.classList.remove("on"); if (!ok && vs.textContent === C.lock.listening) vs.textContent = C.lock.wrong; };
  try { rec.start(); } catch (_) {}
}
$("#mic").onclick = listen;
$("#go").onclick = tryCode;
$("#code").onkeydown = e => { if (e.key === "Enter") tryCode(); };

/* credits typing */
async function typeCredits() {
  const my = ++run, box = $("#credits"); box.innerHTML = "";
  await sleep(400);
  for (const l of C.credits) {
    const p = document.createElement("p"); p.className = l.c + " cur"; box.appendChild(p);
    for (const ch of l.t) { if (my !== run) return; p.textContent += ch; await sleep(l.c.includes("b") ? 55 : 38); }
    p.classList.remove("cur"); await sleep(350);
  }
}

/* countdown */
function tick() {
  const d = new Date(C.countdown.date) - Date.now();
  const v = d > 0 ? [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60] : [0, 0, 0, 0];
  v.forEach((x, i) => { $("#cd" + i).textContent = pad(x); });
  if (d <= 0) $("#cline").textContent = C.countdown.doneLine;
}
tick(); setInterval(tick, 1000);

/* gallery */
$$(".frame img").forEach(img => img.onerror = () => {
  const d = document.createElement("div"); d.className = "ph"; d.textContent = "add " + img.getAttribute("src"); img.replaceWith(d);
});
const seen = new Set([0]); let galleryDone = false;
function updSeen() {
  const n = C.gallery.photos.length;
  $$("#dots i").forEach((d, k) => d.classList.toggle("on", seen.has(k)));
  if (seen.size >= n) galleryDone = true;
  $("#nudge").style.display = galleryDone ? "none" : "";
  const sh = $("#sh");
  sh.classList.toggle("ok", galleryDone);
  sh.textContent = galleryDone ? C.gallery.done : "👉 " + C.gallery.hint;
  if (cur === 3) $("#next").disabled = !galleryDone;
}
$("#strip").onscroll = e => {
  const s = e.target, w = s.firstElementChild.offsetWidth;
  seen.add(Math.min(C.gallery.photos.length - 1, Math.max(0, Math.round(s.scrollLeft / w))));
  updSeen();
};

$("#nudge").onclick = () => {
  const st = $("#strip"), w = st.firstElementChild.offsetWidth;
  if (st.scrollLeft + st.clientWidth >= st.scrollWidth - 5) st.scrollTo({ left: 0, behavior: "smooth" });
  else st.scrollBy({ left: w, behavior: "smooth" });
};

/* reasons */
$$(".card").forEach(c => c.onclick = () => c.classList.toggle("flip"));

/* letters */
$$(".env").forEach(el => el.onclick = () => {
  const L = C.letters.list[el.dataset.i]; el.classList.add("open");
  setTimeout(() => { $("#lt").textContent = L.label; $("#lp").textContent = L.text; $("#letterBox").classList.add("show"); }, 450);
});
$("#lc").onclick = () => $("#letterBox").classList.remove("show");

/* end */
$("#replay").onclick = () => go(1);

/* music */
const song = $("#song"), mb = $("#music");
song.src = C.music;
const setM = () => { mb.classList.toggle("on", !song.paused); mb.textContent = song.paused ? "♪ ▶" : "♪ ❚❚"; };
function playMusic() { song.play().then(setM).catch(setM); }
mb.onclick = () => { song.paused ? playMusic() : (song.pause(), setM()); };

/* navigation: buttons, swipe, keys */
$("#prev").onclick = () => go(cur - 1);
$("#next").onclick = () => go(cur + 1);
let sx = 0, sy = 0, skip = false;
addEventListener("touchstart", e => {
  const t = e.touches[0]; sx = t.clientX; sy = t.clientY;
  skip = !!e.target.closest("[data-noswipe],input") || $("#letterBox").classList.contains("show");
}, { passive: true });
addEventListener("touchend", e => {
  if (skip) return;
  const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) go(cur + (dx < 0 ? 1 : -1));
}, { passive: true });
addEventListener("keydown", e => {
  if (e.key === "ArrowRight") go(cur + 1);
  if (e.key === "ArrowLeft") go(cur - 1);
});

go(0);
setM();
