import React, { useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { chunk, sum } from 'lodash';
import LightGallery from 'lightgallery/react';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-autoplay.scss'
import 'lightgallery/scss/lg-fullscreen.scss'
import 'lightgallery/scss/lg-share.scss'

// import plugins if you need
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';

const Gallery = ({
  thumbs,
  full,
  itemsPerRow: itemsPerRowByBreakpoints = [2],
}) => {

  const aspectRatios = thumbs.map((image) => image.width / image.height);
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    (itemsPerRow) =>
      chunk(aspectRatios, itemsPerRow).map((rowAspectRatios) =>
        sum(rowAspectRatios)
      )
  );
  const onInit = () => {};

  return (
    <div className="gallery">
       <LightGallery
          onInit={onInit}
          speed={500}
          download={false}
          plugins={[lgZoom, lgAutoplay, lgFullscreen, lgShare]}
          autoplay={{
            autoplay: true,
            pause: 3000,
            autoplayFirstVideo: true,
          }}
          share={{
            facebook: true,
            x: true,
            pinterest: true,
          }}
      >
        {thumbs.map((thumb, i) => {
          const thumbnail = getImage(thumb);

          return (
            <a
              href={full[i].images.fallback.src}
              className="gallery__item"
              key={i}
              style={{
                '--thumb-width': rowAspectRatioSumsByBreakpoints.map(
                  (rowAspectRatioSums, j) => {
                    const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j]);
                    const rowAspectRatioSum = rowAspectRatioSums[rowIndex];

                    return `calc(${
                      (aspectRatios[i] / rowAspectRatioSum) * 100
                    }% - 5px)`;
                  }
                )[0],
              }}
              >
              <GatsbyImage image={thumbnail} alt={thumb?.caption} />
            </a>
          );
        })}
          ...
      </LightGallery>
      {/* {thumbs.map((thumb, i) => {
        const thumbnail = getImage(thumb);

        return (
          <div
            className="gallery__item"
            key={i}
            style={{
              '--thumb-width': rowAspectRatioSumsByBreakpoints.map(
                (rowAspectRatioSums, j) => {
                  const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j]);
                  const rowAspectRatioSum = rowAspectRatioSums[rowIndex];

                  return `calc(${
                    (aspectRatios[i] / rowAspectRatioSum) * 100
                  }% - 5px)`;
                }
              )[0],
            }}
          >
            <GatsbyImage image={thumbnail} alt={thumb?.caption} />
            <button
              title={thumb?.caption}
              className="gallery__link"
            >
            </button>
          </div>
        );
      })}
      <Modal className="full-images" isOpen={modalIsOpen} onClose={closeModal}>
        <Swiper
          onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
          initialSlide={modalCurrentIndex}
          onSlideChange={(swiper) => setModalCurrentIndex(swiper.activeIndex)}
        >
          {full.map(({ images, caption }, i) => (
            <SwiperSlide key={i}>
              <img
                src={images.fallback.src}
                alt={caption}
                className="full-images__img"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal> */}

    </div>
  );
};

export default Gallery;
