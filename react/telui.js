var TelUI = require('@telogical/telui-core');

TelUI.Appearances.radio = require('./appearances/radio')(TelUI);

TelUI.Radio = require('./widgets/radio')(TelUI);
TelUI.Radiogroup = require('./widgets/radiogroup')(TelUI);

module.exports = TelUI;
