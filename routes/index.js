var express = require('express');
var shell = require('shelljs');
var bodyParser = require('body-parser')
//var terminal = require('child_process').spawn('cmd');

var app = express()

// parse application/json
app.use(bodyParser.json())

var router = express.Router();
var child;

global.portNumbers = {};
var lastPortNumber = 4750;
var lastUsedBootstrapPort = 10000;
var lastChromeDriverPort = 20000;

/* GET home page. */
router.get('/', function(req, res, next) {
   res.sendFile("index.html");
});

router.post('/execute_shell', function(req, res, next) {
  
    console.log('yipppppppppppppppppeeeeeeeeee');
    //////////////////////////////////////
    
    /*var child = require('child_process').spawn('cmd1.bat', [], {detached: true}); 
         // use event hooks to provide a callback to execute when data are available: 
        child.stdout.on('data', function(data) {
        console.log(data.toString()); 
    });*/
    
    /*var spawn = require('child_process').spawn;
    var cmd  = spawn('cmd1.bat', [], {detached: false});
    var counter = 0;
    cmd.stdout.on('data', function(data) {
        counter ++;
      console.log('stdout: ' + data);
    });

    cmd.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
    });

    cmd.on('exit', function(code) {
      console.log('exit code: ' + code);
      console.log(counter);
    });*/
    
    /////////////////////////////////////
    var os = req.body.params.os;
    var deviceName = req.body.params.device;
    var timeout = req.body.params.timeout;
    var AppType = req.body.params.AppType;
    
    var command = "node . ";
    
    command = command + " -p "+lastPortNumber;
    
    if(os == 'Android'){
    
        command = command + " --device-name "+deviceName;
        command = command + " -bp "+lastUsedBootstrapPort;
        
        if(AppType == "WEB"){
            command = command + " --chromedriver-port "+lastChromeDriverPort;
        }
        
        lastPortNumber++;
        lastUsedBootstrapPort++;
        lastUsedBootstrapPort++;
        
        
    } else if(os == 'IOS') {
    
        command = command + " -U "+deviceName;
    }
    
    command = command + " --command-timeout "+timeout;
    
    console.log(command);
    
   // shell.exec("start cmd /k server.bat \""+command+"\"", {async:true});
    
    res.status(200).send();
    console.log('Strting cmd');    
});


router.get('/execute_hub', function(req, res, next) {
  
    //console.log(req.body.user);
   // terminal.stdin.write('echo user');
    
    shell.exec("start cmd /k server.bat ", {async:true});
    res.status(200).send();
});

router.get('/stop', function(req, res, next) {
  
    
    
});


module.exports = router;