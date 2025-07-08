import { getContext, setContext } from "svelte";

interface AppState {
  openMapControlDropdown: boolean;
  viewportWidth: number;
  viewportHeight: number;
  updateViewportWidth: () => void;
  collapsedSidebar: boolean;
  openMissingFeatureDialog: boolean;
  mobileView: boolean;
}

class AppStateClass implements AppState {
  viewportWidth = $state(window.innerWidth || 0);
  viewportHeight = $state(window.innerHeight || 0);
  openMapControlDropdown = $state(false);
  updateViewportWidth = () => {
    this.viewportWidth = window.innerWidth;
  };
  collapsedSidebar = $state(false);
  openMissingFeatureDialog = $state(false);
  mobileView = $derived(this.viewportWidth < 600);
}

const DEFAULT_KEY = "$_app_state";

export const getAppState = (key = DEFAULT_KEY) => {
  return getContext<AppState>(key);
};

export const setAppState = (key = DEFAULT_KEY) => {
  const AppState = new AppStateClass();
  return setContext(key, AppState);
};
