import styled from "styled-components";

const PopupLayer = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 10px;
  width: 520px;
  max-width: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 25px 20px 40px;
  
`

export {
    PopupLayer
}
