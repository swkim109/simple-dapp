import styled from "styled-components";

// 애플리케이션의 전체적인 레이아웃을 구성한다.
// 애플리케이션의 전체에 적용될 스타일을 설정한다.
const BaseLayout = styled.div`
  padding: 0px 5px 0 5px; /* top right bottom left */
  font-family: Consolas, Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-style: normal;
  color: black;
`;

const BaseParagraph = styled.p`
  font-family: Consolas, Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-style: normal;
  font-size: ${props => props.size || 'medium'};;
  color: ${props => props.color || 'black'};
`


export {
    BaseLayout,
    BaseParagraph
}
