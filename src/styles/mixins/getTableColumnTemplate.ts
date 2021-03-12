import { css, FlattenSimpleInterpolation } from "styled-components/macro";

type GetTableColumnTemplate = (
  columnLength: number,
  width: string,
  addButtonWidth?: string,
  attachmentIcon?: boolean
) => FlattenSimpleInterpolation;
export const getTableColumnTemplate: GetTableColumnTemplate = (
  columnLength,
  width,
  addButtonWidth = "",
  attachmentIcon = false
) => {
  if (attachmentIcon)
    return css`
      grid-template-columns: 2em repeat(${columnLength - 1}, ${width}) ${addButtonWidth};
    `;
  return css`
    grid-template-columns: repeat(${columnLength}, ${width}) ${addButtonWidth};
  `;
};
