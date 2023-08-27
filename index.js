const loadPhone = async () => {
    const inputField = document.getElementById('input-field').value;
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputField}`);
    const data = await res.json();
    showPhones(data);
   
}

// take data from input field



const showPhones = (data)=>{
    const phones = data.data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    phones.forEach((phone)=>{
        const div = document.createElement('div');
        div.className = 'p-4'

        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure><img src=${phone.image} alt="Shoes" /></figure>
                <div class="card-body text-center">
                    <h2 class="text-center font-semibold text-2xl">${phone.phone_name}</h2>
                    <p>Your dream phone at the most affordable price you can imagine</p>
                    <div class="card-actions justify-center">
                    <button class="btn btn-primary">Show Details</button>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(div)
    })
};