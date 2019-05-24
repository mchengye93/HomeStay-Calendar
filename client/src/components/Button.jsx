import React from 'react';
import styled from 'styled-components';

const Buttons = styled.div`
  cursor: pointer;
  user-select: none';
  background-color: rgb(255, 255, 255);
  color: rgb(117, 117, 117);
  position: absolute;
  top: 18px;
  line-height: 0.78;
  right: 22px;
  margin: 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(228, 231, 231);
  border-image: initial;
  border-radius: 3px;
  padding: 6px 9px;
  width: 19px;
  
 
`;

const LeftButton = styled(Buttons)`
left: 22px;
`;

const RightButton = styled(Buttons)`
right:22px;
`;

const Svg = styled.svg`
height: 19px;
width: 19px;
fill: rgb(130, 136, 138);
`;


const Relative = styled.div`
width: 678px;
position: relative;
z-index: 2;
`;

const Button = props => (
  <Relative>
    <div id="buttons">
      <LeftButton>
        <div onClick={props.backwardMonth} id="prevMonth">
          <Svg>
            <svg focusable="false" viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z" /></svg>
          </Svg>
        </div>
      </LeftButton>
      <RightButton>
        <div onClick={props.forwardMonth} id="nextMonth">
          <Svg>
            <svg focusable="false" viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" /></svg>
          </Svg>
        </div>
      </RightButton>
    </div>
  </Relative>
);

export default Button;
