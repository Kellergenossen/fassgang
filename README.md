# Fassgang - 24 barrels full of history  <br />
## Control the light installation and learn all about the impressive vintage barrels.

The barrel aisle consists of 2 interaction possibilities.
1. The light animations: An ESP32 with a motion sensor, a WS2812b LED strip and a UV LED strip is attached to each barrel. If a person is standing in front of the barrel, both LED strips light up in full brightness. If there is no person in front of the barrel, the light slowly fades. People walking by create a light tail. In the idle state, i.e. without any motion detected, a subtle pulsation of the lights is animated. The brightness varies from 10%-60%. The UV light makes the numbers on the floor glow. These were painted on the floor with transparent UV paint. The EPS32 microcontrollers allow the barrels to be addressed individually. This also makes the exhibit flexible and expandable: e.g. communication between 2 barrels.
2. The transparent touch terminal: There is a touch terminal in the middle of the barrel aisle. This consists of a glass pane covered with a touch foil. There is also a Raspberry Pi 3B+ and a full HD projector opposite. The Raspberry Pi has collected the media and code for the interface on an external memory card. A web application running on a local server allows the interface to be projected onto the pane. The touch frame on the glass pane is connected to the Raspberry Pi and can thus detect and pass on the touches of the visitors. 
If a person now presses a certain barrel in the application, a variety of information about the barrel's appearance and historical background appears. At the same time, the selected barrel lights up wine-red in the barrel aisle, showing the position of the selected barrel. 

### Repo folder structure:  
/fassgang = the parent folder <br />
/fassgang/public = the main folder; responsible for the web application <br />
/fassgang/public/media = the folder with all important media; images or fonts <br />

### Important files:  
/fassgang/public/exponat.json = a JSON file that contains and organises all important information and links to the 22 barrels <br />
/fassgang/public/script.js = reads the JSON file and uses the information to insert it into the HTML file; helps with a variety of click events <br />
/fassgang/public/index.html = the basic structure of the exhibit interface; contains almost only empty elements, as these are filled by script.js <br />
/fassgang/public/style.css = makes up the look of the interface and some animations <br />
/fassgang/server.js = the script for the local server which shows the index.html on http://localhost:3001




