import * as React from 'react';
import styles from './InstagramPosts.module.scss';
import { IInstagramPostsProps } from './IInstagramPostsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class InstagramPosts extends React.Component<IInstagramPostsProps, {}> {
  public render(): React.ReactElement<IInstagramPostsProps> {
    return (
      <div className={ styles.instagramPosts }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.username)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
