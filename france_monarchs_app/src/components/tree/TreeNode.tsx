import { FC } from "react";
import { Person } from "../../generated/graphql";
import { Headpiece } from "../headpiece/Headpiece";
import { getPersonById } from "../../utils/helpers";
import { FamilyTree } from "./Tree";
import { css, useTheme } from "@emotion/react";

interface Props {
  node: FamilyTree;
  persons: Person[];
}

export const TreeNode: FC<Props> = ({ node, persons }) => {
  /*
   * Style
   */
  const theme = useTheme();
  const headpiecesContainer = css({
    display: "flex",
    alignItems: "center",
    width: "340px",
  });
  const children = css({
    display: "flex",
    gap: theme.spaces.max,
  });
  const childrenContainer = css({
    marginLeft: `calc(${theme.width.headpiece} + ((${theme.width.link} - ${theme.width.headpiece}) / 2) - 10px)`,
  });
  const maritalLink = css({
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: theme.border.width,
    borderBottomStyle: "solid",
    width: theme.spaces.big,
  });
  const childrenLink = css({
    borderLeftColor: theme.colors.primary,
    borderLeftWidth: theme.border.width,
    borderLeftStyle: "solid",
    height: theme.height.link,
    marginTop: "calc(-1 * (" + theme.height.headpiece + " /2 ))",
    marginLeft: "calc(" + theme.width.headpiece + " /2 )",
  });

  /*
   * Component
   */

  const person = getPersonById(node.id, persons) || {
    id: node.id,
    label: node.id.replace("_", " "),
  };
  const firstSpouse: Person = node.spouse?.length
    ? getPersonById(node.spouse[0], persons) ?? {
        id: node.spouse[0],
        label: node.spouse[0],
      }
    : { id: `${node.id}_spouse`, label: "?" };
  const childs = node.child.filter((c) => {
    const child = getPersonById(c.id, persons);

    return (
      firstSpouse.id === `${node.id}_spouse` ||
      child?.mother === firstSpouse.id ||
      firstSpouse.child?.includes(c.id)
    );
  });

  return (
    <div>
      <div css={headpiecesContainer}>
        <Headpiece person={person}></Headpiece>
        <div css={maritalLink}></div>
        <Headpiece person={firstSpouse}></Headpiece>
      </div>
      <div css={childrenContainer}>
        <div css={childrenLink}></div>
        <div css={children}>
          {childs.map((child) => (
            <TreeNode node={child} persons={persons} key={child.id}></TreeNode>
          ))}
        </div>
      </div>
    </div>
  );
};
