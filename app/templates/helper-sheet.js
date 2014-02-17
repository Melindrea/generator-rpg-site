module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('sheet', function (data, slug) {
        var fs = require('fs'),
        template, out = '', templateName = 'sheet',
        dir = __dirname + '/../partials/character/',
        <%= _.camelize(_.slugify(projectName)) %> = options.<%= _.camelize(_.slugify(projectName)) %>;

        if ('group' in data) {
            data.group = <%= _.camelize(_.slugify(projectName)) %>.groups[data.group];
            data.slug = slug;
        }

        template = Handlebars.compile(fs.readFileSync(dir + templateName + '.hbs', 'utf8'));
        out = new Handlebars.SafeString(template(data));
        return out;
    });
};
