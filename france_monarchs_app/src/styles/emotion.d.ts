import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
    };
    spaces: {
      tiny: string;
      small: string;
      default: string;
      big: string;
      large: string;
      max: string;
    };
    border: {
      radius: string;
      width: string;
    };
    width: {
      headpiece: string;
      link: string;
    };
    height: {
      headpiece: string;
      link: string;
    };
  }
}
