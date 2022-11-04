import React, { useState } from 'react';
import { v4 } from 'uuid';

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  )
};

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  )
};

function Article(props) {
  return (
    <div className="item item-article">
      <h3><a href="#">{props.title}</a></h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  )
};

function Video(props) {
  return (
    <div className="item item-video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" title='video' allowFullScreen></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  )
};

function ContentItem(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.views = props.views;
    }

    render() {
      if (this.views >= 1000) {
        return (
          <Popular>
            <Component {...this.props}/>
          </Popular>
        )
      }

      if (this.views < 100) {
        return (
          <New>
            <Component {...this.props} />
          </New>
        )
      }
    }
  }
}

function List(props) {
  return props.list.map(item => {
    switch (item.type) {
      case 'video':

        const VideoWithHighlight = ContentItem(Video);

        return (
          <VideoWithHighlight {...item} key={ v4() } />
        );

      case 'article':

        const ArticleWithHighlight = ContentItem(Article);

        return (
          <ArticleWithHighlight {...item} key={ v4() } />
        );

      default: 
        throw new Error('Unexpected type');
    }
  });
};

export default function App() {
  const [list] = useState([
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]);

  return (
    <List list={list} />
  );
}