import React, { Component } from 'react';
import styled from 'styled-components';
import TinyGallery from './TinyGallery.jsx';




const Overlay = styled.div`
  opacity:1;
  background-color:#FFF;
  position:fixed;
  width:100%;
  height:100%;
  top:0px;
  left:0px;
  z-index:1000;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
`;

const CurrentImg = styled.img`
  height: 550px;
  width: 600px;
  border-radius: 30px;
  vertical-align: top
`;
const TinyGalleryDesigner = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 100px;
  max-width: 400px;
  overflow: hidden;
  margin-top: 40px;

`;

const XImg = styled.img`
 height: 50px;
 width: 250px;
`;
const XButton = styled.div`
   display: flex;
   justify-content: flex-end;
   margin-top: 40px;

`;
const DescriptionContainer = styled.div`
  width: 350px;
  height: 350px;
  overflow: hidden;

`;

const ImgTracker = styled.div`
  margin-top: 50px;
  font-weight: bold;
`;

const DescriptionDiv = styled.div`
  margin-top: 30px
`;

const GalleryButton = styled.img`
  position: relative;
  height: 500px;
  width: 150px;
  margin: 5px;
  vertical-align: top
  margin-right: 30px;
  margin-left: 30px;
`;
const PopGallery = (props) => (
  <Overlay>
    <XButton>
      <XImg className="x-button" onClick={props.onToggle} src="https://images-for-fec-project.s3-us-west-1.amazonaws.com/x+close+button.PNG" />
    </XButton>
    <Grid>
      <div className="currentPhotoSection">
        <GalleryButton className="backButton" onClick={() => (props.changeCurrentPhoto(props.backButtonImage))} src="https://images-for-fec-project.s3-us-west-1.amazonaws.com/back+button.PNG" />
        <CurrentImg className="currentPhoto" src={props.currentPhoto.imageSource} />
        <GalleryButton className="nextButton" onClick={() => (props.changeCurrentPhoto(props.nextButtonImage))} src="https://images-for-fec-project.s3-us-west-1.amazonaws.com/next+buton.PNG" />
      </div>
      <DescriptionContainer>

      <TinyGalleryDesigner>
       <TinyGallery changeCurrentPhoto={props.changeCurrentPhoto} className="tiny-gallery" tinyGalleryImages={props.tinyGalleryImages} currentPhoto={props.currentPhoto} />
     </TinyGalleryDesigner>
      <ImgTracker className="image-tracker">{`${props.currentPhoto.imagePlaceNumber} / ${props.imagesLength}`}</ImgTracker>
      <DescriptionDiv className="description">{props.currentPhoto.imageDescription}</DescriptionDiv>
    </DescriptionContainer>
    </Grid>
  </Overlay>
);


export default PopGallery;
