const fields = {
  recipient: document.getElementById("recipient"),
  event: document.getElementById("event"),
  title: document.getElementById("title"),
  achievement: document.getElementById("achievement"),
  date: document.getElementById("date"),
  id: document.getElementById("id"),
  organizer: document.getElementById("organizer"),
  venue: document.getElementById("venue"),
};

const outputs = {
  recipient: document.getElementById("cert-recipient"),
  event: document.getElementById("cert-event"),
  title: document.getElementById("cert-title"),
  achievement: document.getElementById("cert-achievement"),
  date: document.getElementById("cert-date"),
  id: document.getElementById("cert-id"),
  organizer: document.getElementById("org-name"),
  venue: document.getElementById("cert-venue"),
};

const themes = [
  ["#7f5bff", "#ff5fa0", "#ffc940", "#00d2ff"],
  ["#0047ff", "#00b6ff", "#4fffb0", "#ffe066"],
  ["#6a11cb", "#d4145a", "#ff8f00", "#2ec4b6"],
  ["#ff006e", "#fb5607", "#ffbe0b", "#3a86ff"],
];

const root = document.documentElement;

function formatDate(inputDate) {
  if (!inputDate) return "17 Sep 2026";

  const date = new Date(`${inputDate}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function syncCertificate() {
  outputs.recipient.textContent = fields.recipient.value || "Recipient Name";
  outputs.event.textContent = fields.event.value || "Event Name";
  outputs.title.textContent = fields.title.value || "Certificate Title";
  outputs.achievement.textContent =
    fields.achievement.value || "Achievement details";
  outputs.date.textContent = formatDate(fields.date.value);
  outputs.id.textContent = fields.id.value || "EMS-0000";
  outputs.organizer.textContent = fields.organizer.value || "Organization Name";
  outputs.venue.textContent = fields.venue.value || "Venue";
}

Object.values(fields).forEach((input) => {
  input.addEventListener("input", syncCertificate);
});

function randomizeTheme() {
  const selected = themes[Math.floor(Math.random() * themes.length)];
  root.style.setProperty("--accent-1", selected[0]);
  root.style.setProperty("--accent-2", selected[1]);
  root.style.setProperty("--accent-3", selected[2]);
  root.style.setProperty("--accent-4", selected[3]);
}

document.getElementById("randomize").addEventListener("click", randomizeTheme);
document.getElementById("print").addEventListener("click", () => window.print());

fields.date.value = new Date().toISOString().slice(0, 10);
syncCertificate();
