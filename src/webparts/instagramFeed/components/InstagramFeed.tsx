import * as React from 'react';
import styles from './InstagramFeed.module.scss';
import { IInstagramFeedProps } from './IInstagramFeedProps';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { IPersonaSharedProps, Persona } from 'office-ui-fabric-react/lib/Persona';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { ITheme, getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import * as strings from 'InstagramFeedWebPartStrings';
import { IInstagramFeed, Edge } from '../../../models/IInstagramFeed';
import { IError } from '../../../models/IError';
import * as $ from "jquery";

const shimmerWrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > .ms-Shimmer-container': {
      margin: '10px 0'
    }
  }
});

const theme: ITheme = getTheme();
const { palette, fonts } = theme;
const classNames = mergeStyleSets({
  postsGrid: {
    overflow: 'hidden',
    fontSize: 0,
    position: 'relative'
  },
  postsGridContainer: {
    margin: '10px 2px',
  },
  postsGridTile: {
    textAlign: 'center',
    outline: 'none',
    position: 'relative',
    float: 'left',
    background: palette.neutralLighter,
    selectors: {
      'focus:after': {
        content: '',
        position: 'absolute',
        left: 2,
        right: 2,
        top: 2,
        bottom: 2,
        boxSizing: 'border-box',
        border: `1px solid ${palette.white}`
      }
    }
  },
  postsGridSizer: {
    paddingBottom: '100%'
  },
  postsGridPadder: {
    position: 'absolute',
    left: 2,
    top: 2,
    right: 2,
    bottom: 2
  },
  postsGridImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  postsGridLink: {
    textDecoration: 'none',
    cursor: 'pointer'
  }
});

export default class InstagramFeed extends React.Component<IInstagramFeedProps, { error: IError, isLoaded: Boolean, items: IInstagramFeed }> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null
    };
  }

  private handleSuccess(success) {
    let regex = /_sharedData = ({.*);<\/script>/m;
    // let json = JSON.parse(regex.exec(success)[1]);
    let json = JSON.parse(success);
    if (json && json.graphql && json.graphql.user) {
      let data = json;
      this.setState({
        isLoaded: true,
        items: data,
        error: null
      });
      this.render();
    }
  }

  private handleFailure(error) {
    let failure: IError = {
      heading: strings.ErrorHeading,
      message: strings.ErrorMessage,
      status: error
    };
    // show error
    this.setState({
      items: null,
      isLoaded: true,
      error: failure
    });
  }

  private getData(count) {
    var params = {
      url: `https://www.instagram.com/${this.props.username ? this.props.username.trim() : strings.DefaultUsername}/?__a=1`,
      container: 'none'
    };

    var esc = encodeURIComponent;
    var query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');

    let dataURL: string = `https://images${~~(Math.random() * 33)}-focus-opensocial.googleusercontent.com/gadgets/proxy?${query}`;
    // let dataURL: string = `https://images${~~(Math.random() * 33)}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/${this.props.username ? this.props.username.trim() : strings.DefaultUsername}/?__a=1`;
    try {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', dataURL);
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.handleSuccess(xhr.responseText);
        } else if (xhr.status === 404) {
          this.handleFailure(xhr.status);
        } else {
          this.getData(1);
        }
      };
      xhr.send();
    } catch (exception) {
      if (0 === count) {
        this.getData(1);
      } else {
        throw exception;
      }
    }
  }

  private async _loadData() {
    try {
      this.getData(0);
    } catch (exception) {
      console.warn(`${exception.code}-${exception.name}: ${exception.message}`);
      let failure: IError = {
        heading: strings.ExceptionHeading,
        message: strings.ExceptionMessage,
        status: 500
      };
      // show exception
      this.setState({
        items: null,
        isLoaded: true,
        error: failure
      });
    }
  }

  public componentDidMount() {
    this._loadData();
  }

  private _loadingShimmer = (): JSX.Element => {
    return (
      <div
        style={{ display: 'flex' }}>
        <ShimmerElementsGroup
          shimmerElements={[
            { type: ShimmerElementType.line, width: 100, height: 100 },
            { type: ShimmerElementType.gap, width: 10, height: 100 },
            { type: ShimmerElementType.line, width: 100, height: 100 },
            { type: ShimmerElementType.gap, width: 10, height: 100 }
          ]}
        />
      </div>
    );
  }

  private _errorNotification = (): JSX.Element => {
    console.error(`${this.state.error.status}: ${this.state.error.message}`);
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        dismissButtonAriaLabel={strings.ToggleCollapseText}
        truncated={true}
        overflowButtonAriaLabel={strings.ToggleExpandText}
      >
        <strong>{this.state.error.heading}</strong>{this.state.error.message ? ' - ' + this.state.error.message : ''}
      </MessageBar>
    );
  }

  private _profilePersona = (): JSX.Element => {
    const examplePersona: IPersonaSharedProps = {
      imageUrl: this.state.items.graphql.user.profile_pic_url,
      imageInitials: 'IG',
      text: this.state.items.graphql.user.full_name,
      secondaryText: this.state.items.graphql.user.username,
      tertiaryText: this.state.items.graphql.user.biography
    };

    return (
      <Persona {...examplePersona} />
    );
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    let edge = item as Edge;
    let post = edge.node;

    return (
      <div
        className={classNames.postsGridTile}
        data-is-focusable={true}
        style={{
          width: 100 / 5 + '%'
        }}
        role='img'
        aria-label={post.accessibility_caption}
      >
        <div className={classNames.postsGridSizer}>
          <div className={classNames.postsGridPadder}>
            <a target='_blank' href={'https://www.instagram.com/p/' + post.shortcode} className={classNames.postsGridLink}>
              <img src={post.thumbnail_src} className={classNames.postsGridImage} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  public render(): JSX.Element {
    if (this.state.error) {
      return this._errorNotification();
    } else if (!this.state.isLoaded) {
      return (
        <Fabric className={shimmerWrapperClass}>
          <Shimmer customElementsGroup={this._loadingShimmer()} width={'45%'} />
        </Fabric>
      );
    } else {
      return (
        <div className={classNames.postsGridContainer}>
          {this.props.showAlias ? this._profilePersona() : ''}
          <FocusZone>
            <List
              items={this.state.items.graphql.user.edge_owner_to_timeline_media.edges}
              onRenderCell={this._onRenderCell}
            />
          </FocusZone>
        </div>
      );
    }
  }
}
