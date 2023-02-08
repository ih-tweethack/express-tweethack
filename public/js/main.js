window.onload = () => {
  const likeBtns = document.querySelectorAll('.like-btn')

  likeBtns.forEach(likeBtn => {
    const tweetId = likeBtn.value;

    const iconNode = likeBtn.querySelector('.bi')

    likeBtn.onclick = () => {
      axios.post(`/tweets/${tweetId}/like`)
        .then((response) => {
          if (response.status === 201) {
            iconNode.classList.remove('bi-heart');
            iconNode.classList.add('bi-heart-fill');
          } else if (response.status === 204) {
            iconNode.classList.add('bi-heart');
            iconNode.classList.remove('bi-heart-fill');
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  })
}

// bi-heart-fill
// bi-heart