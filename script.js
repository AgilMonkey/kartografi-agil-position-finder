// Fungsi untuk mendapatkan lokasi pengguna
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation tidak didukung oleh browser Anda.");
  }
}


// Replace 'YOUR_API_KEY' with a Nominatim API key (optional)
function getAddress(lat, lng) {
  var url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lng + "&addressdetails=1";
  // if (YOUR_API_KEY) {
  //   url += "&key=" + YOUR_API_KEY;
  // }
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.address) {
        var address = "";
        if (data.address.postcode) {
            address += data.address.postcode + ", ";
        }
        if (data.address.road) {
            address += data.address.road + ", ";
        }
        if (data.address.city) {
            address += data.address.city + ", ";
        }
        if (data.address.country) {
            address += data.address.country;
        }
        document.getElementById('address').textContent = "Alamat: " + address;
      } else {
        console.error("Error:", "Address not found");
      }
    })
    .catch(error => console.error("Error:", error));
}

// Fungsi untuk menampilkan lokasi di peta dan kotak informasi
function showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  // Menambahkan marker ke peta
  var myMap = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  var marker = L.marker([lat, lng]).addTo(myMap);

  // Menampilkan informasi lokasi
  var address = getAddress(lat, lng);
  //document.getElementById('address').textContent = "Alamat: " + address;
  document.getElementById('latitude').textContent = "Lintang: " + lat.toFixed(4);
  document.getElementById('longitude').textContent = "Bujur: " + lng.toFixed(4);
}

// Fungsi untuk menampilkan pesan error
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Anda tidak mengizinkan akses ke lokasi Anda.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Lokasi Anda tidak tersedia.");
      break;
    case error.TIMEOUT:
      alert("Waktu tunggu untuk mendapatkan lokasi Anda habis.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Terjadi kesalahan yang tidak diketahui.");
      break;
  }
}

// Menjalankan fungsi untuk mendapatkan lokasi saat halaman dimuat
getLocation();
