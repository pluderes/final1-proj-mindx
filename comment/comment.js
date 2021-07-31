const content = document.getElementById("commentContent");
const cmtList = document.getElementById("comment-section");

let field = document.querySelector("textarea");
let backUp = field.getAttribute("placeholder");
let btn = document.querySelector(".cmtButtons");
let clear = document.getElementById("clear");
let cmtBtn = document.getElementById("commentBtn");
let cmtBox = document.querySelector(".commentBox");

let params = new URL(document.location).searchParams;
let filmNameURL = getArg(params);
// console.log(params);
// console.log(`URL FILM NAME: `, filmNameURL);

function getArg(params) {
  let ID = params.get("fn");
  ID = ID.replace(/-/g, " ");
  return ID;
}

// cmtBtn.onclick = () => {
//   if (content.value.length > 0) {
//     console.log(content.value);
//     cmtList.insertAdjacentHTML(
//       "beforeend",
//       `<li>${content.value}</li>
//     `
//     );
//   }
// };

cmtBtn.addEventListener("click", postComment);

// //*****************EFFECT***************/
field.onfocus = function () {
  this.setAttribute("placeholder", "");
  this.style.borderColor = "rgb(143, 16, 16)";
  cmtBox.style.paddingBottom = "55px";
  btn.style.visibility = "visible";
  btn.style.opacity = "1";
  btn.style.display = "block";
};

field.onblur = function () {
  this.setAttribute("placeholder", backUp);
  this.style.borderColor = "#aaa";
};

const resetCommentField = () => {
  field.value = "";
  cmtBox.style.paddingBottom = "25px";
  btn.style.visibility = "hidden";
  btn.style.opacity = "0";
  btn.style.transition = "0s";
};

clear.onclick = resetCommentField;

// //asdasdsad

async function postComment() {
  try {
    if (emailLogin == null) {
      swal({
        title: `Please log in to use this feature!`,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#f8c086",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    } else {
      if (content.value.length > 0) {
        await createComment();
        resetCommentField();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function createComment() {
  try {
    const userInfo = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", emailLogin)
      .get();

    const userData = userInfo.docs[0].data();
    // console.log(userData);

    const addToComment = await firebase.firestore().collection("comment").add({
      user_id: userInfo.docs[0].id,
      content: content.value,
      created_at: new Date(),
    });

    const currentFilm = await firebase
      .firestore()
      .collection("films")
      .where("filmName", "==", filmNameURL)
      .get();

    const addToFilm = await firebase
      .firestore()
      .collection("films")
      .doc(currentFilm.docs[0].id)
      .update({
        comment_ids: firebase.firestore.FieldValue.arrayUnion(addToComment.id),
      });
    console.log("create success");
  } catch (error) {
    console.log(error);
  }
}

async function getComment() {
  try {
    const filmData = await firebase
      .firestore()
      .collection("films")
      .where("filmName", "==", filmNameURL)
      .get();

    let ids = filmData.docs[0].data().comment_ids;
    // console.log(ids);

    const commentRef = await firebase
      .firestore()
      .collection("comment")
      .orderBy("created_at", "desc");

    const userRef = await firebase.firestore().collection("users");

    Promise.all([commentRef.get(), userRef.get()]).then((docs) => {
      let commentInfo = docs[0];
      let userInfo = docs[1];

      commentInfo.docs.forEach((cmt) => {
        if (ids.includes(cmt.id)) {
          userInfo.docs.forEach((user) => {
            if (user.id === cmt.data().user_id) {
              let date = new Date(cmt.data().created_at.seconds * 1000);
              cmtList.insertAdjacentHTML(
                "beforeend",
                `<li>
                <section id="testimonials">
      
                <div class="testimonial-box-container">
                  <div class="testimonial-box">
                    <div class="box-top">
                      <!-- Profile -->
                      <div class="profile">
                        <!-- img -->
                        <div class="profile-img">
                          <img
                            src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                            alt=""
                          />
                        </div>
      
                        <!-- Username -->
                        <div class="name-user">
                          <strong>${user.data().userName}</strong>
                          <span>${date.toLocaleString()}</span>
                        </div>
                      </div>
                     
                    </div>

      
                    <div class="client-comment">
                      <p>
                       ${cmt.data().content}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
                </li>
                  `
              );
            }
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

getComment();
