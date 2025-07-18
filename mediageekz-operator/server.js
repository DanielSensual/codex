const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const port = process.env.PORT || 3000;
const appointmentsFile = path.join(__dirname, 'appointments.json');

function saveAppointment(transcription) {
  const record = { transcription, timestamp: new Date().toISOString() };
  let list = [];
  if (fs.existsSync(appointmentsFile)) {
    try {
      list = JSON.parse(fs.readFileSync(appointmentsFile, 'utf8'));
    } catch (_) {
      list = [];
    }
  }
  list.push(record);
  fs.writeFileSync(appointmentsFile, JSON.stringify(list, null, 2));
}

function twiml(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<Response>${content}</Response>`;
}

function voiceResponse() {
  return twiml(
    `<Gather input="speech" timeout="5" action="/schedule">` +
      `<Say>Thank you for calling Mediageekz real estate. Please say your name and the time you would like to schedule an appointment.</Say>` +
    `</Gather>` +
    `<Say>We did not receive any input. Goodbye!</Say>`
  );
}

function scheduleResponse() {
  return twiml('<Say>Thank you. We will get back to you shortly to confirm your appointment.</Say>');
}

function handlePost(req, res, callback) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => callback(querystring.parse(body)));
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/voice') {
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(voiceResponse());
  } else if (req.method === 'POST' && req.url === '/schedule') {
    handlePost(req, res, data => {
      saveAppointment(data.SpeechResult || '');
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(scheduleResponse());
    });
  } else if (req.method === 'GET' && req.url === '/appointments') {
    if (fs.existsSync(appointmentsFile)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(fs.readFileSync(appointmentsFile));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('[]');
    }
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(port, () => console.log(`Server listening on port ${port}`));
