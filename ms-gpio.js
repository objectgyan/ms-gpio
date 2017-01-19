var fs = require('fs');
var path = require('path');

var gpioPins = {
    '3': 2,
    '5': 3,
    '7': 4,
    '8': 14,
    '10': 15,
    '11': 17,
    '12': 18,
    '13': 27,
    '15': 22,
    '16': 23,
    '18': 24,
    '19': 10,
    '21': 9,
    '22': 25,
    '23': 11,
    '24': 8,
    '26': 7,
    '29': 5,
    '31': 6,
    '32': 12,
    '33': 13,
    '35': 19,
    '36': 16,
    '37': 26,
    '38': 20,
    '40': 21
};

//Helper methods
function concateString() {
    var path = "";
    for (arg in arguments) {
        path += arguments[arg];
    }
    return path;
}

function errorLogger(err) {
    if (typeof err === 'object') {
        if (err.message) {
            console.log('\nMessage: ' + err.message)
        }
        if (err.stack) {
            console.log('\nStacktrace:')
            console.log('====================')
            console.log(err.stack);
        }
    } else {
        console.log('dumpError :: argument is not an object');
    }
}

var gpio = function () {

    //GPIO Path is made injectable to allow Raspberry PI simulation on local environment
    var gpioPath = (arguments.length == 1 && arguments[0] != undefined) ? arguments[0] : "/sys/class/gpio";

    this.OutputMode = "out";
    this.InputMode = "in";

    this.setUp = function (pinNo, direction) {
        if (arguments.length == 1) {
            direction = this.OutputMode;
        }
        try {
            var currentGpioPath = path.join(gpioPath, concateString("gpio", gpioPins[pinNo]));
            if (!fs.existsSync(currentGpioPath)) {
                this.exportPin(gpioPins[pinNo]);
                this.setDirection(gpioPins[pinNo], direction);
            }
        } catch (e) {
            errorLogger(e);
        }
    };

    this.exportPin = function (pinNo) {
        try {
            var currentGpioPath = path.join(gpioPath, "export");
            fs.writeFileSync(currentGpioPath, pinNo);
        } catch (e) {
            errorLogger(e);
        }
    };

    this.unExportPin = function (pinNo) {
        try {
            var currentGpioPath = path.join(gpioPath, "unexport");
            fs.writeFileSync(currentGpioPath, pinNo);
        } catch (e) {
            errorLogger(e);
        }
    };

    this.setDirection = function (pinNo, direction) {
        try {
            var currentGpioPath = path.join(gpioPath, concateString("gpio", pinNo), "direction");
            fs.writeFileSync(currentGpioPath, direction);
        } catch (e) {
            errorLogger(e);
        }
    };

    this.read = function (pinNo) {
        try {
            var ledStatus = "-1";
            var currentGpioPath = path.join(gpioPath, concateString("gpio", gpioPins[pinNo].toString()), "value");
            if (fs.existsSync(currentGpioPath)) {
                ledStatus = fs.readFileSync(currentGpioPath).toString();
            }
            return ledStatus;
        } catch (e) {
            errorLogger(e);
        }
    }

    this.write = function (pinNo, value) {
        try {
            var currentGpioPath = path.join(gpioPath, concateString("gpio", gpioPins[pinNo]), "value");
            fs.writeFileSync(currentGpioPath, value);
        } catch (e) {
            errorLogger(e);
        }
    };
};

module.exports = gpio;