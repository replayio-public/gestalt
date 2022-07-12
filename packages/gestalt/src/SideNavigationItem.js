// @flow strict
import { useState, type Node } from 'react';
import classnames from 'classnames';
import styles from './SideNavigation.css';
import TapArea from './TapArea.js';
import Badge from './Badge.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Box from './Box.js';
import icons from './icons/index.js';

type Props = {|
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/SideNavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section',
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/SideNavigation#Badge) variant to learn more.
   */
  badge?: {|
    text: string,
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
  |},
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/SideNavigation#Counter) variant to learn more.
   */
  counter?: {| number: string, accessibilityLabel: string |},
  /**
   * Directs users to the url when item is selected.
   */
  href: string,
  /**
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/SideNavigation#Icon) variant to learn more.
   */
  icon?: $Keys<typeof icons> | {| __path: string |},
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/SideNavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string,
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onSelect: ({|
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    item: {|
      label: string,
      value: string,
    |},
  |}) => void,
  /**
   * Object detailing the label and value for this item.
   */
  item: {| label: string, value: string |},
|};

/**
 * Use [SideNavigation.Item](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.Item) for navigation, when the SideNavigation item navigates to a new page or sectoin.
 */
export default function SideNavigationItem({
  active,
  href,
  item,
  badge,
  counter,
  icon,
  notificationAccessibilityLabel,
  onSelect,
}: Props): Node {
  const [hovered, setHovered] = useState(false);

  let itemColor = active ? 'selected' : undefined;
  let textColor = active ? 'inverse' : 'default';

  if (hovered && !active) {
    itemColor = 'secondary';
    textColor = 'default';
  }

  return (
    <li className={classnames(styles.liItem)}>
      <TapArea
        accessibilityCurrent={active === 'page' ? active : undefined}
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        role="link"
        rounding={2}
        tapStyle="compress"
        onTap={({ event }) => onSelect?.({ event, item })}
      >
        <Box
          color={itemColor}
          paddingX={4}
          paddingY={2}
          minHeight={44}
          rounding={2}
          display="flex"
          alignItems="center"
        >
          <Flex gap={2} height="100%" width="100%">
            {icon ? (
              <Flex.Item alignSelf="center">
                <Box aria-hidden>
                  {typeof icon === 'string' ? (
                    <Icon inline icon={icon} accessibilityLabel="" color={textColor} />
                  ) : (
                    <Icon
                      inline
                      dangerouslySetSvgPath={icon}
                      accessibilityLabel=""
                      color={textColor}
                    />
                  )}
                </Box>
              </Flex.Item>
            ) : null}
            <Flex.Item alignSelf="center" flex="grow">
              <Text inline color={textColor}>
                {item.label}
                {(badge || notificationAccessibilityLabel) && (
                  <Box marginStart={1} display="inlineBlock" height="100%">
                    {/* Adds a pause for screen reader users between the text content */}
                    <Box display="visuallyHidden">{`, `}</Box>
                    {!notificationAccessibilityLabel && badge ? (
                      <Badge text={badge.text} type={badge.type} />
                    ) : null}
                    {notificationAccessibilityLabel ? (
                      <Box
                        aria-label={notificationAccessibilityLabel}
                        height={8}
                        width={8}
                        rounding="circle"
                        color="primary"
                        role="status"
                      />
                    ) : null}
                  </Box>
                )}
              </Text>
            </Flex.Item>
            {counter && (
              <Flex.Item flex="none" alignSelf="center">
                <Box display="visuallyHidden">{`, `}</Box>
                {/* marginEnd={-2} is a hack to correctly position the counter as Flex + gap + width="100%" doean't expand to full width */}
                <Box aria-label={counter.accessibilityLabel} role="status" marginEnd={-2}>
                  <Text align="end" color={textColor}>
                    {counter.number}{' '}
                  </Text>
                </Box>
              </Flex.Item>
            )}
          </Flex>
        </Box>
      </TapArea>
    </li>
  );
}

SideNavigationItem.displayName = 'SideNavigation.Item';