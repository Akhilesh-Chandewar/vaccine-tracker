let vaccinecenter = [];

const vaccineset = document.querySelector(".vaccineset");

const searchbutton = document.querySelector(".searchbox").querySelector("button");

let today, date, month, year;
today = new Date();
date = today.getDate();
month = today.getMonth() + 1;
year = today.getFullYear();
today = `${date}-${month}-${year}`;
console.log(today);

function vaccinedata(pincode) {
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${today}`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            if (data.sessions !== []) {
                console.log("Data found")
                data.sessions.map((element, index) => {
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
                    let code = `
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
                    </div>`

                    vaccineset.innerHTML += code;
                });

                if (data.sessions.length === 0) {
                    alert("No VAccine available");
                }
                vaccinecenter = [];
            }
            else {
                alert("Something Went Wrong");
            }
        };

        xhr.send();
    }
}

vaccinedata(440015);


/*<dl class="row">
  <dt class="col-sm-3">Description lists</dt>
  <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

  <dt class="col-sm-3">Term</dt>
  <dd class="col-sm-9">
    <p>Definition for the term.</p>
    <p>And some more placeholder definition text.</p>
  </dd>

  <dt class="col-sm-3">Another term</dt>
  <dd class="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>

  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>

  <dt class="col-sm-3">Nesting</dt>
  <dd class="col-sm-9">
    <dl class="row">
      <dt class="col-sm-4">Nested definition list</dt>
      <dd class="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
    </dl>
  </dd>
</dl>*/