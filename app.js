var express = require('express');
const path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/lift-status', (req, res) => {
    const liftStatuses = {
        1: { status: '🎉Работает🎉', lastUpdated: '2025-01-24T09:18:00.000Z' },
        2: { status: '😭Не работает😭', lastUpdated: '2023-05-21T00:00:00.000Z' },
        3: { status: '😭Не работает😭', lastUpdated: '2023-12-14T12:34:56.789Z' }
    };
    res.json(liftStatuses);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});