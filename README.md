# Annyknits 🧶

This project was created for my loved one who was in need of a counter to keep track of rows for knitting, - that's where the project's name comes from.

Built with [Next.js](https://nextjs.org/).

## Setting up

First, install the dependencies:

```bash
npm install
```

Then, run the **development** server:

```bash
npm run dev
```

Or build and run the **production** server:

```bash
npm run build
npm run start
```

## Features

- 🧶 Create multiple named counters and switch between them;
- 🎨 Customize counter: change label, value, choose color theme and icon;
- 🫙 Counters are stored in Local Storage;
- 🅾️ Double click on the counter to reset its value;
- ⚡ Can be installed as **Progressive Web App**.

## To do

- Everything should be stored primarily in local storage (as in native app). Data could be backed up on the server (sign in required -> user press backup button -> button shows loading spinner -> on succes: data is stored in db / on fail: show error (as sonner))
- Button "load data from the server" with warning that it might rewrite current data
- Authentication;

- Sound effects;
- Settings: toggle SFX, volume slider (disabled when SFX off);
- Export counters (name: value) as a text file or csv via settings;

- Split mode: have multiple controllable counter on screen at the same time;

- Either lock orientation or change counter and buttons layout;
