import { useRef, useState } from 'react';
import './ImageUpload.css';
import { uuidv4 } from '@firebase/util';
import { UploadImageProps } from '../../types/Canvas.interface';
import { Image } from '../../types/ImageUpload.interface';
import Loader from '../Loader/Loader';

function ImageUpload({ setNewImage }: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageObj, setImageObj] = useState<Image[]>();
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleClick = async (imageClicked: any) => {
    setImageLoading(true);
    const formData = new FormData();
    formData.append('file', imageClicked);
    formData.append('upload_preset', 'yvorzt4q');
    const url = process.env.REACT_APP_CLOUDURL as string;
    const upload = await fetch(url, { method: 'POST', body: formData });
    const res = await upload.json();
    setNewImage(res.url);
    setImageLoading(false);
  };

  const updatePreview = (file: any) => {
    if (file) {
      file.preview = URL.createObjectURL(file);
      return file;
    }
  };

  return (
    <div className='uploadContainer'>
      <form className='imageForm'>
        <input
          type='file'
          multiple={true}
          accept='image/*'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            if (e.currentTarget.files) {
              //probar e.currentTarget.files
              const files = e.currentTarget.files; //probar e.currentTarget.files
              setImageObj((prev: any) => {
                let arr: Element[] | null = [];
                for (const indx in files) {
                  if (files.hasOwnProperty(indx)) {
                    const element = updatePreview(files[indx]);
                    arr.push(element);
                  }
                }
                if (prev) return [...prev, ...arr];
                else return [...arr];
              });
            } else {
              setImageObj(undefined);
            }
          }}
        />
        <button className='buttonUploadImages' onClick={handleSubmit}>
          UPLOAD IMAGES
        </button>
        <div className='loaderContainer'>
          {imageLoading && <Loader></Loader>}
        </div>
      </form>
      <div className='imagesScroll'>
        {imageObj?.map((el: Image, indx: Number) => {
          return (
            <img
              onClick={() => {
                const file = el;
                handleClick(file);
              }}
              key={uuidv4()}
              src={el.preview}
              alt={'not uploaded'}
              style={{ height: '88px' }}
            ></img>
          );
        })}
      </div>
    </div>
  );
}

export default ImageUpload;
