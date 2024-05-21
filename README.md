# Annyknits 🧶

This project was created for my loved one to keep track of rows while knitting, - that's where the name comes from.

Built with [Next.js](https://nextjs.org/).  
Animated with [Framer Motion](https://www.framer.com/motion/).  
Styled with [Tailwind CSS](https://tailwindcss.com/).  
_Crafted with love_.

## Features

- 🧶 Create multiple named counters and switch between them;
- 🎨 Customize counter: change label, background and icon in settings;
- 🎯 Set target/goal for each counter;
- 🅾️ Double click on the counter to reset its value;
- 🍒 Split screen: display and control two counters (this feature must be enabled in settings);
- ⚡ Can and intended to be installed as **Progressive Web App**;
- 💻 UI/UX optimized both for desktop and mobile devices;
- 🫙 Counters are stored in local storage.

## To do

### Main:

- Update README.md;
- Animate split counter slide appearance;
- Investigate icon-\*.png conflicts with favicon.ico.

### Back up:

- Option to back up data on the server (sign in required -> user press back up button -> button shows loading spinner -> on success: data is stored in db / on fail: display error (as sonner));
- Button "load data from server" with warning that it might rewrite current data;
- Authentication for the action mentioned above;
- Export counters (name: value) as a text file or csv via settings.

### SFX:

- Sound effects;
- Settings: toggle SFX, volume slider (disabled when SFX off).

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
