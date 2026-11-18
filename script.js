// ---------------------------------------------------------------------------
// Business details: edit these once and they update across the page and chat.
// ---------------------------------------------------------------------------
const TRADES = ["Demolition", "Framing", "Carpentry", "Painting", "Drywall", "Plumbing", "Concrete"];

const BUSINESS = {
  name: "Byother Construction",
  phone: "(407) 434-1825",
  email: "info@byother.net",
  jobsEmail: "job@byother.net",         // where job applicants write to
  address: "184 East Liberty Street, Hernando, FL 34442",
  area: "Central Florida — including Orlando, Tampa, Jacksonville and the surrounding area",
  license: "GC License # CBC1265846 — fully insured",
  founded: 2008,
  hours: "Mon–Sat, 7am–6pm",

  // Open positions: add, remove or reword these and the page, chat bot and
  // application flow all update. "pay" is shown on the card and given to the
  // chat bot when applicants ask about compensation.
  openings: [
    {
      title: "General Labor",
      pay: "$20/hr+, depending on experience",
      text: "Hands-on support for our skilled trades on residential and commercial sites.",
      tasks: [
        "Site cleanup and debris removal",
        "Loading, unloading and moving materials",
        "Assisting carpenters, painters and other trades",
        "Basic demo work",
      ],
      requirements: ["Willing to learn, reliable and on time", "Able to lift 50+ lbs and work outdoors", "Reliable transportation"],
    },
    {
      title: "Carpenter — Rough Framing / Finish Carpentry",
      pay: "$25–35/hr+, depending on experience",
      text: "Framing and finish carpentry on residential and commercial jobs.",
      tasks: ["Framing layout and installation", "Trim, doors, cabinetry and finish work", "Reading and working from plans"],
      requirements: ["Experience in rough framing or finish carpentry", "Own tools", "Able to read plans"],
    },
    {
      title: "Foreman",
      pay: "Salary, depending on experience",
      text: "Leads a crew through a project from start to finish.",
      tasks: ["Runs the day-to-day on site", "Schedules and coordinates the crew and subs", "Keeps quality, safety and the client updated"],
      requirements: ["Prior lead/foreman experience", "Comfortable across multiple trades", "Strong communication"],
    },
  ],

  // Requirements shown under the open positions (apply to every role).
  jobRequirements: [
    "Reliable transportation",
    "Willing to learn and grow with the company",
    "Able to travel for out-of-town jobs when needed: hotel during the week, home on weekends",
  ],

  // Current project gallery. Add a handful of the best photos — a trade in
  // progress and the finished product — not every photo from the job.
  // Put image files in images/current/ and list them here:
  //   { src: "images/current/day1-framing.jpg", caption: "Framing — day 1" },
  currentProject: {
    note: "We'll post photos here as the current job progresses — from framing to finished space.",
    photos: [],
  },
};

// --- Fill in business details ----------------------------------------------
const $ = (sel) => document.querySelector(sel);
const telHref = "tel:" + BUSINESS.phone.replace(/[^\d+]/g, "");

$('[data-biz="phone-link"]').textContent = BUSINESS.phone;
$('[data-biz="phone-link"]').href = telHref;
$('[data-biz="email-link"]').textContent = BUSINESS.email;
$('[data-biz="email-link"]').href = "mailto:" + BUSINESS.email;
$('[data-biz="phone-btn"]').href = telHref;
$('[data-biz="email-btn"]').href = "mailto:" + BUSINESS.email;
const jobsHref = "mailto:" + BUSINESS.jobsEmail + "?subject=" + encodeURIComponent("Job application");
$('[data-biz="jobs-btn"]').href = jobsHref;
$('[data-biz="trades-list"]').textContent = TRADES.join(", ").toLowerCase();
$('[data-biz="hours"]').textContent = BUSINESS.hours;
$('[data-biz="area"]').textContent = BUSINESS.area;
$('[data-biz="address"]').textContent = BUSINESS.address;
$('[data-biz="license"]').textContent = BUSINESS.license;
$("#year").textContent = new Date().getFullYear();

// --- Open positions ----------------------------------------------------------
const openingsEl = $("#openings");
BUSINESS.openings.forEach((job) => {
  const li = document.createElement("li");

  const pay = document.createElement("p");
  pay.className = "pay";
  pay.textContent = job.pay;

  const h = document.createElement("h3");
  h.textContent = job.title;

  const blurb = document.createElement("p");
  blurb.className = "blurb";
  blurb.textContent = job.text;

  const tasksBlock = document.createElement("div");
  tasksBlock.className = "sub";
  const tasksLabel = document.createElement("strong");
  tasksLabel.textContent = "You'll do";
  const tasksList = document.createElement("ul");
  job.tasks.forEach((t) => {
    const x = document.createElement("li");
    x.textContent = t;
    tasksList.append(x);
  });
  tasksBlock.append(tasksLabel, tasksList);

  const reqBlock = document.createElement("div");
  reqBlock.className = "sub";
  const reqLabel = document.createElement("strong");
  reqLabel.textContent = "What helps";
  const reqList = document.createElement("ul");
  job.requirements.forEach((t) => {
    const x = document.createElement("li");
    x.textContent = t;
    reqList.append(x);
  });
  reqBlock.append(reqLabel, reqList);

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.className = "btn btn-solid";
  applyBtn.textContent = "Apply";
  applyBtn.addEventListener("click", () => startApplyFlow(job.title));

  li.append(pay, h, blurb, tasksBlock, reqBlock, applyBtn);
  openingsEl.append(li);
});

const reqEl = $("#job-requirements");
BUSINESS.jobRequirements.forEach((r) => {
  const li = document.createElement("li");
  li.textContent = r;
  reqEl.append(li);
});

$("#start-apply-btn").addEventListener("click", () => startApplyFlow());

// --- Current project gallery -------------------------------------------------
function renderCurrentProject() {
  const grid = $("#current-project-gallery");
  const cp = BUSINESS.currentProject;
  $('[data-biz="current-project-note"]').textContent = cp.note;
  if (!cp.photos.length) {
    const fig = document.createElement("figure");
    fig.className = "tile tile-soon";
    const cap = document.createElement("figcaption");
    cap.textContent = "Photos coming soon — ask us in chat";
    fig.append(cap);
    grid.append(fig);
    return;
  }
  cp.photos.forEach((p) => {
    const fig = document.createElement("figure");
    fig.className = "tile";
    fig.style.backgroundImage = `url("${p.src}")`;
    fig.style.backgroundSize = "cover";
    fig.style.backgroundPosition = "center";
    const cap = document.createElement("figcaption");
    cap.textContent = p.caption;
    fig.append(cap);
    grid.append(fig);
  });
}
renderCurrentProject();

// --- Header turns solid after scrolling ---------------------------------------
const header = $("#site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// --- Mobile menu ------------------------------------------------------------
const nav = $("#nav");
const navToggle = $(".nav-toggle");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  header.classList.toggle("scrolled", open || window.scrollY > 40);
  navToggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// --- Contact form -----------------------------------------------------------
// With no server behind the site, the form opens the visitor's email app with
// the message filled in. To receive submissions directly, swap this for a form
// service (e.g. Formspree, Netlify Forms) or your own endpoint.
const form = $("#contact-form");
const formStatus = $("#form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.className = "form-status";
  if (!form.checkValidity()) {
    formStatus.textContent = "Please fill in your name, a valid email and project details.";
    formStatus.classList.add("error");
    return;
  }
  const d = Object.fromEntries(new FormData(form));
  const subject = `Quote request: ${d.service} (${d.name})`;
  const body =
    `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}\n` +
    `Type of work: ${d.service}\n\n${d.message}`;
  window.location.href =
    `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = "Your email app should open with the message ready to send.";
});

// --- Chat bot ---------------------------------------------------------------
// A scripted FAQ bot: each entry has keywords to match and an answer.
// Add, remove or reword entries to suit the business.
const FAQ = [
  {
    chip: "Jobs",
    keys: ["job", "hiring", "hire me", "career", "apply", "applicant", "application", "work for you", "employment", "resume", "vacanc", "position", "carpenter", "foreman", "labor", "laborer"],
    answer:
      "We're hiring: " + BUSINESS.openings.map((j) => j.title).join(", ") + ". We're looking for motivated, " +
      "responsible people willing to learn and grow with us. Experience in any of our trades (" +
      TRADES.join(", ").toLowerCase() + ") helps, but isn't required for every role.",
    link: { text: "Apply now", href: "#careers", onClick: () => startApplyFlow() },
  },
  {
    chip: "Services",
    keys: ["service", "offer", "what do you do", "do you do", "build", "framing", "frame", "carpentry", "buildout", "build-out", "build out", "interior", "drywall", "demo", "demolition", "plumbing", "plumber", "paint", "painting", "concrete", "residential", "remodel", "house", "home", "retail", "restaurant", "office", "tenant"],
    answer:
      "We handle residential and commercial work: framing, interior buildouts & remodels, drywall installation & finishing, " +
      "demolition, plumbing, painting and concrete. Tell us about your project and we'll let you know if it's a fit.",
    link: { text: "See our services", href: "#services" },
  },
  {
    chip: "Get a quote",
    keys: ["quote", "estimate", "price", "cost", "how much", "budget", "rate"],
    answer:
      "Every job is different, so we price after seeing the site — residential or commercial. Quotes are free and itemised. " +
      "Fill in the contact form on this page or call " + BUSINESS.phone + " to book a visit.",
    link: { text: "Go to the contact form", href: "#contact" },
  },
  {
    chip: "Design help",
    keys: ["design build", "design-build", "plan", "plans", "blueprint", "drawing", "architect", "spec the project", "help with plans", "draw up", "obtain plans"],
    answer:
      "Yes — we can help you develop or refine plans and specs as part of a design-build approach, so your project is " +
      "properly scoped before we ever start building.",
  },
  {
    chip: "Hours",
    keys: ["hour", "open", "close", "when are you", "weekend", "saturday", "sunday"],
    answer: "Our hours are " + BUSINESS.hours + ".",
  },
  {
    chip: "Service area",
    keys: ["area", "where", "location", "located", "travel", "near", "city", "town", "tampa", "jacksonville", "orlando", "florida"],
    answer: "We work throughout " + BUSINESS.area + " — on residential and commercial projects alike. Tell us your location and we'll confirm.",
  },
  {
    chip: "Our office",
    keys: ["address", "office", "headquarters", "hernando", "visit you"],
    answer: "Our office is at " + BUSINESS.address + ".",
  },
  {
    chip: "Contact",
    keys: ["contact", "phone", "call", "email", "reach", "talk", "speak", "human", "person"],
    answer: "You can call us on " + BUSINESS.phone + " or email " + BUSINESS.email + ". You can also use the contact form on this page.",
    link: { text: "Go to the contact form", href: "#contact" },
  },
  {
    keys: ["pay", "salary", "wage", "wages", "how much do you pay", "hourly", "compensation", "how much does it pay"],
    answer:
      "General Labor: $20/hr+ (DOE). Carpenter — rough framing/finish carpentry: $25–35/hr+ (DOE). Foreman: salary, DOE. " +
      "Exact pay depends on experience — want someone from our team to reach out with specifics for you?",
  },
  {
    keys: ["how long", "timeline", "schedule", "start", "available", "availability", "when can"],
    answer:
      "Timing depends on the size of the job and our current schedule. After a site visit we give you a start date and an expected finish date in writing.",
  },
  {
    keys: ["licen", "insur", "warrant", "guarantee", "bonded", "legit"],
    answer: "Yes — " + BUSINESS.license + ". Family-owned and veteran-led, serving Florida since " + BUSINESS.founded + ".",
  },
  {
    keys: ["permit", "ada", "code", "inspection"],
    answer: "We handle permitting as part of the job, and build to code (and ADA requirements on commercial buildouts).",
  },
  {
    keys: ["how long in business", "in business", "since when", "founded", "established", "years in business", "you been", "how old", "trusted since"],
    answer: "We've served Florida since " + BUSINESS.founded + " — over 40 years of combined industry experience across our team.",
  },
  {
    keys: ["project", "portfolio", "photo", "example", "gallery", "previous work", "current job", "what are you working on"],
    answer: "You can see our current job site and past projects in the Projects section.",
    link: { text: "View projects", href: "#current-project" },
  },
  { keys: ["hello", "hi ", "hey", "good morning", "good afternoon"], answer: "Hello! We handle residential and commercial work — how can we help with your project?" },
  { keys: ["thank", "cheers"], answer: "You're welcome! Anything else you'd like to know?" },
];

const FALLBACK =
  "I'm not sure about that one. For anything I can't answer, call " + BUSINESS.phone +
  " or leave a message through the contact form and we'll get back to you.";

const chat = $("#chat");
const chatLog = $("#chat-log");
const chatChips = $("#chat-chips");
const chatForm = $("#chat-form");
const chatInput = $("#chat-input");
let greeted = false;
const transcript = [];

function addMsg(text, who, link) {
  transcript.push((who === "user" ? "Visitor: " : "Bot: ") + text);
  const el = document.createElement("div");
  el.className = "msg " + who;
  el.textContent = text;
  if (link) {
    el.append("\n");
    const a = document.createElement("a");
    a.href = link.href || "#";
    a.textContent = link.text;
    a.addEventListener("click", (e) => {
      if (link.onClick) {
        e.preventDefault();
        link.onClick();
      } else {
        toggleChat(false);
      }
    });
    el.append(a);
  }
  chatLog.append(el);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function findAnswer(text) {
  const q = " " + text.toLowerCase() + " ";
  let best = null, bestScore = 0;
  for (const item of FAQ) {
    const score = item.keys.filter((k) => q.includes(k)).length;
    if (score > bestScore) { best = item; bestScore = score; }
  }
  return best;
}

function ask(text, item) {
  addMsg(text, "user");
  const hit = item || findAnswer(text);
  setTimeout(() => {
    if (hit) addMsg(hit.answer, "bot", hit.link);
    else addMsg(FALLBACK, "bot", { text: "Go to the contact form", href: "#contact" });
  }, 350);
}

function toggleChat(open) {
  chat.hidden = !open;
  if (open && !greeted) {
    greeted = true;
    addMsg("Hi! I'm the " + BUSINESS.name + " assistant — we handle residential and commercial work. Ask a question or pick a topic below.", "bot");
  }
  if (open) chatInput.focus();
}

function renderChips(options) {
  chatChips.innerHTML = "";
  options.forEach(({ label, onClick }) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.addEventListener("click", onClick);
    chatChips.append(b);
  });
}

function renderDefaultChips() {
  renderChips(FAQ.filter((f) => f.chip).map((f) => ({ label: f.chip, onClick: () => ask(f.chip, f) })));
}

$("#chat-open").addEventListener("click", () => toggleChat(chat.hidden));
$("#chat-close").addEventListener("click", () => toggleChat(false));
$("#chat-email").addEventListener("click", () => {
  const body = transcript.length ? transcript.join("\n\n") : "(No conversation yet.)";
  window.location.href =
    "mailto:" + BUSINESS.email + "?subject=" + encodeURIComponent("Website chat transcript") +
    "&body=" + encodeURIComponent(body);
});

// --- Job application flow ----------------------------------------------------
// Walks an applicant through the same questions as a form (position, name,
// phone, trade experience, years, notes), one at a time, with clickable
// options where it helps. If they ask a question mid-flow (pay, etc.) we
// answer it and re-ask the same step, instead of losing their place.
const FLOW_STEPS = [
  {
    key: "position",
    prompt: "Which position are you interested in?",
    chips: () => BUSINESS.openings.map((o) => ({ label: o.title, value: o.title })).concat([{ label: "Not sure yet", value: "Not sure yet" }]),
  },
  {
    key: "name",
    prompt: () => "Great. What's your name?",
    chips: null,
  },
  {
    key: "phone",
    prompt: (a) => `Thanks${a.name ? ", " + a.name : ""}! What's the best phone number to reach you?`,
    chips: null,
  },
  {
    key: "trades",
    prompt: () => "Do you have experience in any of these trades? Pick one, or type a few separated by commas.",
    chips: () => TRADES.map((t) => ({ label: t, value: t })).concat([{ label: "None yet — willing to learn", value: "None yet — willing to learn" }]),
  },
  {
    key: "years",
    prompt: "About how many years of experience do you have?",
    chips: () => ["0–1 years", "2–4 years", "5–9 years", "10+ years"].map((v) => ({ label: v, value: v })),
  },
  {
    key: "notes",
    prompt: "Anything else you'd like us to know — availability, certifications, etc.?",
    chips: () => [{ label: "Nothing else", value: "—" }],
  },
];

const flow = { active: false, stepIndex: 0, answers: {} };
const QUESTION_PATTERN = /\?|pay|salary|wage|compensation|how much/i;

function startApplyFlow(presetPosition) {
  toggleChat(true);
  flow.active = true;
  flow.answers = {};
  flow.stepIndex = 0;
  if (presetPosition) {
    flow.answers.position = presetPosition;
    flow.stepIndex = 1;
  }
  addMsg("Let's get your application started" + (presetPosition ? " for " + presetPosition : "") + ".", "bot");
  showFlowStep();
}

function showFlowStep() {
  const step = FLOW_STEPS[flow.stepIndex];
  if (!step) { finishFlow(); return; }
  const prompt = typeof step.prompt === "function" ? step.prompt(flow.answers) : step.prompt;
  addMsg(prompt, "bot");
  renderChips(step.chips ? step.chips(flow.answers).map((c) => ({ label: c.label, onClick: () => flowReceiveChip(c.value) })) : []);
}

function flowReceiveChip(value) {
  addMsg(value, "user");
  flow.answers[FLOW_STEPS[flow.stepIndex].key] = value;
  flow.stepIndex++;
  setTimeout(showFlowStep, 300);
}

function flowReceiveText(text) {
  addMsg(text, "user");
  if (QUESTION_PATTERN.test(text)) {
    const hit = findAnswer(text);
    setTimeout(() => {
      if (hit) {
        addMsg(hit.answer, "bot", hit.link);
      } else {
        addMsg(
          "I'm not sure about that one. Want someone from our team to reach out and answer it directly? " +
          "Just say yes and include your phone number or email.",
          "bot"
        );
      }
      setTimeout(showFlowStep, 400);
    }, 350);
    return;
  }
  flow.answers[FLOW_STEPS[flow.stepIndex].key] = text;
  flow.stepIndex++;
  setTimeout(showFlowStep, 350);
}

function finishFlow() {
  flow.active = false;
  const a = flow.answers;
  const position = a.position || "Not specified";
  const lines = [
    "Position: " + position,
    "Name: " + (a.name || "-"),
    "Phone: " + (a.phone || "-"),
    "Trade experience: " + (a.trades || "-"),
    "Years of experience: " + (a.years || "-"),
    "Notes: " + (a.notes && a.notes !== "—" ? a.notes : "-"),
  ];
  addMsg("Here's what I've got:\n" + lines.join("\n"), "bot");
  const subject = "Job application: " + position + (a.name ? " — " + a.name : "");
  const href = "mailto:" + BUSINESS.jobsEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
  addMsg("Looks good? Send it our way and we'll be in touch.", "bot", { text: "Send application to " + BUSINESS.jobsEmail, href });
  renderChips([
    { label: "Start a new application", onClick: () => startApplyFlow() },
    { label: "Done, thanks", onClick: () => renderDefaultChips() },
  ]);
}

// --- Default chat input routing ----------------------------------------------
renderDefaultChips();
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = "";
  if (flow.active) flowReceiveText(text);
  else ask(text);
});
