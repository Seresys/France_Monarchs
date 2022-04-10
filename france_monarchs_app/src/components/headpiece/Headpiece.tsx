import { css, useTheme } from "@emotion/react";
import { Person } from "../../generated/graphql";

export const Headpiece = ({ person }: { person: Person }) => {
  /*
   * Style
   */
  const theme = useTheme();
  const style = css({
    borderWidth: theme.border.width,
    borderRadius: theme.border.radius,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    padding: theme.spaces.default,
    height: "100px",
    width: "150px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  });

  /*
   * Component
   */
  const label = person.label.split(" (")[0];

  return (
    <>
      <div css={style}>{label}</div>
    </>
  );
};
