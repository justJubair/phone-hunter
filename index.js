const loadPhone = async (isShowAll) => {
    toggleLoadingSpinner(true)
    const inputElement = document.getElementById('input-field'),
          inputField = inputElement.value;
    if(inputField === '') {
        return alert('No data available');
    }      
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputField}`);
    const data = await res.json();
    showPhones(data, isShowAll);
   
}
 
// show phones function
const showPhones = (data, isShowAll)=>{
    let phones = data.data;
    // show all button
    
    showAllButton(phones.length, isShowAll);
    // display only first 9 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,9);
    }
   
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    phones.forEach((phone)=> {
        const div = document.createElement('div');
        div.className = 'p-4'

        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure><img src=${phone.image} alt="Shoes" /></figure>
                <div class="card-body text-center">
                    <h2 class="text-center font-semibold text-2xl">${phone.phone_name}</h2>
                    <p>Your dream phone at the most affordable price you can imagine</p>
                    <div class="card-actions justify-center">
                    <button  onclick="showDetails('${phone.slug}')"  class="btn btn-primary">Show Details</button>
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
const showAllButton = (numberOfPhones, showAllBtnClicked)=>{
    const showAllBtn = document.getElementById('showAllBtn');
    if(numberOfPhones > 9 && !showAllBtnClicked) {
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden');
    }
};

// show all phones function
const showAllPhones = ()=>{
    loadPhone(true)
}



// show details button
const showDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const singlePhoneDetails = data.data;
    console.log(singlePhoneDetails);
    const phoneImg = document.getElementById('phone-img');
    const phoneName = document.getElementById('phone-name');
    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneName.innerText = singlePhoneDetails?.name;
    phoneImg.innerHTML = `<img class="w-36" src=${singlePhoneDetails?.image}>`
    phoneDetailsContainer.innerHTML = `
    <p class="my-2">Your dream phone at the most affordable price you can imagine</p>
    <p class="font-semibold">Storage: ${singlePhoneDetails?.mainFeatures?.storage}</p>
    <p class ="font-semibold">Display Size: ${singlePhoneDetails.mainFeatures.displaySize}</p>
    <p class="font-semibold">Chipset: ${singlePhoneDetails?.mainFeatures?.chipSet}</p>
    <p class="font-semibold">GPS: ${singlePhoneDetails?.others?.GPS || 'GPS is not available'}</p>
    `;
    show_phone_details.showModal()
}

