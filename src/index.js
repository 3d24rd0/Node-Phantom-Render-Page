var driver = require('node-phantom-simple');
var fs = require('fs');

driver.create({
    path: require('phantomjs').path,
    parameters: {
        'ignore-ssl-errors': 'yes'
    }
}, function(err, browser) {
    return browser.createPage(function(err, page) {
        console.log(process.argv[2])
        return page.open(process.argv[2], function(err, status) {
            console.log("opened site? ", status);
            if (status === "success") {
                page.render("pageRender.jpg");
                page.get('content', function(err, html) {
                    fs.writeFile("pageRender.html", html, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                        browser.exit();
                    });
                });
            } else {
                browser.exit();
            }
        });
    });
});
