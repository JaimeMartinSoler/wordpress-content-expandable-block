
document.addEventListener('DOMContentLoaded', function() {

    let newsIdxDict = {};

    function changeNewsText(action, postId) {

        // get divNewsTextArray
        const divNewsTextArray = document
            .querySelector(`.news-text-container[news-post-id="${postId}"]`)
            .querySelectorAll('.news-text');
            
        // newsIdxDefault (idx of the news-text with style display "block" instead of "none")
        let newsIdxDefault = -1;
        divNewsTextArray.forEach((div, i) => {
            if (div.style.display === "block") {
                newsIdxDefault = i;
            }
        });

        // update newsIdxDict 
        newsIdxDict[postId] ||= newsIdxDefault  // if postId not in newsIdxDict, create it with value newsIdxDefault
        if (action === 'increase' && newsIdxDict[postId] < divNewsTextArray.length - 1) {
            newsIdxDict[postId]++;
        } else if (action === 'decrease' && newsIdxDict[postId] > 0) {
            newsIdxDict[postId]--;
        }

        // update divNewsTextArray style.display 
        divNewsTextArray.forEach(function(divNewsText, idx) {
            if (idx == newsIdxDict[postId]) {
                divNewsText.style.display = "block";
            } else {
                divNewsText.style.display = "none";
            }
        });

        if (divNewsTextArray.length > 1) {
            // get nbContainer
            const nbContainer = document.querySelector(`.news-button-container[news-post-id="${postId}"]`);
            // update buttons
            // nb-01: idx 0
            if (newsIdxDict[postId] == 0) {
                nbContainer.querySelector('.news-button.nb-01.nb-enabled').style.display = "none";
                nbContainer.querySelector('.news-button.nb-01.nb-disabled').style.display = "block";
            } else {
                nbContainer.querySelector('.news-button.nb-01.nb-enabled').style.display = "block";
                nbContainer.querySelector('.news-button.nb-01.nb-disabled').style.display = "none";
            }
            // nb-02: idx last
            if (newsIdxDict[postId] == divNewsTextArray.length - 1) {
                nbContainer.querySelector('.news-button.nb-02.nb-enabled').style.display = "none";
                nbContainer.querySelector('.news-button.nb-02.nb-disabled').style.display = "block";
            } else {
                nbContainer.querySelector('.news-button.nb-02.nb-enabled').style.display = "block";
                nbContainer.querySelector('.news-button.nb-02.nb-disabled').style.display = "none";
            }
        }
    }

	document.querySelectorAll('.news-button-container').forEach(function(divNewsButtonContainer) {

		const postId = divNewsButtonContainer.getAttribute('news-post-id');

        divNewsButtonContainer.querySelectorAll('.news-button.nb-01').forEach(function(button) {
            button.addEventListener('click', function() {
                changeNewsText('decrease', postId);
            });
        });

        divNewsButtonContainer.querySelectorAll('.news-button.nb-02').forEach(function(button) {
            button.addEventListener('click', function() {
                changeNewsText('increase', postId);
            });
        });
    });

});
