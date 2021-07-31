const link = (str) => {
  str = str.replace(/\s/g, "-");
  console.log(str);
  return str;
};

let searchInpWEB = document.getElementById("searchInpWEB");
let form = document.getElementById("searchFormWEB");

searchInpWEB.onkeyup = (e) => {
  if (e.key === "Enter" || e.keycode === 13) {
    let param = link(searchInpWEB.value);
    window.location.href = `./search.html?kw=${param}`;
    localStorage.setItem("kw", searchInpWEB.value);
  }
};
// ----------------- genres ---------------------------
let anime = document.getElementById("anime");
let action = document.getElementById("action");

anime.onclick = () =>{
  window.location.href = `./movie-category.html?genres=anime`;
  localStorage.setItem("genres", "Animation");
}
action.onclick = () =>{
  window.location.href = `./movie-category.html?genres=action`;
  localStorage.setItem("genres", "Action");
}