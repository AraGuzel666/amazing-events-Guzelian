

const detailsBox = document.querySelector('.section-details');

const searchParams = new URLSearchParams(window.location.search);
const name = searchParams.get('name');
const image = searchParams.get('image')
const price = searchParams.get('price');
const description = searchParams.get('description');

console.log(name, price, description, image)

const renderDetails = (name, price, desc, image, container) => {
    const detailCard = document.createElement('div')
    detailCard.classList.add('details-box')
    detailCard.innerHTML = `
    <div class="img-details">
        <img src="${image}" alt="Imagen prueba">
    </div>
    <div class="description-details">
        <h2>${name}</h2>
        <p>
            <b><i class="fa-sharp fa-solid fa-tag"></i>
                    Precio $${price}</b></p>
        <p><b>Description</b></p>
    <p>
        ${desc}
    </p>
    <button class="back"><i class="fa-sharp fa-solid fa-rotate-left"> Back ...</i></button>
</div>`
    container.appendChild(detailCard)
}

  
renderDetails(name, price, description, image, detailsBox)