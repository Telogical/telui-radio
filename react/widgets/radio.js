function Radio(ui) {
  'use strict';
  
  
    var React = ui.Core.React,
    _ = ui.Core._;
  
  return React.createClass({
    displayName: 'Radio',
    mixins: [ui.Mixins.Widget],
    propTypes: {

    },
    __onClick: function onClick() {

    },
    __onFocus: function onFocus() {
      this.setState({
        active: true
      });
    },
    __onChange: function onChange(value, list) {
      if (!list.props.disabled && list && value) {
        list.__onChange(value);
      }
    },

    render: function render() {

      var cx = React.addons.classSet;

      this.props.appearance = this.props.appearance || 'radio';

      var id = this.props.id,
        key = this.props.key || this.props.id,
        value = this.props.value,
        list = this.props.list || [],
        listValue = this.props.listValue,
        name = this.props.name,
        disabled = !!this.props.disabled,
        iconPrimary = this.props.iconPrimary,
        iconSecondary = this.props.iconSecondary,
        active = this.__equals(value, listValue),
        uiState = this.props.uiState,
        width = this.props.width || '100%';

      var radioLiClasses = {
          'ui-radio': true,
        },
        radioLiAttrs = {
          id: key + '_li',
          key: key + '_li',
          style: {
            width: width
          },
          className: cx(radioLiClasses)
        };

      var radioInputClasses = {
          'ui-helper-hidden-accessible': true
        },
        radioInputAttrs = {
          id: id + '_input',
          key: key + '_input',
          className: cx(radioInputClasses),
          role: 'radio',
          'aria-disabled': disabled,
          onClick: this.__onClick.bind(null, value, list),
          onChange: this.__onChange.bind(null, value, list),
          onFocus: this.__onFocus.bind(null, value, list),
          //onHover: this.__onHover.bind(null, value, list),
          type: 'radio',
          name: name,
          checked: active,
          ref: 'input'
        };

      if (this.props.focusable === false) {
        radioInputAttrs.tabIndex = -1;
      }

      if (disabled) {
        radioInputAttrs.disabled = 'disabled';
      }

      var appearanceModel = {
        value: value,
        ref: 'appearance',
        list: list,
        disabled: disabled,
        id: id + '_appearance_' + this.props.appearance,
        control: this,
        label: this.props.label,
        iconPrimary: iconPrimary,
        iconSecondary: iconSecondary,
        active: active,
        inputId: radioInputAttrs.id,
        uiState: uiState
      };

      var appearance = ui.Appearances[this.props.appearance](appearanceModel),
        input = React.DOM.input(radioInputAttrs, '');

      var li = React.DOM.li(radioLiAttrs, input, appearance);

      return li;
    }
  });
}

module.exports = Radio;