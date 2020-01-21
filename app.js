const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");
//create element and render cafe
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");

  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  //deleting data
  cross.addEventListener("click", e => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    //deleting the document based on the id fetched from above
    db.collection("cafes")
      .doc(id)
      .delete();
  });
}

//accessing firebase collection
db.collection("cafes")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      // console.log(doc.data());
      renderCafe(doc);
    });
  });

//Saving data
form.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value
  });

  form.name.value = "";
  form.city.value = "";
});
