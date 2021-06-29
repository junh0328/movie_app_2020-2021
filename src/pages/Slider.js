import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const Container = styled.div`
//   overflow: hidden;
// `;

// const StyledSlider = styled(Slider)`
//   .slick-slide div {
//     outline: none;
//     width: auto;
//   }
// `;

// const ImageContainer = styled.div`
//   margin: 0 16px;
// `;

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 160px;
// `;

const imgUrl = require('../image/image.jpeg');

const items = [
  { id: 1, url: imgUrl },
  { id: 3, url: imgUrl },
  {
    id: 4,
    url: 'https://image.shutterstock.com/image-illustration/3d-rendering-shepherds-purse-capsella-600w-1926917882.jpg',
  },
  { id: 5, url: imgUrl },
];

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
    };
    return (
      <>
        <h2> Single Item</h2>
        <Slider {...settings}>
          {items.map((item) => {
            return (
              <div key={item.id}>
                <img src={item.url} />
              </div>
            );
          })}
        </Slider>
      </>
    );
  }
}
