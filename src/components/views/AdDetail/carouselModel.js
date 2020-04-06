import React from "react";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import NoImgAr from "../../../assets/noImg.png";

const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
  const {matches} = isMobile
  const {images} = isMobile
  return (
    <div>
      {/* <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button> */}
      <AutoRotatingCarousel
        // label="Get started now"
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={() => setHandleOpen({ open: false })}
        autoplay={false}
        mobile={matches}
      >
        {
          images.length > 0 ?
          images.map(img=> {
            return <Slide
            media={
              <img src={img} />
            }
            // mediaBackgroundStyle={{ backgroundColor: red[400] }}
            // style={{ backgroundColor: red[600] }}
            title="Luqta Spooq"
            subtitle="Just using this will blow your mind."
          />
          })
          :
          <Slide
            media={
              <img src={NoImgAr} />
            }
            // mediaBackgroundStyle={{ backgroundColor: red[400] }}
            // style={{ backgroundColor: red[600] }}
            // title="This is a very cool feature"
            // subtitle="Just using this will blow your mind."
          />
        }
      </AutoRotatingCarousel>
    </div>
  );
};

export default AutoRotatingCarouselModal