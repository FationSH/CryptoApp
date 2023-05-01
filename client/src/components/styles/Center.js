import styled, { css } from "styled-components";

export const CenterV = css`
  display: flex;
  align-items: center;
`;

export const CenterH = css`
  display: flex;
  justify-content: center;
`;

export const CenterVH = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Center = styled.div`
  ${props => (props.V ? CenterV : "")}
  ${props => (props.H ? CenterH : "")}
`;
