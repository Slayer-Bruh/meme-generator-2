async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = 'webify'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('file', imgData, 'meme.jpg')
  formData.append('upload_preset', 'webify')

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error.message)

    onSuccess(data.secure_url)
  } catch (err) {
    console.error('Upload failed:', err)
  }
}
