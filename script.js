const form = document.getElementById('certificateForm');
const fields = {
  recipientName: document.getElementById('recipientName'),
  eventName: document.getElementById('eventName'),
  achievement: document.getElementById('achievement'),
  organizer: document.getElementById('organizer'),
  certificateId: document.getElementById('certificateId'),
  issueDate: document.getElementById('issueDate'),
  accentColor: document.getElementById('accentColor')
};

const outputs = {
  recipientName: document.getElementById('outRecipient'),
  eventName: document.getElementById('outEvent'),
  achievement: document.getElementById('outAchievement'),
  organizer: document.getElementById('outOrganizer'),
  certificateId: document.getElementById('outId'),
  issueDate: document.getElementById('outDate')
};

const names = ['Aarav Mehta', 'Sara Ibrahim', 'Mia Thompson', 'Rohan Kapoor', 'Liam Rivera'];
const events = [
  'Global Event Leadership Summit 2026',
  'International Wedding Planning Expo',
  'City Culture and Music Festival',
  'Corporate Excellence Annual Gala'
];
const achievements = [
  'Outstanding Event Coordination & Management',
  'Exceptional Venue and Logistics Planning',
  'Remarkable Sponsorship & Stakeholder Management',
  'Best Multi-day Event Execution'
];

function formatDate(rawDate) {
  if (!rawDate) return new Date().toLocaleDateString(undefined, { dateStyle: 'long' });
  return new Date(rawDate + 'T00:00:00').toLocaleDateString(undefined, { dateStyle: 'long' });
}

function updateCertificate() {
  outputs.recipientName.textContent = fields.recipientName.value.trim() || 'Recipient Name';
  outputs.eventName.textContent = fields.eventName.value.trim() || 'Event Name';
  outputs.achievement.textContent = fields.achievement.value.trim() || 'Achievement';
  outputs.organizer.textContent = fields.organizer.value.trim() || 'Organization';
  outputs.certificateId.textContent = fields.certificateId.value.trim() || 'ID';
  outputs.issueDate.textContent = formatDate(fields.issueDate.value);

  const accent = fields.accentColor.value;
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-secondary', shiftColor(accent, 38));
}

function shiftColor(hex, amount) {
  const c = hex.replace('#', '');
  const num = parseInt(c, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateId() {
  const year = new Date().getFullYear();
  const code = Math.floor(1000 + Math.random() * 9000);
  return `EMS-${year}-${code}`;
}

document.getElementById('randomize').addEventListener('click', () => {
  fields.recipientName.value = randomItem(names);
  fields.eventName.value = randomItem(events);
  fields.achievement.value = randomItem(achievements);
  fields.certificateId.value = generateId();
  fields.issueDate.valueAsDate = new Date();
  updateCertificate();
});

form.addEventListener('input', updateCertificate);
fields.issueDate.valueAsDate = new Date();
updateCertificate();
