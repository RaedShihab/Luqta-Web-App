import React from "react";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import NoImgAr from "../../../assets/noImg.png";

const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
  const {matches} = isMobile
  const {images} = isMobile
  return (
    <div>
      <AutoRotatingCarousel
        // label="Get started now"
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={(i) =>{ 
          // setHandleOpen({ open: false })`
          console.log('i',i)}
        }
        autoplay={false}
        mobile={matches}
        onChange={(i)=>  {
          console.log(i)
        }}
        // landscape={true}
      >
        {
          images.length > 0 ?
          images.map(img=> {
            return <Slide
            media={
                <img style={{width: "100%"}} src={img} />
            }
            mediaBackgroundStyle={{ height: '92%',  backgroundColor: 'white'}}
            style={{ backgroundColor: 'white' }}
            // title="Luqta Sooq"
            // subtitle="Just using this will blow your mind."
            
          />
          })
          :
          <Slide  
            media={
              <img style={{width: "100%", height: `${!matches?"100%" : ""}`}} src={NoImgAr} />
            }
            // mediaBackgroundStyle={{ backgroundColor: red[400] }}
            // style={{ backgroundColor: red[600] }}
            mediaBackgroundStyle={{ height: '100%'}}
          />
        }
      </AutoRotatingCarousel>
    </div>
  );
};

export default AutoRotatingCarouselModal