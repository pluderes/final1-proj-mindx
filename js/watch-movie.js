// let params = new URL(document.location).searchParams;
// let filmName = getArg(params);
// // console.log(params);
// console.log(`URL FILM NAME: `, filmName);

// function getArg(params) {
//   let ID = params.get("fn");
//   ID = ID.replace(/-/g, " ");
//   return ID;
// }

// async function getFilms() {
//   let filmData = await firebase
//     .firestore()
//     .collection("films")
//     .where("filmName", "==", filmName)
//     .get();

//   console.log(filmData.docs[0].data());
//   //   filmData.docs.forEach((doc) => {
//   //     let filmName = doc.data().filmName;
//   //     filmName = filmName.replace(/\s/g, "");
//   //   });
// }

// getFilms();
