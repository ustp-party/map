import type { Theme } from "$types/theme";

export const lightTheme: Theme = {
  primary: "rgba(25, 25, 79, 1)",
  secondary: "rgba(255, 179, 57, 1)",
  accent: "rgba(0, 80, 157, 1)",
  text: "rgba(0, 80, 157, 1)",
  textAccent: "rgba(25, 25, 79, 1)",
  bg: "rgba(202, 240, 248, 1)",
  bgAccent: "rgba(249, 249, 249, 1)",
  btnHover: "rgb(184, 222, 230)",
  btnActive: "rgb(134, 163, 168)",
};

export const darkTheme: Theme = {
  primary: "rgba(25, 25, 79, 1)",
  secondary: "rgba(255, 179, 57, 1)",
  accent: "rgba(20, 20, 20, 0.8)",
  text: "rgba(249, 249, 249, 1)",
  textAccent: "rgb(165, 165, 165)",
  bg: "rgba(21, 21, 21, 1)",
  bgAccent: "rgba(41, 41, 41, 1)",
  btnHover: "rgba(60, 60, 60, 1)",
  btnActive: "rgba(90, 90, 90, 1)",
};

export const mapTheme = {
  highlight: "rgb(248, 156, 32)",
  building: "rgb(87, 144, 252)",
  bench: "rgb(228, 37, 54)",
  parking: "rgb(122, 33, 221)",
};
