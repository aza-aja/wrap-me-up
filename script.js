let keranjang = [];
let jenisPesanan = "";


// =========================
// SCROLL KE SECTION (MENU & LINK #)
// =========================

document.querySelectorAll('a[href^="#"]').forEach(function(link) {

    link.addEventListener("click", function(event) {

        let id = link.getAttribute("href");
        let target = document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        let tinggiNavbar = document.querySelector("header").offsetHeight;

        let posisi =
            target.getBoundingClientRect().top +
            window.scrollY -
            tinggiNavbar;

        window.scrollTo({
            top: posisi,
            behavior: "smooth"
        });

        history.replaceState(null, "", id);
    });
});


// =========================
// TAMBAH PRODUK
// =========================

function tambahProduk(nama, harga) {

    jenisPesanan = "produk";

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
// PESAN JASA
// =========================

function pesanJasa() {

    jenisPesanan = "jasa";
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


    // AMBIL DATA FORM

    let nama = document.getElementById("nama").value.trim();
    let telepon = document.getElementById("telepon").value.trim();
    let alamat = document.getElementById("alamat").value.trim();
    let catatan = document.getElementById("catatan").value.trim();


    // VALIDASI NOMOR WHATSAPP

    if (!/^08[0-9]{8,11}$/.test(telepon)) {

        alert("Nomor WhatsApp harus berupa angka dan diawali 08. Contoh: 081234567890.");

        return;
    }


    // VALIDASI JENIS PESANAN

    if (jenisPesanan === "") {

        alert("Silakan pilih produk atau jasa terlebih dahulu.");

        return;
    }


    if (jenisPesanan === "produk" && keranjang.length === 0) {

        alert("Keranjang masih kosong. Silakan pilih produk terlebih dahulu.");

        return;
    }


    // BUAT PESAN WHATSAPP

    let pesan =
        "Halo Wrap Me Up, saya ingin melakukan pemesanan.\n\n";


    pesan += "*Data Pemesan*\n";
    pesan += "Nama: " + nama + "\n";
    pesan += "WhatsApp: " + telepon + "\n";
    pesan += "Alamat: " + alamat + "\n";


    if (catatan !== "") {

        pesan += "Catatan: " + catatan + "\n";
    }


    // PESANAN PRODUK

    if (jenisPesanan === "produk") {

        pesan += "\n*Pesanan Barang*\n";

        keranjang.forEach(function(produk) {

            let subtotal = produk.harga * produk.jumlah;

            pesan +=
                "- " +
                produk.nama +
                " x" +
                produk.jumlah +
                " = Rp" +
                subtotal.toLocaleString("id-ID") +
                "\n";
        });

        pesan +=
            "\n*Total: Rp" +
            hitungTotal().toLocaleString("id-ID") +
            "*";
    }


    // PESANAN JASA

    else if (jenisPesanan === "jasa") {

        pesan += "\n*Pesanan Jasa Packing*\n";
        pesan += "Saya ingin memesan jasa packing.";
    }


    // NOMOR WHATSAPP WRAP ME UP

    let nomorWrapMeUp = "6285654416771";


    // BUAT LINK WHATSAPP

    let linkWhatsApp =
        "https://wa.me/" +
        nomorWrapMeUp +
        "?text=" +
        encodeURIComponent(pesan);


    window.open(linkWhatsApp, "_blank");

});


// =========================
// TAMPILKAN SAAT WEBSITE DIBUKA
// =========================

tampilkanKeranjang();
