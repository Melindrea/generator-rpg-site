module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('sheet', function (data, slug) {
        var fs = require('fs'),
        template, out = '', templateName = 'sheet',
        dir = __dirname + '/../partials/character/',
        skidRow = options.skidRow;

        if ('group' in data) {
            data.group = skidRow.groups[data.group];
            data.slug = slug;
        }

        template = Handlebars.compile(fs.readFileSync(dir + templateName + '.hbs', 'utf8'));
        out = new Handlebars.SafeString(template(data));
        return out;
    });
};
