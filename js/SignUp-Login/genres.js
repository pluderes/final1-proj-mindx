let params = new URL(document.location).searchParams.get("genres");
params = params.replace(/-/g, " ");

let genres = localStorage.getItem("genres");

let filmGenres = document.getElementById("filmGenres");
filmGenres.innerHTML += genres;

let divResult = document.getElementById("rowContent");

async function genresFilm() {
  try {
    const searchResult = await firebase.firestore().collection("films").get();
    searchResult.docs.forEach((doc) => {
      // console.log(doc.id, ` : `, listIDFilm[i]);
      if (
        doc
          .data()
          .genre.map((e) => e.toLowerCase())
          .includes(genres.toLocaleLowerCase())
      ) {
        divResult.insertAdjacentHTML(
          "beforeend",
          `<basic-param style="width: 335px";"
          avatar = "${doc.data().banner}"
          href = "${doc.data().href}"
          name = "${doc.data().filmName}"
          age = "${doc.data().age}"
          time = "${doc.data().time}"
          like = "${doc.data().vote}"
          id = "${doc.id}"
        ></basic-param>`
        );
        let a = document.getElementById(`${doc.id}`);
        a.id = "";
      }
    });
  } catch (error) {
    console.log(error);
  }
}
genresFilm();
