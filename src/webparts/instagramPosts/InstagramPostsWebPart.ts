import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'InstagramPostsWebPartStrings';
import InstagramPosts from './components/InstagramPosts';
import { IInstagramPostsProps } from './components/IInstagramPostsProps';

export interface IInstagramPostsWebPartProps {
  username: string;
}

export default class InstagramPostsWebPart extends BaseClientSideWebPart<IInstagramPostsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IInstagramPostsProps > = React.createElement(
      InstagramPosts,
      {
        username: this.properties.username
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneTextField('username', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
