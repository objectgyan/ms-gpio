ms-gpio
==========

Manage Raspberry Pi GPIO pins with node.js & Raspbian (Linux) OS

## Setup

In order to run this application you need to have Raspbian OS installed on Raspberry PI.To install Raspbian OS, you can go to  https://www.raspberrypi.org/learning/software-guide/quickstart

Make sure you are running the latest version of node on your raspberry terminal,follow below steps :
```
curl -sLS https://apt.adafruit.com/add | sudo bash
sudo apt-get install node

```

This module can then be installed with npm:
```
npm install ms-gpio
```

## Usage
In order to work with Raspberry PI GPIOs, node application must run under root access

Prior to reading or writing on a pin, **setup** operation must be performed.After this write and read operatin on a pin can be done.

## API

### Methods

#### setup(pinNo, direction)
Sets up a pin for read or write. Must be done before the pin can be used.
* pinNo : Reference to the GPIO pin
* direction: The pin direction, pass either InputMode for read mode or OutputMode for write mode. Defaults to OutputMode.

#### read(pinNo)
Reads the value of a pin.
* pinNo : Reference to the GPIO pin

#### write(pinNo, value)
Writes the value of a channel.
* pinNo : Reference to the GPIO pin
* value: int value of 1 0r 0 to specify whether the channel will turn on or off.

## Examples

### Setup and read the value of a pin
```js
var GpioInstance = require('ms-gpio');
var gpio = new GpioInstance();
gpio.setUp(deviceId, gpio.InputMode);
```

### Setup and write to a pin
```js
var GpioInstance = require('ms-gpio');
var gpio = new GpioInstance();
gpio.setUp(16, gpio.OutputMode);
gpio.write(16,1); //Sets the GPIO to high
gpio.write(16,0); //Sets the GPIO to low

```

### Export pin
```js
var GpioInstance = require('ms-gpio');
var gpio = new GpioInstance();
gpio.export(16);
```

### Unexport pins
```js
var GpioInstance = require('ms-gpio');
var gpio = new GpioInstance();
gpio.unExport(16);
```
