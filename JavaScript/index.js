var x = 2, y = 10;
console.log("x = " + x, "y = " + y);
console.log("x == y");
console.log(x == y);

console.log("x % y");
console.log(x % y);

var str = "apa saya lupa";
console.log(str);
console.log("str.length");
console.log(str.length);

console.log("str[0]");
console.log(str[0]);

console.log("\"10\" + 10 + 10");
console.log("10" + 10 + 10);
console.log("10 + 10 + \"10\"");
console.log(10 + 10 + "10");

console.log("10 == \"10\"");
console.log(10 == "10");
console.log("10 === \"10\"");
console.log(10 === "10");

console.log("10 / \"10\"");
console.log(10 / "10");

// alert("Start Code"); 
// var tmp = prompt("Enter Name");
// console.log(tmp);

// var conf = confirm("Are u Sure?");
// console.log(conf);

// while (!conf) {
//     tmp = prompt("Enter Name");
//     var conf = confirm("Are u Sure?");
//     console.log(conf);
// }

function addMe(a, b) {
    return a + b;
}

console.log(addMe(9, 2));
// argument

function arg() {
    return arguments;
}

console.log(arg(1, 2, 3, "aduh", true));

function count() {
    var res = 0;
    for (var i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }
    return res;
}
console.log(count(1,2,3,4));

var arr = [];
arr[0] = "a";
arr[1] = "b";
arr[2] = 1;
console.log(arr);
console.log(arr.join());

arr.pop();
arr.push(2);
console.log(arr);
console.log(arr.join(" "));

arr.unshift("k");
console.log(arr);

arr.shift();
console.log(arr);

//splice(idx_start, delete brp, elm baru, elm baru);
arr.splice(1, 0, "adaw");
console.log(arr);

arr.splice(1, 0, "adawde", 0);
console.log(arr);

arr.splice(1, 3, 0);
console.log(arr);

arr.forEach(function(e, i) {
    console.log('element ' + i + ' is ' + e);
})

var arr2 = [10, 12, 8, 9, 11];
arr2.sort();
console.log(arr2);
arr2.sort(function(a, b) {
    return a - b;
});
console.log(arr2);

var mahasiswa = {
    nama : '',
    nim : 0,
    ip : [],
    ipk : function() {
        var total = 0;
        for (var i = 0; i < this.ip.length; i++) {
            total += this.ip[i];
        }
        return total / this.ip.length
    },

    setNama : function(nama) {
        this.nama = nama;
    },
    getNama : function() {
        return this.nama;
    },

    setNim : function(nim) {
        this.nim = nim;
    },
    getNim : function() {
        return this.nim;
    },

    setIp : function(arguments) {
        for (var i = 0; i < arguments.length; i++) {
            this.ip.push(arguments[i]);
        }
    },
    getIp : function() {
        return this.ip;
    }
}

function create(nama, nim, ip) {
    mahasiswa.setNama(nama);
    mahasiswa.setNim(nim);
    mahasiswa.setIp(ip);
    return mahasiswa;
}

var mhs = create("parjo", 1301190221, [2.9, 3.1, 3.25, 4]);
console.log(mhs.getNama());
console.log(mhs.ipk());


function Mahasiswa(nama, nim, ip) {
    this.nama = nama;
    this.ip = ip;
    this.nim = nim;
}

var mhs2 = new Mahasiswa("hebat", 1301190221, [2.9, 3.1, 3.25, 4])
console.log(mhs2);