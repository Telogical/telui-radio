//global.UI = global.UI || require('@telogical/telui-core');
require('@telogical/telui-core');

global.UI.Appearances.radio = require('./appearances/radio')(global.UI);

global.UI.Radio = require('./widgets/radio')(global.UI);
global.UI.Radiogroup = require('./widgets/radiogroup')(global.UI);


console.log('Radio', global.UI.Appearances);

module.exports = global.UI;
