# EQX's Visual Generator

This is a tool to help create visuals for use in EQX.
You can learn more about EQX by visiting its repo at <http://github.com/SorkinType/EQX>.


# Startup

Navigate to the project's directory and run the following commands to get started.
```bash
npm install # This installs all dependencies
gulp # This runs a process that listens for changes and outputs ready to use files in /dist and /for-EQX-upload
```

# Navigation
You can find a tree of the project below. I've labeled the most important parts.

```bash
├── dist # This is where your ready to view files appear
│   └── example.html
├── for-EQX-upload # This is where your final files appear (the files you will upload to EQX that don't have unwanted styling)
│   └── example.html
├── defaults.js # This is where you define your type style defaults
├── partials 
│   ├── footer.html
│   └── header.html
├── styles # This is where the CSS is located (we are using .styl but you can write in normal css too)
│   ├── custom.styl # This is where you add your custom CSS
│   ├── remove-for-eqx.styl # This is where you add font files and other css that you don't want included in the EQX export
│   ├── styles.styl # The root file where it all gets put together
│   └── vars.styl # Variables that you can reuse for convenience
└── src # This is where you will create the body of your initial examples
    └── example.html
```