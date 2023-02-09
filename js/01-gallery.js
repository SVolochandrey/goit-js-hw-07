import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const markupEl = createImageGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', markupEl);
galleryContainer.addEventListener('click', onImageClick);

function createImageGalleryMarkup (gallery) {
return gallery
.map(({preview, original, description}) => {
return `<div class ="gallery__item">
<a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt= "${description}"
    />
</a>
</div>`;
})
.join("");
}

function onImageClick (event){
event.preventDefault();

if (event.target.nodeName !== "IMG") {
return;
}
else {
onOpenModalWindow(event);
}
}

function onOpenModalWindow(event) {
const instance = basicLightbox.create(
`<img
src = "${event.target.dataset.source}"
width="800" 
height="600"
>`,
{
onShow: (instance) => {
document.addEventListener("keydown", onEscPress);
},
onClose: (instance) => {
document.removeEventListener("keydown", onEscPress);
},
}
);

instance.show();

function onEscPress(event){
if (event.code === "Escape"){
instance.close();
}
}
}