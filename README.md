
# Spotify Stream Widget

Stream Widget for OBS/Streamlabs that displays your currently playing song. Runs locally on your PC.


## Installation

- Download and install [NodeJS 16+](https://nodejs.org/es/download/)
- Download the widget zip file with the [latest version](https://github.com/jorgev259/spotify-stream/archive/refs/heads/main.zip) and extract


## Usage

- Double click `start.bat` (from the widget zip file)
- Wait until the window indicates the server has started (Takes a while the first time)
- Open an internet browser and navigate to `http://localhost:3000`
- Authorize the application to Spotify
- Add a `Browser Source` on a OBS/Streamlabs scene with the url `http://localhost:3000`
- Replace `localhost` with an IP address if the widget is being ran on a separate computer than OBS/Streamlabs