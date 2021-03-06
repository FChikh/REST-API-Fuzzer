"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function link(link, caption) {
    var str = '[[' + link;
    if (caption) {
        str += '|' + caption;
    }
    str += ']]';
    return str;
}
exports.link = link;
var LinkProcessor = /** @class */ (function () {
    function LinkProcessor() {
        this.occuredLinks = {};
        this.resolvedLinks = {};
        this.unresolvedLinks = [];
    }
    //<a href="#my-section">example</a>
    //<a name="my-section"></a>
    LinkProcessor.prototype.processLinks = function (text) {
        var _this = this;
        var result = '';
        var prev = 0;
        for (var i = text.indexOf('[['); i >= 0 && i < text.length; i = text.indexOf('[[', prev)) {
            result += text.substring(prev, i);
            prev = text.indexOf(']]', i);
            if (prev < 0) {
                prev = i;
                break;
            }
            i += '[['.length;
            var linkContent = text.substring(i, prev);
            prev += ']]'.length;
            if (linkContent.charAt(0) == '^') {
                var linkName = linkContent.substring(1);
                result += "<a name=\"" + linkName + "\"></a>";
                this.resolvedLinks[linkName] = true;
            }
            else {
                var link;
                var caption;
                var ind = linkContent.indexOf('|');
                if (ind >= 0) {
                    link = linkContent.substring(0, ind);
                    caption = linkContent.substring(ind + 1);
                }
                else {
                    link = linkContent;
                    caption = linkContent;
                }
                this.occuredLinks[link] = true;
                result += "<a href=\"#" + link + "\">" + caption + "</a>";
            }
        }
        result += text.substring(prev);
        this.unresolvedLinks = Object.keys(this.occuredLinks).filter(function (x) { return !_this.resolvedLinks[x]; }).sort();
        return result;
    };
    return LinkProcessor;
}());
exports.LinkProcessor = LinkProcessor;
//# sourceMappingURL=specUtil.js.map