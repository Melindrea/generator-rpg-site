module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('npcs', function (place) {
        var npcs = options.skidRow.npcs[place],
        out = '';

        if (npcs.length === 0) {
          return;
        }

        out = '<ul>\n';
        npcs.forEach(function (npc) {
          out += '<li><strong>' + npc.name + '</strong> - ' + npc.blurb + '</li>\n';
        });
        out += '</ul>\n';
        return new Handlebars.SafeString(out);
    });
};
