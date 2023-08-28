const loadPhone = async () => {
    toggleLoadingSpinner(true)
    const inputElement = document.getElementById('input-field'),
          inputField = inputElement.value;
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputField}`);
    const data = await res.json();
    showPhones(data);
   
}
 
// show phones function
const showPhones = (data)=>{
    let phones = data.data;
    showAllButton(phones.length);
    phones = phones.slice(0,9)
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
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
};

// show loading spinner function
const toggleLoadingSpinner = (isLoading)=>{
    const spinner = document.getElementById('spinner');
    if(isLoading) {
         spinner.classList.remove('hidden');
    } else{
     spinner.classList.add('hidden');
    }
 }

//  show all button function
const showAllButton = (numberOfPhones)=>{
    const showAllBtn = document.getElementById('showAllBtn');
    if(numberOfPhones > 9) {
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden');
    }
};