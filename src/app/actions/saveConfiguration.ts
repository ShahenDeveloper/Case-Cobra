import { db } from '@/db/prisma';

interface SaveConfigParams {
  configId?: string;
  fileUrl: string;
  width: number;
  height: number;
}

// Function to save or update configuration
async function saveConfiguration({ configId, fileUrl, width, height }: SaveConfigParams) {
  try {
    if (!configId) {
      // Create new configuration
      const newConfig = await db.configuration.create({
        data: {
          imgUrl: fileUrl,
          width: width || 500,
          height: height || 500,
        },
      });
      return newConfig.id;
    } else {
      // Update existing configuration
      const updatedConfig = await db.configuration.update({
        where: {
          id: configId,
        },
        data: {
          croppedImageUrl: fileUrl,
        },
      });
      return updatedConfig.id;
    }
  } catch (error) {
    console.error("Error saving configuration:", error);
    throw new Error("Failed to save configuration");
  }
}

export { saveConfiguration };
