import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import * as strings from 'InstagramFeedWebPartStrings';
import InstagramFeed from './components/InstagramFeed';
import { IInstagramFeedProps } from './components/IInstagramFeedProps';

export interface IInstagramFeedWebPartProps {
  username: string;
  showAlias: Boolean;
}

export default class InstagramFeedWebPart extends BaseClientSideWebPart<IInstagramFeedWebPartProps> {

  public render(): void {
    // tslint:disable-next-line: no-shadowed-variable
    const element: React.ReactElement<IInstagramFeedProps> = React.createElement(
      InstagramFeed,
      {
        username: this.properties.username,
        showAlias: this.properties.showAlias
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

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('username', {
                  label: strings.UsernameFieldLabel ? strings.UsernameFieldLabel : strings.DefaultUsername
                }),
                PropertyPaneToggle('showAlias', {
                  label: strings.ShowAliasToggleLabel,
                  onText: strings.ShowAliasToggleTrueLabel,
                  offText: strings.ShowAliasToggleFalseLabel
                })
              ]
            }
          ],

        }
      ]
    };
  }
}
