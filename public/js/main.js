// Variables to hold view data
let width = 500;
let height = 0;
let filter = 'none';
let streaming = false;

// References for elements
const video = document.getElementById('videoStream');
const canvas = document.getElementById('mainCanvas');
const photos = document.getElementById('photos');
const btnTakePhoto = document.getElementById('btnTakePhoto');
const btnClear = document.getElementById('btnClear');
const sltFilters = document.getElementById('filters');

// Prefer camera resolution nearest to 1280x720.
var constraints = {
	audio: false,
	video: {
		width: width,
		height: height
	}
};

navigator.mediaDevices.getUserMedia(constraints)
	.then(function (mediaStream) {
		var video = document.querySelector('video');
		video.srcObject = mediaStream;
		video.onloadedmetadata = function (e) {
			video.play();
		};
	})
	.catch(function (err) {
		console.log(err.name + ": " + err.message);
	}); // always check for errors at the end.

video.addEventListener('canplay', e => {
	if(!streaming) {
		height = video.videoHeight / (video.videoWidth / width);

		video.setAttribute('width', width);
		video.setAttribute('height', height);
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
	}
});

takePicture = () => {
	//create area to show the image
	const context = canvas.getContext('2d');
	if(width && height) {
		//set the Image size
		canvas.height = height;
		canvas.width = width;

		//Draw the image to save it
		context.drawImage(video, 0, 0, width, height);

		//Create the Image from canvas
		const imgUrl = canvas.toDataURL('image/png');

		//create a dynamic Img Object and set the Src of that element
		const imgDynamic = document.createElement('img');
		imgDynamic.setAttribute('src', imgUrl);

		imgDynamic.style.filter = filter;
		// Add Image to photos list.
		photos.appendChild(imgDynamic);
	}
}

btnTakePhoto.addEventListener('click', e => {
	takePicture();
	e.preventDefault();
}, false);

sltFilters.addEventListener('change', e => {
	filter = e.target.value;
	video.style.filter = filter;
	e.preventDefault();
});

btnClear.addEventListener('click', e => {
	//Clear all the photos
	photos.innerHTML = '';
	//remove filter
	filter = 'none';
	video.style.filter = filter;		
	//reset the input elements
	sltFilters.selectedIndex = 0;
});
