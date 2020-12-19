# Christmas Jumper IoT

A  microphone collecting HTML page that detects songs, and returns various festive themed iconography.

# What is this?

A rework of Christmas Jumper / Audio Detection.

# Dependencies

- An Ably account and API key
- An AudD account and API key
- An Azure Account for hosting on production
- Node 12 (LTS)

## Local dev pre-requirements

You will need to host the API, and can do so using Azure functions, you will need to install the [Azure functions core tools](https://github.com/Azure/azure-functions-core-tools). In your terminal, run:

```bash
npm install -g azure-functions-core-tools
```

You will also need to set your API key for local development. In your terminal, run:

```bash
cd api
func settings add ABLY_API_KEY Your-Ably-Api-Key
func settings add AUDD_API_KEY Your-audd-api-key
```

Running these commands will encrypt your API key into the file `/api/local.settings.json`.
You don't need to check it in to source control, and even if you do, it won't be usable on another machine.

# Configuration

## Ably Channels for pub/sub

The app uses [Ably](https://www.ably.io/) for [pub/sub messaging](https://www.ably.io/documentation/core-features/pubsub) between the players. Ably is an enterprise-ready pub/sub messaging platform that makes it easy to design, ship, and scale critical realtime functionality directly to your end-users.

[Ably Channels](https://www.ably.io/channels) are multicast (many publishers can publish to many subscribers) and we can use them to build apps.

## Ably channels and API keys

In order to run this app, you will need an Ably API key. If you are not already signed up, you can [sign up now for a free Ably account](https://www.ably.io/signup). Once you have an Ably account:

1. Log into your app dashboard.
2. Under **“Your apps”**, click on **“Manage app”** for any app you wish to use for this tutorial, or create a new one with the “Create New App” button.
3. Click on the **“API Keys”** tab.
4. Copy the secret **“API Key”** value from your Root key, we will use this later when we build our app.

This app is going to use [Ably Channels](https://www.ably.io/channels) and [Token Authentication](https://www.ably.io/documentation/rest/authentication/#token-authentication).


# Running on real hardware

This uses the general purpose LED Matrix Driver that lives in the [matrix-driver repository](https://github.com/snakemode/matrix-driver).

There are detailed instructions for how to build and deploy the Arduino sketch we've prepared, which is all the code required to receive the messages, unpack the serialized binary messages, and power actual LED displays.

[You can find these instructions here](https://github.com/snakemode/matrix-driver#arduino-hardware).

To make this work in the real world, you'll need some hardware, here is the hardware that was used to develop this application:

- AdaFruit Feather Huzzah / ESP8266 - [AdaFruit](https://www.adafruit.com/category/943), [Amazon](https://www.amazon.co.uk/Feather-HUZZAH-with-ESP8266-WiFi/dp/B019MGW6N6/ref=sr_1_3)
- WS2812B Led Strip Panel Kit 8x32 256 pixels - [Amazon](https://www.amazon.co.uk/gp/product/B07KT1H481/)
- Dupont Wire for connecting the Leds and board - [Amazon](https://www.amazon.co.uk/gp/product/B01EV70C78/)
- A Micro-USB cable

You'll need to clone the `matrix-driver` repository, and follow the instructions to install the `Arduino IDE`, build, and deploy the code provided.

There's some set up to do in that process that is explained in the repository which will configure your *wifi details* and *MQTT credentials*. With these details provided, running the provided Arduino code on physical hardware will work out of the box. The code was written to run on an ESP8266, but should also be compatible with ESP32 boards, and generic Arduino devices, though your milage may vary!

If you buy the LED strip mentioned above, you'll need to configure the Arduino code with the following settings -

```c
const index_mode display_connector_location = index_mode::TOP_LEFT;
const carriage_return_mode line_wrap = carriage_return_mode::SNAKED;
const neoPixelType neopixel_type = NEO_GRB + NEO_KHZ800;
```

Other LED strips may require different configuration, depending on how the LED matrix is wired together.

# Hosting notes

This project is built and hosted on [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) and uses the Azure Functions SDK locally to emulate that environment.

If you want to host this yourself, there are instructions in [HOSTING.md](HOSTING.md)

You could host this on other platforms, but you would have to port the API code to run on them.
