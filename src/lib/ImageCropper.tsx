import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

interface CropArea {
  x: number;
  y: number;
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // para evitar CORS
    image.src = url;
  });
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Função para recortar a imagem usando canvas
 * @param imageSrc URL da imagem
 * @param pixelCrop área de crop em pixels (x, y, width, height)
 * @param rotation rotação em graus (opcional)
 * @returns Promise com Blob da imagem cortada
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  const rotRad = getRadianAngle(rotation);

  // calcular tamanho do canvas considerando rotação
  const sin = Math.abs(Math.sin(rotRad));
  const cos = Math.abs(Math.cos(rotRad));
  const newWidth = image.width * cos + image.height * sin;
  const newHeight = image.width * sin + image.height * cos;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // mover o contexto para o centro do canvas para rotacionar
  ctx.translate(-pixelCrop.x, -pixelCrop.y);
  ctx.drawImage(image, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/png');
  });
}

export function ImageCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropArea>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // Quando o crop muda, atualiza a área em pixels
  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  // Função para carregar a imagem do input
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setCroppedImage(null);
    }
  };

  // Função para ler arquivo e retornar dataURL
  function readFile(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.readAsDataURL(file);
    });
  }

  // Função para gerar a imagem cortada
  const showCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedImageUrl = URL.createObjectURL(croppedBlob);
      setCroppedImage(croppedImageUrl);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileChange} />

      {imageSrc && (
        <div style={{ position: 'relative', width: 400, height: 400, background: '#333' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {imageSrc && (
        <div>
          <label>
            Zoom:
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      <button onClick={showCroppedImage} disabled={!imageSrc}>
        Cortar imagem
      </button>

      {croppedImage && (
        <div>
          <h3>Imagem cortada:</h3>
          <img src={croppedImage} alt="Cropped" />
          <a href={croppedImage} download="cropped-image.png">
            Baixar imagem
          </a>
        </div>
      )}
    </div>
  );
}