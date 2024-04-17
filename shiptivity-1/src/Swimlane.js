import React from 'react';
import './Swimlane.css';
import Dragula from 'react-dragula';

export default class Swimlane extends React.Component {
  componentDidMount() {
    this.dragulaDecorator = Dragula([this.dragColumn], {
      moves: function (el, container, handle) {
        return handle.classList.contains('Card');
      }
    }).on('drop', (el, target, source, sibling) => {
      const cardId = el.getAttribute('id');
      const currentStatus = source.getAttribute('data-status');
      const newStatus = target.getAttribute('data-status');
      if (currentStatus !== newStatus) {
        this.props.onCardMove(cardId, newStatus);
      }
    });
  }

  componentWillUnmount() {
    this.dragulaDecorator.destroy();
  }

  render() {
    const cards = this.props.clients.map(client => {
      let cardColor = '';
      switch (client.status) {
        case 'backlog':
          cardColor = 'grey';
          break;
        case 'in-progress':
          cardColor = 'blue';
          break;
        case 'complete':
          cardColor = 'green';
          break;
        default:
          cardColor = 'grey';
      }
      const cardStyle = {
        backgroundColor: cardColor,
      };

      return (
        <div
          key={client.id}
          id={client.id}
          className="Card"
          style={cardStyle}
          draggable={true}
        >
          <div className="Card-name">{client.name}</div>
          <div className="Card-description">{client.description}</div>
        </div>
      );
    })
    let swimlaneClass = "Swimlane-column";
    if (this.props.status === "backlog") {
      swimlaneClass += " backlog";
    } else if (this.props.status === "in-progress") {
      swimlaneClass += " in-progress";
    } else if (this.props.status === "complete") {
      swimlaneClass += " complete";
    }

    return (
      <div className={swimlaneClass}>
        <div className="Swimlane-title">{this.props.name}</div>
        <div className="Swimlane-dragColumn" ref={el => this.dragColumn = el} data-status={this.props.status}>
          {cards}
        </div>
      </div>
    );
  }
}
