var express = require('express');
const fs = require('fs');
const path = require('path');

var app = express();

app.use(express.json());
const liftsFilePath = path.join(__dirname, 'lifts.json');

function readLifts() {
    const data = fs.readFileSync(liftsFilePath, 'utf-8');
    return JSON.parse(data);
  }
  

  function writeLifts(data) {
    fs.writeFileSync(liftsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/lift-status', (req, res) => {
    const lifts = readLifts();
    res.json(lifts);
});

app.post('/api/lift-status-set', (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ error: 'Необходимы параметры id и status' });
    }

    const lifts = readLifts();

    if (!lifts[id]) {
        return res.status(404).json({ error: `Лифт с ID ${id} не найден` });
    }

    // Обновляем статус и дату
    lifts[id].status = status;
    lifts[id].lastUpdated = new Date().toISOString();

    writeLifts(lifts);

    res.json({ success: true, lift: lifts[id] });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});