/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */


document.addEventListener('DOMContentLoaded', function() {

    let newsIdxDict = {};

    function changeNewsText(action, postId) {

        // get divNewsTextArray
        const divNewsTextArray = document
            .querySelector(`.news-text-container[news-post-id="${postId}"]`)
            .querySelectorAll('.news-text');

        // update newsIdxDict 
        newsIdxDict[postId] ||= 0  // if postId not in newsIdxDict, create it with value 0
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
            if (newsIdxDict[postId] == 0) {
                nbContainer.querySelector('.news-button.nb-decrease.nb-enabled').style.display = "none";
                nbContainer.querySelector('.news-button.nb-decrease.nb-disabled').style.display = "block";
            } else if (newsIdxDict[postId] == divNewsTextArray.length - 1) {
                nbContainer.querySelector('.news-button.nb-increase.nb-enabled').style.display = "none";
                nbContainer.querySelector('.news-button.nb-increase.nb-disabled').style.display = "block";
            } else {
                nbContainer.querySelector('.news-button.nb-decrease.nb-enabled').style.display = "block";
                nbContainer.querySelector('.news-button.nb-decrease.nb-disabled').style.display = "none";
                nbContainer.querySelector('.news-button.nb-increase.nb-enabled').style.display = "block";
                nbContainer.querySelector('.news-button.nb-increase.nb-disabled').style.display = "none";
            }
        }
    }

	document.querySelectorAll('.news-button-container').forEach(function(divNewsButtonContainer) {

		const postId = divNewsButtonContainer.getAttribute('news-post-id');

        divNewsButtonContainer.querySelectorAll('.news-button.nb-decrease').forEach(function(button) {
            button.addEventListener('click', function() {
                changeNewsText('decrease', postId);
            });
        });

        divNewsButtonContainer.querySelectorAll('.news-button.nb-increase').forEach(function(button) {
            button.addEventListener('click', function() {
                changeNewsText('increase', postId);
            });
        });
    });

});
