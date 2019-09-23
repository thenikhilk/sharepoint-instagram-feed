var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './InstagramPosts.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
var InstagramPosts = /** @class */ (function (_super) {
    __extends(InstagramPosts, _super);
    function InstagramPosts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstagramPosts.prototype.render = function () {
        return (React.createElement("div", { className: styles.instagramPosts },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement("span", { className: styles.title }, "Welcome to SharePoint!"),
                        React.createElement("p", { className: styles.subTitle }, "Customize SharePoint experiences using Web Parts."),
                        React.createElement("p", { className: styles.description }, escape(this.props.description)),
                        React.createElement("a", { href: "https://aka.ms/spfx", className: styles.button },
                            React.createElement("span", { className: styles.label }, "Learn more")))))));
    };
    return InstagramPosts;
}(React.Component));
export default InstagramPosts;
//# sourceMappingURL=InstagramPosts.js.map