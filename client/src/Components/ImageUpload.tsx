import React, { useRef, useState, useEffect } from 'react';
import Canva from './Canva-fileupload';

function ImageUpload() {
  const [images, setImages] = useState<FileList>();
  const [preview, setPreview] = useState<string[]>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<any>(null);

  useEffect(() => {
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prev) => {
            if (prev) {
              return [...prev, reader.result as string];
            } else return [reader.result as string];
          });
        };
        // console.log(i, images, images[i]);
        reader.readAsDataURL(images[i]);
      }
    }
  }, [images]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };
  const handleClick = (imageClicked: any) => {
    setUploadedImage([imageClicked]);
  };

  return (
    <>
      <form>
        <input
          type='file'
          multiple={true}
          accept='image/*'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files;
              setImages(file);
            } else {
              setImages(undefined);
            }
          }}
        />
        <button onClick={handleSubmit}>Upload images</button>
      </form>
      <div>
        {preview &&
          preview.map((el, indx) => {
            return (
              <img
                onClick={() => {
                  handleClick(el);
                }}
                key={indx}
                src={el}
                alt={indx.toString()}
                style={{ width: '300px' }}
              ></img>
            );
          })}
      </div>
      <Canva uploadedImage={uploadedImage}></Canva>
    </>
  );
}

export default ImageUpload;
