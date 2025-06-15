import { getContext, setContext } from "svelte";

interface ViewportWidthState {
  value: number;
  update: () => void;
}

class ViewportWidthStateClass implements ViewportWidthState {
  value = $state(window.innerWidth || 0);
  update = () => {
    this.value = window.innerWidth;
  };
}

const DEFAULT_KEY = "$_viewport_width_state";

export const getViewportWidthState = (key = DEFAULT_KEY) => {
  return getContext<ViewportWidthState>(key);
};

export const setViewportWidthState = (key = DEFAULT_KEY) => {
  const ViewportWidthState = new ViewportWidthStateClass();
  return setContext(key, ViewportWidthState);
};
