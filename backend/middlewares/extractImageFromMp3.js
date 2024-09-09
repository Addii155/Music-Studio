import fs from 'fs';
import path from 'path';
import musicMetadata from 'music-metadata';

export default async function extractImageFromMP3(filePath) {
    try {
        const metadata = await musicMetadata.parseFile(filePath);
        
        if (metadata.common.picture && metadata.common.picture.length > 0) {
            const picture = metadata.common.picture[0]; // Get the first image
            console.log(picture.format, picture.data);
            // Save the image as a file (optional)
            // const imagePath = path.join(__dirname, 'uploads', 'album_art.jpg');
            // fs.writeFileSync(imagePath, picture.data);
            
            // return {
            //     format: picture.format,
            //     data: picture.data
            // };
        } else {
            console.log('No album art found in the MP3 file.');
            return null;
        }
    } catch (error) {
        console.error('Error extracting image from MP3:', error);
        return null;
    }
}

// Example usage:
// extractImageFromMP3('path/to/your/song.mp3').then(image => {
//     if (image) {
//         console.log('Image extracted:', image);
//     }
// });