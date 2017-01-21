ms-gpio
==========

Manage Raspberry Pi GPIO pins with node.js & Raspbian (Linux) OS

## Setup

1. Raspbian OS must be preloaded/installed on Raspberry PI device. For installation refer https://www.raspberrypi.org/learning/software-guide/quickstart

2. Latest version of node be installed on your Raspberry PI device, follow below steps to update node to latest version:
```
curl -sLS https://apt.adafruit.com/add | sudo bash
sudo apt-get install node
```

**ms-gpio** module can then be installed with npm:
```
npm install ms-gpio
```

## Usage
In order to work with Raspberry PI GPIOs, node application must run under root access.

Prior to reading or writing on a pin, **setup** operation must be performed. After this read and write operation on a pin can be done.

## API

### Methods

#### setup(pinNo, direction)
Sets up a pin for read or write. It must be done before the pin can be used for either reading or writing
* pinNo : Reference to the GPIO pin
* direction: The pin direction, pass either INPUT_MODE for read mode or OUTPUT_MODE for write mode. Defaults to OUTPUT_MODE.

#### read(pinNo)
Reads the value of a pin, returns boolean value **true** for high voltage (ON) & **false** for low voltage (OFF).
* pinNo : Reference to the GPIO pin

#### write(pinNo, value)
Writes the value of a pin.
* pinNo : Reference to the GPIO pin
* value: Can be **true** for high voltage (ON) & **false** for low voltage (OFF).

## Examples

### Setup and read the value of a pin
```js
var gpio = require('ms-gpio');
gpio.setUp(16, gpio.INPUT_MODE);
gpio.read(16);
```

### Setup and write to a pin
```js
var gpio = require('ms-gpio');
gpio.setUp(16, gpio.OUTPUT_MODE);
gpio.write(16,true); //Sets the GPIO to high
gpio.write(16,false); //Sets the GPIO to low

```

### Export pin
```js
var gpio = require('ms-gpio');
gpio.export(16);
```

### Unexport pins
```js
var gpio = require('ms-gpio');
gpio.unExport(16);
```
