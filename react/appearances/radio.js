function AppearanceRadio(ui) {
  'use strict';

  return React.createClass({
    displayName: 'Appearance.radio',
    mixins: [ui.Mixins.Appearance],
    getInitialState: function getInitialState() {

      //these are all not states
      return {
        disabled: false,
        hover: false,
        value: null,
        active: false
      };
    },
    render: function render() {

      var cx = React.addons.classSet,
        domx = React.DOM;

      var value = this.props.value,
        list = this.props.list,
        key = this.props.key || this.props.id,
        control = this.props.control,
        active = (this.props.active || this.state.active),
        listOrientation = this.props.orientation || 'vertical',
        glyphPrimary = this.props.iconPrimary || 'ui-icon-radio-on',
        glyphSecondary = this.props.iconSecondary || 'ui-icon-radio-off',
        verticalGrid = 0;

      //TODO: reuse appearance for check
      var glyphClasses = {
        'ui-icon': true,
        'ui-appearance-radio-sprite-glyph': true
      };

      glyphClasses[this.__nameIcon(glyphPrimary)] = active;
      glyphClasses[this.__nameIcon(glyphSecondary)] = !active;

      var labelClasses = {
          'w-12': true,
          'w-alpha': true,
          'w-omega': true,
          'ui-appearance-radio-label': true,
          'ui-state-default': true,
          'ui-state-disabled': this.props.disabled
        },
        labelAttrs = {
          key: key + '_label',
          id: key + '_label',
          htmlFor: this.props.inputId,
          className: cx(labelClasses)
        },
        radioSpriteGlyphAttrs = {
          className: cx(glyphClasses),
          key: key + '_sprite_glyph',
          id: key + '_sprite_glyph'
        },
        radioSpriteAttrs = {
          className: 'ui-appearance-radio-sprite ui-state-default',
          key: key + '_sprite',
          id: key + '_sprite'
        },
        radiospriteFrameAttrs = {
          className: 'w-alpha w-fix ui-appearance-radio-sprite-frame',
          key: key + '_spriteframe',
          id: key + '_spriteframe'
        },
        labelFrameAttrs = {
          className: 'w-auto ui-appearance-radio-label-frame',
          key: key + '_labelframe',
          id: key + '_labelframe'
        };

      var isHorizontalList = list.length && listOrientation === 'horizontal',
        itemwidth;

      if (isHorizontalList) {
        var numRadios = this.props.list.length;
        itemwidth = 100 / numRadios;
        console.log(numRadios, itemwidth);
      }

      var appearanceClasses = {
        'w-12': !isHorizontalList,
        'w-alpha': true,
        'w-omega': true,
        'ui-state-default': true,
        'ui-state-hover': control.state.hover && !this.props.disabled,
        'ui-state-active': active,
        'ui-corner-all': true,
        'ui-state-disabled': this.props.disabled,
        'ui-appearance-radio': true
      };

      appearanceClasses = this.__applyUiStates.call(control, appearanceClasses);
      appearanceClasses['w-v-' + verticalGrid] = true;
      if (this.props.cssClass && this.props.cssClass.length) {
        appearanceClasses[this.props.cssClass] = true;
      }

      var appearanceAttrs = {
        onMouseEnter: control.__onMouseEnter ?
          control.__onMouseEnter.bind(null, control) : this.__onMouseEnter.bind(null, control),
        onMouseLeave: control.__onMouseLeave ?
          control.__onMouseLeave.bind(null, control) : this.__onMouseLeave.bind(null, control),
        onMouseDown: control.__onMouseDown ?
          control.__onMouseDown.bind(null, control) : this.__onMouseDown.bind(null, control),
        onMouseUp: control.__onMouseUp ?
          control.__onMouseUp.bind(null, control) : this.__onMouseUp.bind(null, control),
        key: key,
        id: key,
        className: this.props.cssClass ? cx(appearanceClasses) + ' ' + this.props.cssClass : cx(appearanceClasses),
        onClick: control.__onChange.bind(null, value, list)
      };

      if (isHorizontalList) {
        console.log('powerfarts', itemwidth);
        appearanceAttrs.width = itemwidth + '%';
      }


      var label = domx.label(labelAttrs, this.props.label),
        radioSpriteGlyph = domx.span(radioSpriteGlyphAttrs, control.state.active),
        radioSprite = domx.span(radioSpriteAttrs, radioSpriteGlyph),
        radioSpriteFrame = domx.div(radiospriteFrameAttrs, radioSprite),
        labelFrame = domx.div(labelFrameAttrs, label);

      var appearance = domx.div(appearanceAttrs, radioSpriteFrame, labelFrame);

      return appearance;
    }
  });
}


module.exports = AppearanceRadio;