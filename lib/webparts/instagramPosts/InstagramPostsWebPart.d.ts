import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IInstagramPostsWebPartProps {
    description: string;
}
export default class InstagramPostsWebPart extends BaseClientSideWebPart<IInstagramPostsWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=InstagramPostsWebPart.d.ts.map