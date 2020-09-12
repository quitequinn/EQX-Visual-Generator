# Startup
```bash
npm install
gulp # or gulp build if you don't want it to listen for file changes
```

# Navigation
You can find a tree of the project below. I've labeled the most important parts.

```bash
├── build # This is where your final files appear
│   └── example.html
├── defaults.js # This is where you define your type style defaults
├── partials 
│   ├── footer.html
│   └── header.html
├── styles
│   ├── custom.styl
│   ├── styles.styl # Here you can see how the css is built and decide if you want to change it
│   └── vars.styl
└── visuals # This is where you will create the body of your initial examples
    └── example.html
```