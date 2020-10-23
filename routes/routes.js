const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const SerialPort = require('serialport');
const readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/tty.usbserial-DA00VOAS', {
  baudRate: 9600,
  parser: new SerialPort.parsers.Readline('\r\n')
});

module.exports = (app) => {

  app.get(`/api/get_states`, async (req, res) => {
      console.log("getting states");
      var command = {'action': 'get_state'};
      port.write(JSON.stringify(command));
      const states = db.get('states').value();
      return res.status(200).send(states);
  });

  app.get(`/api/uv/:lum`, async (req, res) => {
    const { lum } = req.params;
    const states = db.get('states').value();
    return res.status(200).send(states);
  });

  app.get(`/api/off`, async (req, res) => {
    const states = db.get('states').value();
    return res.status(200).send(states);
  });


  app.get(`/api/rgb/:hex`, async (req, res) => {
    const { hex } = req.params;
    const id = shortid.generate();
    const users = db
      .get('users')
      .push({ id, name, lastName })
      .write();

    const user = db.get('users')
      .find({ id })
      .value();

    return res.status(201).send(
        {
            error: false,
            user
        });
    });


    var buffer = '';
    port.on('data', function (chunk) {
        buffer += chunk;
        var answers = buffer.split(/\n/); // Split data by new line character or smth-else
        buffer = answers.pop();
        if (answers.length > 0 && isJsonString(answers[0])) {
            var obj = JSON.parse(answers[0]);
            var entry = {};
            entry.timestamp = Date.now();
            entry.payload = obj.success ? obj.state : {"error": obj.error};
            processNewState(entry);
        }
        /*let received = data.toString("utf-8")
        console.log('Writing in db:', received);
        var jsonContents = JSON.parse(received);
        var entry = {};
        entry.timestamp = Date.now();
        entry.payload = data;
        db.get('states').push(entry);*/
    });
}

function processNewState(entry) {
    db.get('states').push(entry).write();
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isJson(val) {
    return val instanceof Array || val instanceof Object ? true : false;
}

// ES2015
var isJson = (val) => val instanceof Array || val instanceof Object ? true : false;
