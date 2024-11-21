
document.addEventListener("DOMContentLoaded", () => {
    loadTweets();
});

function postTweet() {
    const tweetInput = document.getElementById("tweetInput");
    const tweetText = tweetInput.value.trim();

   
    if (tweetText !== "") {
        const tweet = {
            id: Date.now(),
            text: tweetText,
            likes: 0
        };
        addTweetToLocalStorage(tweet);
        tweetInput.value = ""; 
        loadTweets(); 
    } else {
        alert("Please write something before tweeting!");
    }
}

function loadTweets() {
    const tweetsContainer = document.getElementById("tweetsContainer");
    tweetsContainer.innerHTML = ""; 

    const tweets = getTweetsFromLocalStorage();

    tweets.forEach(tweet => {
        const tweetElement = document.createElement("div");
        tweetElement.classList.add("tweet");

        tweetElement.innerHTML = `
            <p>${tweet.text}</p>
            <div class="likes-container">
                <button class="like-button" onclick="likeTweet(${tweet.id})">Like</button>
                <span>${tweet.likes} Likes</span>
            </div>
        `;
        tweetsContainer.appendChild(tweetElement);
    });
}

function likeTweet(tweetId) {
    let tweets = getTweetsFromLocalStorage();
    const tweetIndex = tweets.findIndex(tweet => tweet.id === tweetId);

    if (tweetIndex !== -1) {
        tweets[tweetIndex].likes += 1;
        localStorage.setItem("tweets", JSON.stringify(tweets)); 
        loadTweets(); 
    }
}

function addTweetToLocalStorage(tweet) {
    const tweets = getTweetsFromLocalStorage();
    tweets.push(tweet);
    localStorage.setItem("tweets", JSON.stringify(tweets)); 
}

function getTweetsFromLocalStorage() {
    const tweets = JSON.parse(localStorage.getItem("tweets"));
    return tweets ? tweets : []; 
}
