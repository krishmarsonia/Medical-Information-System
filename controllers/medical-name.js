exports.medicine_search = (req, res, next) => {
  console.log("Medicine Name: ", req.body.Medicine_name);
  if (req.body.Medicine_name == ("Paracetamol" || "paracetamol")) {
    res.redirect("/Paracetamol");
  } else if (req.body.Medicine_name == ("Atarax" || "atarax")) {
    res.redirect("/Atarax");
  } else {
    res.redirect("/Medicine-list");
  }
}

exports.paracetamol = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "/krinix", "/views", "/paracetamol.html"));
  res.render("search-list", {
    pageTitle: "Medicine List",
    Medicine_name: "Paracetamol",
    Medicine_image:
      "https://4.imimg.com/data4/AW/AE/MY-4092588/paracetamol-tablets-500x500.jpg",
    Medicine_Manufacturer: "Krish",
    Medicine_Composition: "Paracetamol (650mg)",
    Medicine_sy1: "Fever",
    Medicine_sy2: "FeverPain relief",
    Price: "70 Rs",
  });
};

exports.Atarax = (req, res, next) => {
    // res.sendFile(path.join(__dirname, "../", "/krinix", "/views", "/paracetamol.html"));
    res.render("search-list", {
      pageTitle: "Medicine List",
      Medicine_name: "Paracetamol",
      Medicine_image:
        "https://res.cloudinary.com/du8msdgbj/image/upload/l_watermark_346,w_240,h_240/a_ignore,w_240,h_240,c_fit,q_auto,f_auto/v1531402789/ea0seoqvuvbylykjwb4g.jpg",
      Medicine_Manufacturer: 'Dr Reddys Laboratories Ltd',
      Medicine_Composition: 'Hydroxyzine (25mg)',
      Medicine_sy1: 'Anxiety',
      Medicine_sy2: 'Skin conditions with inflammation & itching',
      Price: '100 Rs'
  
    });
  }