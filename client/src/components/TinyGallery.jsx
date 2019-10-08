import React, { Component } from 'react';
import styled from 'styled-components';


const Img = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 5px;
  opacity: 0.7;
  margin: 7px;
  &:hover {
    opacity: 1;
  }

`;
const CurrentImg = styled.img`
  height: 65px;
  width: 65px;
  border: 2px solid black;
  border-radius: 5px;
  margin: 7px;
  opacity: 1;
`;

const EndImgs = styled.img`
  height: 65px;
  width: 40px;
  border-radius: 5px;
  opacity: 0.2;
  margin-top: 7px;
  margin-bottom: 7px;
  margin-left: 7px;
  -webkit-clip-path: inset(0 50% 0 0);
  clip-path: inset(0 50% 0 0);
  &:hover {
    opacity: 1;
  }
`;
const StartImgs = styled.img`
height: 65px;
width: 40px;
border-radius: 5px;
opacity: 0.2;
margin-top: 7px;
margin-bottom: 7px;
margin-right: 7px;
-webkit-clip-path: inset(0 0 0 51%);
clip-path: inset(0 0 0 51%);
&:hover {
  opacity: 1;
}
`;

const CurrentEndImg = styled.img`
  height: 65px;
  width: 10px;
  border-radius: 5px;
  opacity: 0.2;
  margin: 7px;
  -webkit-clip-path: inset(0 89% 0 0);
  clip-path: inset(0 89% 0 0);
  &:hover {
    opacity: 1;
  }
`;

const CurrentStartImg = styled.img`
  height: 65px;
  width: 10px;
  border-radius: 5px;
  opacity: 0.2;
  margin: 7px;
  -webkit-clip-path: inset(0 89% 0 0);
  clip-path: inset(0 89% 0 0);
  &:hover {
    opacity: 1;
  }
`;

const TinyGallery = ({ tinyGalleryImages, currentPhoto, changeCurrentPhoto }) => (
  <div id="tiny-gallery">

    {tinyGalleryImages.map((image, index) => {
      if (image.imageId === currentPhoto.imageId) {
        return (<CurrentImg key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      } if (tinyGalleryImages.length - 1 === index && tinyGalleryImages[0].imageId === currentPhoto.imageId) {
        return (<CurrentEndImg key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      } if (index === 0 && tinyGalleryImages[tinyGalleryImages.length - 1].imageId === currentPhoto.imageId) {
        return (<CurrentStartImg key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      } if (index === 0 && tinyGalleryImages[tinyGalleryImages.length - 2].imageId === currentPhoto.imageId) {
        return (<CurrentStartImg key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      } if (tinyGalleryImages.length - 1 === index && tinyGalleryImages[1].imageId === currentPhoto.imageId) {
        return (<CurrentEndImg key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      } if (index === 0 && tinyGalleryImages[1].imageId === currentPhoto.imageId) {
        return (<Img key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      } if (index === tinyGalleryImages.length - 1 && tinyGalleryImages[tinyGalleryImages.length - 2].imageId === currentPhoto.imageId) {
        return (<Img key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      } if (index === 0) {
        return (<StartImgs key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      } if (tinyGalleryImages.length - 1 === index) {
        return (<EndImgs key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);
      }
      return (<Img key={index} className="tiny-image" src={image.imageSource} onClick={() => (changeCurrentPhoto(image))} />);

    })}
  </div>
);

export default TinyGallery;
