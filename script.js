let keranjang = [];


// =========================
// TAMBAH PRODUK
// =========================

function tambahProduk(nama, harga) {

    let produkAda = keranjang.find(item => item.nama === nama);

    if (produkAda) {
        produkAda.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();

    alert(nama + " berhasil ditambahkan ke keranjang.");
}


// =========================
// TAMPILKAN KERANJANG
// =========================

function tampilkanKeranjang() {

    let isiKeranjang = document.getElementById("isiKeranjang");
    let jumlahKeranjang = document.getElementById("jumlahKeranjang");
    let totalHarga = document.getElementById("totalHarga");

    isiKeranjang.innerHTML = "";

    if (keranjang.length === 0) {

        isiKeranjang.innerHTML =
            '<p class="empty-cart">Keranjang masih kosong.</p>';

    } else {

        keranjang.forEach(function(produk, index) {

            let subtotal = produk.harga * produk.jumlah;

            isiKeranjang.innerHTML += `
                <div class="cart-item">

                    <div class="cart-item-info">
                        <h3>${produk.nama}</h3>
                        <p>
                            Rp${produk.harga.toLocaleString("id-ID")}
                            x ${produk.jumlah}
                        </p>
                    </div>

                    <div class="cart-controls">

                        <button onclick="kurangiProduk(${index})">
                            -
                        </button>

                        <span>${produk.jumlah}</span>

                        <button onclick="tambahJumlah(${index})">
                            +
                        </button>

                        <button
                            class="delete-button"
                            onclick="hapusProduk(${index})">
                            Hapus
                        </button>

                    </div>

                </div>
            `;
        });
    }

    let jumlah = 0;

    keranjang.forEach(function(produk) {
        jumlah += produk.jumlah;
    });

    jumlahKeranjang.textContent = jumlah;

    totalHarga.textContent =
        "Rp" + hitungTotal().toLocaleString("id-ID");
}


// =========================
// TAMBAH JUMLAH
// =========================

function tambahJumlah(index) {

    keranjang[index].jumlah++;

    tampilkanKeranjang();
}


// =========================
// KURANGI JUMLAH
// =========================

function kurangiProduk(index) {

    keranjang[index].jumlah--;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}


// =========================
// HAPUS PRODUK
// =========================

function hapusProduk(index) {

    keranjang.splice(index, 1);

    tampilkanKeranjang();
}


// =========================
// HITUNG TOTAL
// =========================

function hitungTotal() {

    let total = 0;

    keranjang.forEach(function(produk) {
        total += produk.harga * produk.jumlah;
    });

    return total;
}


// =========================
// FORM PEMESANAN
// =========================

document.getElementById("formPesanan").addEventListener("submit", function(event) {

    event.preventDefault();

    if (keranjang.length === 0) {

        alert("Keranjang masih kosong. Silakan pilih produk terlebih dahulu.");

        return;
    }


    let nama = document.getElementById("nama").value;
    let telepon = document.getElementById("telepon").value;
    let alamat = document.getElementById("alamat").value;
    let catatan = document.getElementById("catatan").value;


    let pesan = "Halo Wrap Me Up, saya ingin melakukan pemesanan.%0A%0A";

    pesan += "*Data Pemesan*%0A";
    pesan += "Nama: " + nama + "%0A";
    pesan += "WhatsApp: " + telepon + "%0A";
    pesan += "Alamat: " + alamat + "%0A";


    if (catatan !== "") {
        pesan += "Catatan: " + catatan + "%0A";
    }


    pesan += "%0A*Pesanan*%0A";


    keranjang.forEach(function(produk) {

        let subtotal = produk.harga * produk.jumlah;

        pesan +=
            "- " +
            produk.nama +
            " x" +
            produk.jumlah +
            " = Rp" +
            subtotal.toLocaleString("id-ID") +
            "%0A";
    });


    pesan += "%0A*Total: Rp" +
        hitungTotal().toLocaleString("id-ID") +
        "*";


    // Nomor WhatsApp Wrap Me Up
    let nomorWrapMeUp = "6281991911191";


    let linkWhatsApp =
        "https://wa.me/" +
        nomorWrapMeUp +
        "?text=" +
        pesan;


    window.open(linkWhatsApp, "_blank");

});


// =========================
// TAMPILKAN SAAT WEBSITE DIBUKA
// =========================

tampilkanKeranjang();