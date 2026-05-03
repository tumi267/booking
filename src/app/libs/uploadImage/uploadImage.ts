export async function uploadToimage(file:any) {
    const PROJECT_ID = process.env.NEXT_PUBLIC_project_id;
    const BUCKET = 'bookingimage';
    const FOLDER = 'images';
    const FILE_NAME = `${Date.now()}-${file.name}`;
    
    // Use 'service_role' key for backend or 'anon' key for frontend
    const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY; 
  
    const url = `https://${PROJECT_ID}.supabase.co/storage/v1/object/${BUCKET}/${FOLDER}/${FILE_NAME}`;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': API_KEY as string, 
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': file.type, 
      },
      body: file // The raw File object from the input
    });
  
    if (response.ok) {
      const result = await response.json();
    //   console.log('Upload successful:', result);
      return result
      // The public URL will be: 
      // https://[ID].supabase.co/storage/v1/render/image/public/[BUCKET]/[FOLDER]/[FILE_NAME]
    } else {
      const error = await response.json();
      console.error('Upload failed:', error);
    }
  }

