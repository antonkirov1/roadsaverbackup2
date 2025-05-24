
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
// These settings ensure models are freshly fetched. For production, you might reconsider `useBrowserCache`.
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting background removal process with u2netp model...');
    // Changed model to Xenova/u2netp for better foreground/background segmentation
    const segmenter = await pipeline('image-segmentation', 'Xenova/u2netp', {
      device: 'webgpu', // This might require specific browser support or fallbacks
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(`Image dimensions for segmentation: ${canvas.width}x${canvas.height}`);
    
    const imageDataUrl = canvas.toDataURL('image/png'); // Using PNG to preserve transparency if original has it
    console.log('Image converted to base64 for model');
    
    console.log('Processing with u2netp segmentation model...');
    const segmentationResults = await segmenter(imageDataUrl);
    
    console.log('Segmentation result:', segmentationResults);
    
    // u2netp typically returns a 'foreground' and 'background' segment.
    // We need the 'foreground' mask.
    const foregroundSegment = segmentationResults.find(result => result.label === 'foreground');

    if (!foregroundSegment || !foregroundSegment.mask || !foregroundSegment.mask.data) {
      console.error('Foreground segment not found in u2netp result:', segmentationResults);
      throw new Error('Invalid segmentation result: Foreground segment not found or mask is invalid');
    }
    
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width; // Use original canvas dimensions
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw the original image onto the output canvas first
    outputCtx.drawImage(canvas, 0, 0); 
    
    const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const data = outputImageData.data;
    const maskData = foregroundSegment.mask.data; // This should be Uint8Array with values 0-255

    // Apply the foreground mask directly to the alpha channel
    // The mask from u2netp (foreground) directly gives opacity values.
    // Higher values in the mask mean more opaque (part of the foreground).
    if (data.length / 4 !== maskData.length) {
        console.error('Image data size and mask data size do not match.', 
                      `Data length: ${data.length}, Mask length: ${maskData.length}`,
                      `Image dimensions: ${outputCanvas.width}x${outputCanvas.height}`,
                      `Mask dimensions: ${foregroundSegment.mask.width}x${foregroundSegment.mask.height}`);
        // If mask dimensions are different, we might need to resize the mask or handle it.
        // For now, let's assume they match, as u2netp output mask should match input size.
        // If they don't match, this could be a source of bugs.
        // A common case is if the model internally resizes and returns a mask of that internal size.
        // The transformers.js library usually handles resizing mask back to original image size.
        // So, let's assume they match. If not, the console log will show.
    }

    for (let i = 0; i < maskData.length; i++) {
      // maskData[i] is the alpha value (0-255) for the pixel.
      // It represents the likelihood of being foreground.
      data[i * 4 + 3] = maskData[i];
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('Foreground mask applied successfully using u2netp');
    
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) {
            console.log('Successfully created final blob (PNG) with u2netp');
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png', // Output as PNG to preserve transparency
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background with u2netp:', error);
    throw error; // Re-throw error to be caught by ServiceCard or calling function
  }
};

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Important if loading from different origins or for certain canvas operations
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
};
