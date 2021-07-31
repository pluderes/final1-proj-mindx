let divResult = document.getElementById("rowContent");

async function allFilm() {
  try {
    const searchResult = await firebase.firestore().collection("films").get();
      searchResult.docs.forEach((doc) => {
        // console.log(doc.id, ` : `, listIDFilm[i]);
        divResult.insertAdjacentHTML(
          "beforeend",
          `<basic-param style="width: 335px";"
            avatar = "${doc.data().banner}"
            href = "${doc.data().href}"
            name = "${doc.data().filmName}"
            age = "${doc.data().age}"
            time = "${doc.data().time} m"
            like = "${doc.data().vote}"
            id = "${doc.id}"
          ></basic-param>`
        );
        let a = document.getElementById(`${doc.id}`);
        a.id = "";
        console.log(a);
      });
  } catch (error) {
    console.log(error);
  }
}
allFilm();
