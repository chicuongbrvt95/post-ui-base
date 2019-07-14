import postApi from "./api/postApi.js";
import utils from "./utils.js";

const renderPost = (post) => {
    //console.log(post);

    //set banner image
    utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl);

    //set title post detail
    utils.setTextByElementId('postDetailTitle', post.title);

    //set author post detail
    utils.setTextByElementId('postDetailAuthor', post.author);

    //set time span post detail
    const timeDateSpan = document.querySelector('#postDetailTimeSpan');
    timeDateSpan.innerText = utils.formatDate(post.updatedAt);

    //set description
    utils.setTextByElementId('postDetailDescription', post.description);

}

const renderEditLink = (post) => {
    const editLink = document.querySelector('#goToEditPageLink');
    if (editLink) {
        editLink.href = `add-edit-post.html?postId=${post.id}`;
        editLink.innerHTML = '<i class="fas fa-edit">Edit post</i>';
    }
}



// MAIN LOGIC
// -----------------------
const init = async () => {
    try {
        // get postID from query params
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('postId');
        if (!postId) return;

        // fecth post detail by id
        const post = await postApi.getDetail(postId);

        // render post
        renderPost(post);

        //update edit link
        renderEditLink(post);

    } catch (error) {
        console.log(error);
    };
};

init();