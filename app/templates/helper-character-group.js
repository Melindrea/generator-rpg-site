module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('characterGroup', function (data, slug) {
        if (typeof slug === 'object') {
            slug = '';
        }
        var fs = require('fs'), util = require('util'),
        template, out = '', templateName = 'group',
        dir = __dirname + '/../partials/character/',
        <%= _.camelize(_.slugify(projectName)) %> = options.<%= _.camelize(_.slugify(projectName)) %>, totemData, membersData,
        memberLink = '/characters/%s.html', member, memberData;

        if ('totem' in data) {
            totemData = <%= _.camelize(_.slugify(projectName)) %>.totems[data.totem];

            template = Handlebars.compile(fs.readFileSync(dir + 'totem.hbs', 'utf8'));
            data.totemData = new Handlebars.SafeString(template(totemData));
        }

        membersData = [];
        data.members.forEach(function (memberSlug) {
            if (memberSlug !== slug) {
                member = {};
                member.link = util.format(memberLink, memberSlug);
                memberData = require('../../data/' + memberSlug);
                member.name = memberData.name;
                membersData.push(member);
            }
        });

        data.membersData = membersData;

        template = Handlebars.compile(fs.readFileSync(dir + templateName + '.hbs', 'utf8'));
        out = new Handlebars.SafeString(template(data));
        return out;
    });
};
