// ==UserScript==
// @name         streamkeys twitch redesign workaround
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  workaround for streamkeys not working with new design
// @author       hlk
// @include      https://www.twitch.tv/*
// @include      https://twitch.tv/*
// @exclude      https://www.twitch.tv/*/*
// @exclude      https://twitch.tv/*/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    //add old class to playpause Button
    var playpauseE = document.querySelectorAll('[data-a-target="player-play-pause-button"]')[0]
    playpauseE.classList.add("qa-pause-play-button")

    //add old classes to title and parent element
    var titleE = document.querySelectorAll('[data-a-target="stream-title"]')[0]
    titleE.parentElement.classList.add("title")
    titleE.classList.add("real")


    //Create old span Element to query play pause status and change it according to new element
    //document.querySelectorAll('[data-a-target="player-play-pause-button"]')[0].getAttribute("data-a-player-state") === "playing"
    var span = document.createElement("span")
    span.setAttribute("id", "playPauseStatusDummy")
    updateStatusDummy(span)
    playpauseE.appendChild(span)

    var mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation);
            updateStatusDummy(span)
        });
    });

    mutationObserver.observe(document.querySelectorAll('[data-a-target="player-play-pause-button"]')[0], {
        attributes: true,
        characterData: false,
        childList: false,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false
    });


}, false);

function updateStatusDummy(element) {
    if (document.querySelectorAll('[data-a-target="player-play-pause-button"]')[0].getAttribute("data-a-player-state") === "playing") {
        element.setAttribute("data-tip", "Pause")
    } else {
        element.setAttribute("data-tip", "Play")
    }
}
