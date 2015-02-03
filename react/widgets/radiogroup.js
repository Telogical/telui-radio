function Radiogroup(ui) {
  'use strict';

  return React.createClass({
    displayName: 'Radiogroup',
    mixins: [ui.Mixins.List],
    propTypes: {
      text: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired
    },

    __onFocus: function onFocus() {
      // this.setState({
      //  hover: true
      // });
      // console.log('focused (radiogroup)', arguments);
    },

    __onClick: function onClick() {
      var model = this.props,
        canClick = !model.disabled &&
        model.click &&
        typeof model.click === 'function';

      if (canClick) {
        model.click();
      }
    },

    __onChange: function (value) {
      var model = this.props;

      if (model.disabled) {
        return;
      }

      var hasChangeFunction = model.change && typeof model.change === 'function';

      model.scope.$apply(function (scope) {
        scope.value = value;
      });

      if (hasChangeFunction) {
        model.change(value);
      }

    },

    getInitialState: function getInitialState() {
      //these are all not states
      return {
        disabled: false,
        hover: false,
        value: null,
        checked: !!this.props.value || false
      };
    },
    componentDidUpdate: function componentDidUpdate() {

    },
    componentDidMount: function componentDidMount() {

    },
    componentWillMount: function componentWillMount() {
      var component = this;

      if (component.props.text === false) {
        component.props.label = '';
      }

      function theDataDoesNotHaveIds() {
        return component.props.data &&
          component.props.data.length &&
          !component.props.data[0].id &&
          component.props.data[0].id !== 0; //watch out, zero is falsy!
      }

      //list must have a group name
      if (!component.props.name) {
        console.warn(
          component.displayName,
          'does not contain a group name, and it will be generated'
        );

        component.props.name = component._descriptor.type.displayName + '_' + Math.round(Math.random() * 9999);
      }

      if (theDataDoesNotHaveIds()) {
        console.warn(
          component.props.data,
          'does not contain ids, and they will be generated for',
          component._descriptor.type.displayName,
          component.props.name
        );
      }

    },
    render: function render() {
      var list = this;

      this.props.id = this.props.id || 'radiogroup_' + this.props.name + Math.round(Math.random() * 9999);

      var key = this.props.id;
      var cx = React.addons.classSet;
      var orientation = this.props.orientation || 'vertical';

      function assignUniqueId(datum, index) {
        var uniqueId = (list.props.id || list.displayName) +
          '_' + list.props.name +
          '_' + index;
        return uniqueId;
      }

      function generateRadio(listItem, index) {

        var id = (listItem.id || listItem.id === 0) ?
          listItem.id :
          assignUniqueId(listItem, index);


        //TODO: move this to a listItem decorator in the list mixin
        var model = {
          id: id,
          key: id,
          ref: index,
          //html
          name: list.props.name,
          disabled: !!(list.props.disabled) || !!(listItem[list.props.disabledProp]),

          label: listItem[list.props.labelProp] || list.props.label || '',
          uiState: listItem[list.props.uiStateProp] || list.props.uiState || '',
          iconPrimary: listItem[list.props.iconPrimaryProp] || list.props.iconPrimary,
          iconSecondary: listItem[list.props.iconSecondaryProp] || list.props.iconSecondary,
          text: list.props.text,

          value: listItem,
          list: list,
          listValue: list.props.value,
          appearance: list.props.appearance,
          orientation: list.props.orientation,
          index: index,
          focusable: list.props.focusable
        };

        return ui.Radio(model);
      }

      var radioList = list.props.data.map(generateRadio);

      var ulClasses = {
          'w-12 w-alpha w-omega': true,
          'ui-list-radio': true,
          'ui-widget-vertical': (orientation === 'vertical'),
          'ui-widget-horizontal': (orientation === 'horizontal')
        },
        ulAttrs = {
          key: key + '_ul',
          className: cx(ulClasses),
          onFocus: this.__onFocus.bind(null, list.props.value, list),
        };

      return React.DOM.ul(ulAttrs, radioList);
    }
  });
}

module.exports = Radiogroup;