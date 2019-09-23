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
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import * as strings from 'InstagramPostsWebPartStrings';
import InstagramPosts from './components/InstagramPosts';
var InstagramPostsWebPart = /** @class */ (function (_super) {
    __extends(InstagramPostsWebPart, _super);
    function InstagramPostsWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstagramPostsWebPart.prototype.render = function () {
        var element = React.createElement(InstagramPosts, {
            description: this.properties.description
        });
        ReactDom.render(element, this.domElement);
    };
    InstagramPostsWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(InstagramPostsWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    InstagramPostsWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return InstagramPostsWebPart;
}(BaseClientSideWebPart));
export default InstagramPostsWebPart;
//# sourceMappingURL=InstagramPostsWebPart.js.map