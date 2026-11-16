// ---------------------------------------------------------------------------
// Business details: edit these once and they update across the page and chat.
// ---------------------------------------------------------------------------
const BUSINESS = {
  name: "Byother Construction",
  phone: "(407) 434-1825",
  email: "info@byother.net",
  jobsEmail: "job@byother.net",         // where job applicants write to
  address: "184 East Liberty Street, Hernando, FL 34442",
  area: "Central Florida (framing & buildouts); plumbing offered statewide, including Tampa, Orlando & Jacksonville",
  license: "GC License # CBC1265846 — fully insured",
  founded: 2008,
  // Open positions: add, remove or reword these and the page and chat bot update.
  openings: [
    { title: "Service Carpenter", text: "Carpentry repairs, punch-list and service work on customer sites." },
    { title: "Foreman", text: "Runs the job site day to day: leads the crew, keeps the schedule and the quality on track." },
  ],
  // Requirements shown under the open positions (apply to every role).
  jobRequirements: [
    "Your own tools",
    "Able to read plans",
    "Valid driver's license and reliable transportation",
    "Able to travel when a job requires it: hotel stays during the week, home on weekends",
  ],
  hours: "Mon–Sat, 7am–6pm",
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
$('[data-biz="jobs-link"]').textContent = BUSINESS.jobsEmail;
$('[data-biz="jobs-link"]').href = jobsHref;
const openingsEl = $("#openings");
BUSINESS.openings.forEach((job) => {
  const li = document.createElement("li");
  const h = document.createElement("h3");
  h.textContent = job.title;
  const p = document.createElement("p");
  p.textContent = job.text;
  const a = document.createElement("a");
  a.className = "btn btn-solid";
  a.textContent = "Apply";
  a.href = "mailto:" + BUSINESS.jobsEmail + "?subject=" + encodeURIComponent("Job application: " + job.title);
  li.append(h, p, a);
  openingsEl.append(li);
});
const reqEl = $("#job-requirements");
BUSINESS.jobRequirements.forEach((r) => {
  const li = document.createElement("li");
  li.textContent = r;
  reqEl.append(li);
});
$('[data-biz="hours"]').textContent = BUSINESS.hours;
$('[data-biz="area"]').textContent = BUSINESS.area;
$('[data-biz="address"]').textContent = BUSINESS.address;
$('[data-biz="license"]').textContent = BUSINESS.license;
$("#year").textContent = new Date().getFullYear();

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
    keys: ["job", "hiring", "hire me", "career", "apply", "applicant", "application", "work for you", "employment", "resume", "vacanc", "position", "carpenter", "foreman", "requirement", "qualif"],
    answer:
      (BUSINESS.openings.length
        ? "We're currently hiring: " + BUSINESS.openings.map((j) => j.title).join(", ") + ". "
        : "") +
      "You'll need: " + BUSINESS.jobRequirements.join("; ").toLowerCase() + ". " +
      "To apply, email " + BUSINESS.jobsEmail + " with your experience and availability.",
    link: { text: "See the hiring section", href: "#careers" },
  },
  {
    chip: "Services",
    keys: ["service", "offer", "what do you do", "do you do", "build", "framing", "frame", "buildout", "build-out", "build out", "interior", "drywall", "demo", "demolition", "plumbing", "plumber", "retail", "restaurant", "office", "tenant"],
    answer:
      "We handle commercial framing, interior buildouts, drywall installation & finishing, demolition and plumbing — for retail, restaurant and office spaces. Tell us about your project and we'll let you know if it's a fit.",
    link: { text: "See our services", href: "#services" },
  },
  {
    chip: "Get a quote",
    keys: ["quote", "estimate", "price", "cost", "how much", "budget", "rate"],
    answer:
      "Every job is different, so we price after seeing the site. Quotes are free and itemised. Fill in the contact form on this page or call " + BUSINESS.phone + " to book a visit.",
    link: { text: "Go to the contact form", href: "#contact" },
  },
  {
    chip: "Hours",
    keys: ["hour", "open", "close", "when are you", "weekend", "saturday", "sunday"],
    answer: "Our hours are " + BUSINESS.hours + ".",
  },
  {
    chip: "Service area",
    keys: ["area", "where", "location", "located", "travel", "near", "city", "town", "tampa", "jacksonville", "orlando", "statewide", "florida"],
    answer: "We work in " + BUSINESS.area + ". Not sure if you're covered? Tell us your location and we'll confirm.",
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
    answer: "We handle permitting as part of the job, and build to code and ADA requirements on every buildout.",
  },
  {
    keys: ["how long in business", "in business", "since when", "founded", "established", "years in business", "you been", "how old", "trusted since"],
    answer: "We've served Florida since " + BUSINESS.founded + " — over 40 years of combined industry experience across our team.",
  },
  {
    keys: ["project", "portfolio", "photo", "example", "gallery", "previous work"],
    answer: "You can see examples of our work in the Projects section.",
    link: { text: "View projects", href: "#gallery" },
  },
  { keys: ["hello", "hi ", "hey", "good morning", "good afternoon"], answer: "Hello! How can we help with your project?" },
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

function addMsg(text, who, link) {
  const el = document.createElement("div");
  el.className = "msg " + who;
  el.textContent = text;
  if (link) {
    el.append("\n");
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.text;
    a.addEventListener("click", () => toggleChat(false));
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
    addMsg("Hi! I'm the " + BUSINESS.name + " assistant. Ask a question or pick a topic below.", "bot");
  }
  if (open) chatInput.focus();
}

FAQ.filter((f) => f.chip).forEach((f) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = f.chip;
  b.addEventListener("click", () => ask(f.chip, f));
  chatChips.append(b);
});

$("#chat-open").addEventListener("click", () => toggleChat(chat.hidden));
$("#chat-close").addEventListener("click", () => toggleChat(false));
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = "";
  ask(text);
});
