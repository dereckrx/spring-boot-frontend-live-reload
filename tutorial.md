## Tutorial: Spring Boot + Frontend with LiveReload and minimal config
Based on Williams Tutorial
https://www.youtube.com/watch?v=HPuYB9GRkY0&ab_channel=WilliamLindner

code:
https://github.com/williamdotcool/spring-boot-frontend-starter

Babel dependencies 

```json  
  "devDependencies": {
    "@babel/core": "^7.12.13",
    "@babel/preset-env": "^7.12.13",
    "@babel/preset-react": "^7.12.13",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^5.0.0",
    "webpack": "^5.20.1",
    "webpack-cli": "^4.5.0"
  },
```

Original index controller to serve dev tools and inject hot reload

```java
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Controller
public class IndexController {

    @Autowired
    private TemplateEngine templateEngine;

    @Value("#{systemProperties['java.class.path']}")
    private String javaClassPath;

    @Value("${spring.devtools.livereload.enabled:true}")
    private boolean livereloadEnabled;

    @Value("${spring.devtools.livereload.port:35729}")
    private String livereloadPort;

    @ResponseBody
    @RequestMapping("/")
    public String getIndex() {
        Context context = new Context();
        String html = templateEngine.process("index", context);

        boolean devtoolsLoaded = javaClassPath.contains("spring-boot-devtools");
        if (devtoolsLoaded && livereloadEnabled) {
            html = addLiveReload(html);
        }
        return html;
    }

    private String addLiveReload(String html) {
        html = html.replace("</body>", "<script src='/webjars/livereload-js/3.2.2/dist/livereload.js?port=" + livereloadPort + "'></script>\n</body>");
        return html;
    }
}

```
