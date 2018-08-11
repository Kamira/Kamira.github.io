var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var urlRegexp = new RegExp(urlExpression);

class Block {
    constructor(title, summary, picture, video, demo, source, code, api) {
            this._title = String(title);
            this._summary = String(summary);
            this._code = code;
            this._api = api;
            this._picture = String(picture).match(urlRegexp) ? String(picture) : "img/nopicture.png";
            this._video = String(video).match(urlRegexp) ? String(video) : "Null";
            this._demo = String(demo).match(urlRegexp) ? String(demo) : "Null";
            this._source = String(source).match(urlRegexp) ? String(source) : "Null";
        }
        // Setter

    // Getter

    // Render
    renderById(id) {
        let dom = document.getElementById(id);
        let newHTML = "";
        newHTML += "<div class='work-block'>"
        if (this._picture != "Null") {
            newHTML += "<div class='video' style='background-image:url(" + this._picture + ");'>"
        } else {
            newHTML += "<div class='video' style='background-image: url()'>"
        }
        if (this._video != "Null") {
            newHTML += "    <video class='thevideo' loop preload='none'>"
            newHTML += "        <source src='" + this._video + "' type='video/webm'>"
            newHTML += "    </video>"
        }
        newHTML += "    </div>"
        newHTML += "    <h3>" + this._title + "</h3>"
        if (this._demo != "Null") newHTML += "<a href='" + this._demo + "'>Demo / Download</a>"
            //if ((this._demo != "Null") & (this._source != "Null")) newHTML += " | "
        if (this._source != "Null") newHTML += "<a href='" + this._source + "'>Source Code</a>"
        newHTML += "    <p>　　" + this._summary + "</p>"
        for (let i of this._code)
            newHTML += "<span class='code'>" + i + "</span>"
        for (let i of this._api)
            newHTML += "<span class='api'>" + i + "</span>"
        newHTML += "</div>"
        dom.innerHTML += newHTML;
    }
}