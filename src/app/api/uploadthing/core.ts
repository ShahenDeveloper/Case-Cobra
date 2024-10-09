import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { z } from 'zod';
import sharp from 'sharp';
import { saveConfiguration } from '@/app/actions/saveConfiguration';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imgMetadata = await sharp(buffer).metadata();
      const { width, height } = imgMetadata;

      // Pass the configId, file URL, width, and height to the save function
      const savedConfigId = await saveConfiguration({
        configId,
        fileUrl: file.url,
        width: width || 500,
        height: height || 500,
      });

      return { configId: savedConfigId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
