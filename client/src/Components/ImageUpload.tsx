import { useRef, useState, useEffect } from 'react';

function ImageUpload({ setNewImage }: any) {
  const [images, setImages] = useState<any[]>();
  const [preview, setPreview] = useState<string[]>();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        reader.readAsDataURL(images[i]);
      }
    }
  }, [images]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };
  const handleClick = async (imageClicked: any) => {
    const formData = new FormData();
    formData.append('file', imageClicked);
    formData.append('upload_preset', 'yvorzt4q');
    const url = process.env.REACT_APP_CLOUDURL as string;
    console.log(url, formData);
    const upload = await fetch(url, { method: 'POST', body: formData });
    const res = await upload.json();
    console.log(res);
    setNewImage(res.url);
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
              const files = e.target.files;
              setImages((prev: any) => {
                let arr: any = [];
                for (const indx in files) {
                  if (files.hasOwnProperty(indx)) {
                    arr.push(files[indx]);
                    console.log(files[indx]);
                  }
                }
                if (prev) return [...prev, ...arr];
                else return [...arr];
              });
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
                  const file = (images as any)[indx];
                  console.log(file, images);
                  handleClick(file);
                }}
                key={indx}
                src={el}
                alt={indx.toString()}
                style={{ height: '150px' }}
              ></img>
            );
          })}
      </div>
    </>
  );
}

export default ImageUpload;
