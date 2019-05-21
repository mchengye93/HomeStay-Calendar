import React from 'react';

const botSvg = {
  height: '19px',
  width: '19px',
  fill: 'rgb(130, 136, 138)',
};

const rightBotStyle = {
  cursor: 'pointer',
  userSelect: 'none',
  backgroundColor: 'rgb(255, 255, 255)',
  color: 'rgb(117, 117, 117)',
  position: 'absolute',
  top: '18px',
  lineHeight: '0.78',
  right: '22px',
  margin: '0px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgb(228, 231, 231)',
  borderImage: 'initial',
  borderRadius: '3px',
  padding: '6px 9px',
  width: '19px',


};

const leftBotStyle = {
  cursor: 'pointer',
  userSelect: 'none',
  backgroundColor: 'rgb(255, 255, 255)',
  color: 'rgb(117, 117, 117)',
  position: 'absolute',
  top: '18px',
  lineHeight: '0.78',
  left: '22px',
  margin: '0px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgb(228, 231, 231)',
  borderImage: 'initial',
  borderRadius: '3px',
  padding: '6px 9px',
  width: '19px',


};
const relative = {
  width: '678px',
  position: 'relative',
  zIndex: '2',
};

const Button = props => (
  <div id="buttons" style={relative}>
    <div onClick={props.backwardMonth} style={leftBotStyle} role="button" tabIndex="0" className="_18s8f6ik" aria-label="Move backward to switch to the previous month.">
      <svg style={botSvg} className="_1ri93fe" focusable="false" viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z" /></svg>

    </div>
    <div onClick={props.forwardMonth} style={rightBotStyle} role="button" tabIndex="0" className="_1h5uiygl" aria-label="Move forward to switch to the next month.">
      <svg style={botSvg} className="_1ri93fe" focusable="false" viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" /></svg>

    </div>
  </div>
);

export default Button;
