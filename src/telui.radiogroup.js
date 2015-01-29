var React = require('react/addons');
require('@telogical/telui-core');
var TelogicalUi = angular.module('TelUI');

var UI = require('../react/telui');

TelogicalUi
  .directive('teluiRadiogroup', [

    function reactCheckboxDirective() {
      'use strict';

      return {
        restrict: 'E',
        replace: true,
        scope: {
          id: '@',
          value: '=',
          data: '=',
          label: '@',
          state: '@',


          labelProp: '@',
          disabledProp: '@',
          stateProp: '@',

          disabled: '=',
          iconPrimary: '@',
          iconSecondary: '@',

          click: '&?',
          change: '&?',
          cssClass: '@',
          text: '=?',

          name: '@',
          appearance: '@',
          orientation: '@'
        },
        template: '<div class="waffles"></div>',
        link: function link(scope, $el, attrs) {
          $el.removeAttr('disabled');
          var id = scope.id ? scope.id : 'list_check_' + Math.round(Math.random() * 9999);

          function render(newValue, oldValue) {

            if (typeof scope.text === 'undefined') {
              scope.text = true;
            }

            //TODO greatly simplify these models going back?
            var model = {
              id: id,
              label: scope.label,
              labelProp: scope.labelProp,
              uiState: scope.state,
              uiStateProp: scope.stateProp,
              iconPrimary: scope.iconPrimary,
              iconSecondary: scope.iconSecondary,
              cssClass: scope.cssClass,
              text: scope.text,
              disabled: scope.disabled,
              click: scope.click,
              value: scope.value,
              data: scope.data,
              name: scope.name,
              appearance: scope.appearance || 'radio',
              orientation: scope.orientation || 'vertical',
              parentWidth: $el.width(),
              scope: scope
            };

            model.key = model.id;

            React.renderComponent(UI.Radiogroup(model), $el[0]);
          }

          scope.$watchCollection(
            '[value, data, label, state, iconPrimary, iconSecondary, disabled, cssClass, text, click, change, appearance, orientation]',
            render);
        }
      };
        }
    ]);