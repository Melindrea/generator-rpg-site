module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('index', function (root) {
        var objects = [], titles = {}, subRoot,
        out = '', data, url, character,
        moment = require('moment'),
        siteRoot = options.data.site.root;
        options.pages.forEach(function (page) {
            if (page.dirname.indexOf(siteRoot + '/' + root) > -1) {
                if (!(page.basename === 'index' && page.dirname === siteRoot + '/' + root)) {
                    objects.push(page);
                }
            }
        });
        if (objects.length > 0) {
            // Populate titles
            objects.forEach(function (page) {
                count = page.dirname.match(/\//g);
                if (count !== null && count.length > 1 && page.basename === 'index') {
                    subRoot = page.dirname.replace(siteRoot + '/' + root + '/', '');
                    titles[subRoot] = page.data.title;
                }
            });

            out += '<dl>\n';
            objects.forEach(function (page) {
                subRoot = '';
                data = page.data;
                url = '/' + page.dest;
                out += '<dt><a href="' + url + '">';
                if (data.date) {
                    out += moment(data.date).format('YYYY-MM-DD: ');
                }
                out += data.title;
                count = page.dirname.match(/\//g);
                if (count !== null && page.basename !== 'index' && count.length > 1) {
                        subRoot = page.dirname.replace(siteRoot + '/' + root + '/', '');
                        if (subRoot in titles) {
                            out += ' (' + titles[subRoot] + ')';
                        }
                }

                if (page.basename === 'index') {
                    out += ' (Index)';
                }
                out += '</a></dt>\n';
                if (data.blurb) {
                    out += '<dd>' + data.blurb + '</dd>\n';
                } else if (root === 'characters' && page.basename !== 'index' && subRoot !== 'packs') {
                    character = require('../../data/' + page.basename);
                    out += '<dd>' + character.blurb + '</dd>\n';
                } else {
                    console.log(root);
                    console.log(page.basename);
                    console.log(subRoot);
                }
            });
            out += '</dl>\n';
        }

        return new Handlebars.SafeString(out);
    });
};
