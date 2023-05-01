import styled from "styled-components";

export const StyledTable = styled.table`
  border: none;
  border-collapse: collapse;

  td,
  th {
    border: none;
  }

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #082b40;
    }
    :hover {
      background-color: #045280;
      border: 2px solid #082d50;
    }
  }
  thead > tr {
    background-color: #1af20f;
    border: 1px solid;
  }
`;
