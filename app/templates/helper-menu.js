module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('menu', function (pages) {
        var out = '', objects = [], count, url;

        pages.forEach(function (page) {
            count = page.dirname.match(/\//g);
            if (count === null) {
                count = 0;
            } else {
                count = count.length;
            }
            if (page.basename === 'index' && count < 2) {
                objects.push(page);
            }
        });

        objects.forEach(function (page) {
            url = '/' + page.dest;
            out += '<li';
            if (page.currentPage) {
                out += ' class="active"';
            }
            out += '>';
            out += '<a href="' + url + '">';
            if (page.data.title === 'Home') {
                out += options.data.site.title;
            } else {
                out += page.data.title
            }
            out += '</a>';
            out += '</li>\n';
        });
        return new Handlebars.SafeString(out);
    });
};
