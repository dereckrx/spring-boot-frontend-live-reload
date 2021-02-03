## Spring Boot + Frontend with LiveReload and Devtools

Based on [William Lindner's youtube tutorial](https://www.youtube.com/watch?v=HPuYB9GRkY0&ab_channel=WilliamLindner) and original code [here](https://github.com/williamdotcool/spring-boot-frontend-starter)

## Setup

Add dev tools and live reload to your `build.gradle`:

```groovy
bootRun {
	sourceResources sourceSets.main
}

dependencies {
    ...
	developmentOnly 'org.springframework.boot:spring-boot-devtools' // Dev tools!
	developmentOnly 'org.webjars.npm:livereload-js:3.2.2' // Live reload via web sockets
}
```

Configure your bundler to output the `bundle.js` and `index.html` into the java resources directory:

```javascript
  output: {
    publicPath: '/',
    filename: 'bundle.js', 
    path: 'src/main/resources/static', 
  },
  ...
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: argv.mode === "development" ? './index.dev.html' : './index.html',
      filename: path.join('src/main/resources/static', 'index.html'),
    })
  ],
```

Create `index.dev.html` template:

```html
<!doctype html>
<html>
<head>
    <title>Live Reload</title>
</head>
<body>
    <div id="root"></div>
    <script src='/webjars/livereload-js/3.2.2/dist/livereload.js?port=35729'></script>
</body>
</html>
```

And you're done! 

Run your Spring Boot server and start your bundler with watch to see live reloading! 
