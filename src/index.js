var driver = require('node-phantom-simple');
var fs = require('fs');

driver.create({
    path: require('phantomjs').path,
    parameters: {
        'ignore-ssl-errors': 'yes'
    }
}, function(err, browser) {
    return browser.createPage(function(err, page) {
        return page.open("http://www.google.es", function(err, status) {
            console.log("opened site? ", status);
            page.render("pageRender.jpg");
            page.get('content', function(err, html) {
                fs.writeFile("pageRender.html", html, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
            });
        });
    });
});
