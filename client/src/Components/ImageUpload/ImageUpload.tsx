import { useRef, useState } from 'react';
import './ImageUpload.css';
import { uuidv4 } from '@firebase/util';
import { UploadImageProps } from '../../Types/Canvas.interface';
import { Image } from '../../Types/ImageUpload.interface';
import Loader from '../Loader/Loader';

//https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/nice_beach.png
function ImageUpload({ setNewImage }: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageObj, setImageObj] = useState<Image[]>();
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleClick = async (imageClicked: string | Blob | Image) => {
    setImageLoading(true);

    const formData = new FormData();
    formData.append('file', imageClicked as Blob);
    formData.append('folder', 'userimg');
    formData.append('upload_preset', 'yvorzt4q');
    const url = process.env.REACT_APP_CLOUDURL as string;
    const upload = await fetch(url, { method: 'POST', body: formData });
    const res = await upload.json();
    const startUrl = res.url.substring(0, 49);
    const endUrl = res.url.substring(49);
    const newUrl = startUrl + 'h_1000/' + endUrl;
    setNewImage(newUrl);
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
              const files = e.currentTarget.files;
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
        {imageObj?.map((el) => {
          return (
            <img
              className='imagesScrollOnImage'
              onClick={() => {
                const file = el;
                handleClick(file as Image);
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
