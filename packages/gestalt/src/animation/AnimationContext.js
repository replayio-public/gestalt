// @flow strict

import {
  createContext,
  type Context,
  type Element,
  type Node,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import useReducedMotion from '../useReducedMotion.js';

export const ANIMATION_STATE = {
  animatedOpening: 'animatedOpening',
  animatedClosing: 'animatedClosing',
  unmount: 'unmount',
};

export type AnimationStateType = null | 'animatedOpening' | 'animatedClosing' | 'unmount';

type AnimationType = {|
  animationState: AnimationStateType,
  setAnimationState: (AnimationStateType) => void,
|};

type UseAnimationType = {|
  animationState: AnimationStateType,
  handleAnimation: () => void,
  onExternalDismiss: () => void,
|};

type AnimationProviderProps = {|
  children: Node,
|};

const initialState = {
  // null here is used to mount OverlayPanel with reduced motion, no animation.
  animationState: null,
  setAnimationState: () => {},
};

const AnimationContext: Context<AnimationType> = createContext<AnimationType>(initialState);

export default function AnimationProvider({
  children,
}: AnimationProviderProps): Element<typeof AnimationContext.Provider> | null {
  const [animationState, setAnimationState] = useState<AnimationStateType>(
    useReducedMotion() ? null : ANIMATION_STATE.animatedOpening,
  );

  return (
    <AnimationContext.Provider
      value={useMemo(() => ({ animationState, setAnimationState }), [animationState])}
    >
      {children}
    </AnimationContext.Provider>
  );
}

/* A backward-compatible shim for React < 18
 * flushSync is needed in React 18+ to ensure that the animation is finished before the onDismiss callback is called.
 */
const flushSync = (callback) => {
  if (ReactDOM.flushSync) {
    ReactDOM.flushSync(callback);
  } else {
    callback();
  }
};

export function useAnimation(): UseAnimationType {
  const reducedMotion = useReducedMotion();

  const { animationState, setAnimationState } = useContext(AnimationContext);

  // onAnimatedDismiss is ultimately the callback that triggers unmounting with/without animation externally. It can be accessed via render props in the API (onDismissStart)
  const onExternalDismiss = useCallback(() => {
    flushSync(() =>
      setAnimationState(reducedMotion ? ANIMATION_STATE.unmount : ANIMATION_STATE.animatedClosing),
    );
  }, [reducedMotion, setAnimationState]);

  const handleAnimation = useCallback(() => {
    if (
      !reducedMotion &&
      [ANIMATION_STATE.animatedOpening, ANIMATION_STATE.animatedClosing].includes(animationState)
    )
      flushSync(() =>
        setAnimationState(
          // null here is used to used to mount OverlayPanel with motion.
          // ANIMATION_STATE.unmount here isets the component to internally unmount before onDismiss gets called and full component gets unmounted
          animationState === ANIMATION_STATE.animatedOpening ? null : ANIMATION_STATE.unmount,
        ),
      );
  }, [animationState, setAnimationState, reducedMotion]);

  return {
    animationState,
    onExternalDismiss,
    handleAnimation,
  };
}