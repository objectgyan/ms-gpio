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

var Gpio = function () {

    this.GPIO_Path = "/sys/class/gpio";
    this.OUTPUT_MODE = "out";
    this.INPUT_MODE = "in";

    this.setUp = function (pinNo, direction) {
        if (arguments.length == 1) {
            direction = this.OUTPUT_MODE;
        }
        try {
            var currentGpioPath = path.join(this.GPIO_Path, concateString("gpio", gpioPins[pinNo]));
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
            var currentGpioPath = path.join(this.GPIO_Path, "export");
            fs.writeFileSync(currentGpioPath, pinNo);
        } catch (e) {
            errorLogger(e);
        }
    };

    this.unExportPin = function (pinNo) {
        try {
            var currentGpioPath = path.join(this.GPIO_Path, "unexport");
            fs.writeFileSync(currentGpioPath, pinNo);
        } catch (e) {
            errorLogger(e);
        }
    };

    this.setDirection = function (pinNo, direction) {
        try {
            var currentGpioPath = path.join(this.GPIO_Path, concateString("gpio", pinNo), "direction");
            fs.writeFileSync(currentGpioPath, direction);
        } catch (e) {
            errorLogger(e);
        }
    };

    this.read = function (pinNo) {
        var currentGpioPath = path.join(this.GPIO_Path, concateString("gpio", gpioPins[pinNo].toString()), "value");
        if (fs.existsSync(currentGpioPath)) {
            var pinValue = fs.readFileSync(currentGpioPath).toString();
            return pinValue.trim()==="1";
        }
        else
        {
            throw new Error('Pin '+pinNo +' has not been exported for write');
        }    
    }

    this.write = function (pinNo, value) {
        try {
            var currentGpioPath = path.join(this.GPIO_Path, concateString("gpio", gpioPins[pinNo]), "value");
            var valueToSet = value ? "1":"0";
            fs.writeFileSync(currentGpioPath, valueToSet);
        } catch (e) {
            errorLogger(e);
        }
    };
};

module.exports = new Gpio;