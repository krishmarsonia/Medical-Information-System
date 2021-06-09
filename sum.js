const arr1 = [];

const obj1 = {
  fname: "krinix",
  lname: "makadiya",
};

const obj2 = {
  fname: "krish",
  lname: "marsonia",
};

arr1.push(obj1);
arr1.push(obj2);

// console.log(arr1.fname);
arr1.map(arr => {
    console.log(arr.fname); 
    console.log(arr.lname); 
})
