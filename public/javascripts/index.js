async function createParking() {
  try {
    const typeValue = document.getElementById("vehicle-type").value;
    const checkinValue = document.getElementById("checkin").value;
    const checkoutValue = document.getElementById("checkout").value;

    const data = await axios.post('http://localhost:3000/api/parking', {
      type: typeValue,
      checkin: checkinValue,
      checkout: checkoutValue
    })
    console.log("success", data)
    window.location.replace("http://localhost:3000/parking-list.html");
  } catch (error) {
    console.log("error", error)
    alert(error?.response?.data?.message || error?.message)
  } 
}

function redirect() {
  window.location.replace("http://localhost:3000/index.html");
}

async function loadParkingList() {
  try {
    const data = await axios.get('http://localhost:3000/api/parking')
    const table = document.getElementById("parking-list");
    // Mon Dec 05 2022 13:00:00 GMT+0700 (Indochina Time)
    for(parkingData of data.data) {
      const row = table.insertRow(1);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);

      const checkin = new Date(parkingData.checkin).toString().split(" ")
      const checkout = new Date(parkingData.checkout).toString().split(" ")
      cell1.innerHTML = parkingData.type;
      cell2.innerHTML = `${checkin[4].split(":")[0]}:${checkin[4].split(":")[1]} - ${checkin[2]} ${checkin[1]} ${checkin[3]}`;
      cell3.innerHTML = `${checkout[4].split(":")[0]}:${checkout[4].split(":")[1]} - ${checkout[2]} ${checkout[1]} ${checkout[3]}`;;
      cell4.innerHTML = new Intl.NumberFormat("ID", {style: "currency", currency: "idr"}).format(parkingData.price).slice(0, -3);
      cell5.innerHTML = parkingData.status;
    }
  } catch (error) {
    console.log("error", error)
    alert(error?.response?.data?.message || error?.message)
  } 
}


