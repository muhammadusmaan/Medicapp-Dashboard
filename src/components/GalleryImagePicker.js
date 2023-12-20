import React, { useRef, useState } from 'react'
import { href } from '../constants/extra';
import ImageUploading from "react-images-uploading"
import { toast } from 'react-toastify';
import CAMERA_IMAGE from '../assets/images/camera.png';
import GalleryImageCrop from '../pages/Hospital/Profile/components/GalleryImageCrop';


function GalleryImgePicker({ image, updatePicture, DEFAULTIMAGE }) {

	const [images, setImages] = useState([])
	const [, setCroppedImage] = useState()
	const [imageUrl, setImageUrl] = useState()
	const imageCropRef = useRef()
	const maxNumber = 1

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex)
		setImages(imageList)
		imageCropRef.current.click()
	}


	const croppedImageHandler = (file, url) => {
		imageCropRef.current.click()
		if (file && url) {
			setImages([])
			setCroppedImage(file)
			setImageUrl(url)
			updatePicture(file)
		}
	}

	const onCancelHandler = () => {
		imageCropRef.current.click()
		setImages([])
	}


	return (
		<div style={{
			width: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: "center", display: 'flex'
		}}>
			<div style={{ visibility: 'hidden' }}>
				<a ref={imageCropRef} href={href} data-toggle="modal" data-target="#galleryImageCropp" class="btn btn-primary px-0"></a>
			</div>
			<div >
				<ImageUploading
					value={images}
					onChange={onChange}
					maxNumber={maxNumber}
					dataURLKey="data_url"
					acceptType={["jpg", "jpeg"]}
					maxFileSize={7500000}
					onError={(err, list) => {
						if (err.maxFileSize === true) {
							toast.error('Size should be less than or equal to 500 KB')
						}
					}}
				>
					{({
						onImageUpload,
						onImageUpdate,
						dragProps,
					}) => (
						// write your building UI
						<>
							<div style={{ width: '300px', height: '300px', borderRadius: '10px', cursor: "pointer", }}>
								<div style={{
									width: '300px', height: '300px', position: 'absolute', backgroundColor: '#fff', borderRadius: '10px', opacity: 0.4, zIndex: 100,
									justifyContent: 'center', alignItems: 'center', alignSelf: "center",
									display: 'flex'
								}}
									onClick={imageUrl ? onImageUpdate.bind(this, 0) : onImageUpload}>
									<img style={{ width: '55px', height: '32px', opacity: 1, color: '#fff' }} class="avatar-lg mr-0" src={CAMERA_IMAGE} alt="camera" />
								</div>
								{
									<img
										src={imageUrl ? imageUrl : image ? image : DEFAULTIMAGE}
										alt="doctor"
										style={{ width: '300px', height: '300px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #C8C8C8' }} //border: '1px solid #D3D3D3'
										{...dragProps}
									/>
								}
							</div>

						</>
					)}
				</ImageUploading>
				<GalleryImageCrop selectedFile={images[0]} croppedImageFile={croppedImageHandler} onCancel={onCancelHandler} />
			</div>
		</div>
	)
}

export default GalleryImgePicker