let vaccinecenter = [];

const vaccineset = document.querySelector(".vaccineset");
console.log(vaccineset);

const searchbutton = document.querySelector("button");
console.log(searchbutton);

let today, date, month, year;
today = new Date();
date = today.getDate();
month = today.getMonth() + 1;
year = today.getFullYear();
today = `${date}-${month}-${year}`;
console.log(today);

const input = document.querySelector("#input");
console.log(input);


function vaccinedata(pincode){
    let url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pincode+'&date='+today;
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onload = function(){
        if(this.status === 200){
            let vaccine = JSON.parse(this.responseText);
            if(vaccine.sessions !== []){
                console.log(vaccine);
                vaccine.sessions.map((element,index)=>{
                    let vaccineinfo = [
                        element.name,
                        element.address,
                        element.vaccine,
                        element.date,
                        element.min_age_limit,
                        element.available_capacity,
                        element.block_name,
                        element.district_name,
                        element.fee_type,
                        element.slots
                    ]
                    console.log(vaccineinfo);

                    vaccinecenter.push(vaccineinfo);

                    console.log(vaccinecenter);

                    let html =`
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${vaccinecenter[index][0]}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Address : ${vaccinecenter[index][1]}</li>
                            <li class="list-group-item">Vaccine : ${vaccinecenter[index][2]}</li>
                            <li class="list-group-item">Date : ${vaccinecenter[index][3]}</li>
                            <li class="list-group-item">Age Limit : ${vaccinecenter[index][4]}</li>
                            <li class="list-group-item">Availability : ${vaccinecenter[index][5]}</li>
                            <li class="list-group-item">Applicable : ${vaccinecenter[index][6]}</li>
                            <li class="list-group-item">District : ${vaccinecenter[index][7]}</li>
                            <li class="list-group-item">Fees : ${vaccinecenter[index][8]}</li>
                            <li class="list-group-item">Slots : ${vaccinecenter[index][9].join(" | ")}</li>
                        </ul>
                    </div>
                    `
                    vaccineset.innerHTML += html;
                })
            } else {
                alert("Data Not Found");
            }
        } else {
            alert("Somethimg Went Wrong");
        }
    }
    xhr.send()
}

// vaccinedata();

searchbutton.addEventListener("click", ()=>{
    let pincode = input.value;
    vaccineset.innerHTML= "";
    if(pincode === ""){
        alert("Enter the pincode");
    } else if (pincode !== "") {
        vaccinedata(pincode);
    }
})
