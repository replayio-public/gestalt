/**
 * @fileoverview Require specific props when using an icon with Button
 *
 * Gestalt is more permissive than PDS recommends in adding icons to Buttons.
 * Buttons using iconEnd must use:
 * - icon "arrow-down"
 */

// @flow strict
import { type ESLintRule } from './helpers/eslintFlowTypes.js';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Button icon restrictions',
      category: 'Gestalt restrictions',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltbutton-icon-restrictions',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    let importedComponent = false;
    let localIdentifierName;
    const componentName = 'Button';

    function getAttribute(node, attributeName) {
      return Object.entries(node.attributes).find(
        // eslint-disable-next-line no-unused-vars
        ([key, value]) =>
          // $FlowFixMe[incompatible-use]
          value && value.name && value.name.name === attributeName,
      );
    }

    function getValue(attribute) {
      // $FlowFixMe[incompatible-use]
      return attribute ? attribute[1].value.value : null;
    }

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        importedComponent = decl.specifiers.some((node) => {
          const isValidComponent = node.imported.name === componentName;
          if (isValidComponent) {
            localIdentifierName = node.local.name;
          }
          return isValidComponent;
        });
      },
      JSXOpeningElement(node) {
        if (!importedComponent || localIdentifierName !== node.name.name) {
          return;
        }

        const iconAttribute = getAttribute(node, 'iconEnd');
        const isCorrectIcon = getValue(iconAttribute) === 'arrow-down';

        // Not using iconEnd, early return
        if (!iconAttribute) {
          return;
        }

        // Not using correct props
        if (!isCorrectIcon) {
          context.report(node, 'Buttons using iconEnd must use "arrow-down"');
        }
      },
    };
  },
};

export default rule;
