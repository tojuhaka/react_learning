import React, { Component } from 'react';
import './App.css';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, ModalHeader, ModalBody, ModalFooter, Button, Modal,
  Progress
} from 'reactstrap';
import classnames from 'classnames';
import myData from './data.json';
import fourpane from './fourpane.json';
import { CSSTransitionGroup } from 'react-transition-group'

class EditPane extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let closeEdit = this.props.closeEdit;
    let value = this.props.value.toString();
    return (
      <div className="editPaneContent">
        <Button color="danger" onClick={() => closeEdit()}>Sulje</Button>
        <div>{value}</div>
      </div>
    );
  }
}

class EditAction extends Component {
  constructor(props) {
    super(props);
  }

  renderEditPane(closeEdit, value) {
    return <EditPane closeEdit={closeEdit} value={value}/>
  }

  render() {
    let renderEdit = this.props.renderEdit;
    let closeEdit = this.props.closeEdit;
    let value = this.props.value;
    let color = this.props.buttonData.color;
    let label = this.props.buttonData.label;
    return (
      <div>
        <Button color={color} onClick={() => renderEdit(this.renderEditPane(closeEdit, value))}>{label}</Button>
      </div>
    );
  }
}


class FTabLabel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavItem>
      <NavLink
      className={classnames({ active: this.props.activeTab === this.props.value.toString() })}
      onClick={() => { this.props.toggleFunc(this.props.value.toString()); }}
    >
        {this.props.label.label.toString()}
    </NavLink>
      </NavItem>)
  }
}

class FTabContent extends Component {
  constructor(props) {
    super(props);

    this.renderEdit = this.renderEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);

    this.buttonDataDanger = {
      label: 'Irtisano',
      color: 'danger'
    };

    this.buttonDataEdit = {
      label: 'Muokkaa',
      color: 'primary'
    };

    this.buttonDataEditOngoing = {
      label: 'Muutos käynnissä',
      color: 'warning'
    };

    this.state = {
      editComponent: null,
    };
  }

  renderEdit(component) {
    this.setState({
      editComponent: component
    })
  }

  closeEdit() {
    this.setState({
      editComponent: null
    })
  }


  render() {
    if (this.state.editComponent === null) {
      return (<TabPane tabId={this.props.value.toString()}>
        <Table className="paneContent">
          <tbody>
          <tr>
            <th scope="row">Sopimusnumero</th>
            <td>147689</td>
            <td><EditAction renderEdit={this.renderEdit} closeEdit={this.closeEdit}
                            value={this.props.value} buttonData={this.buttonDataDanger}/></td>
          </tr>
          <tr>
            <th scope="row">Sopimustyyppi</th>
            <td>Liittymän määräaikainen sopimus 12kk</td>
            <td><EditAction renderEdit={this.renderEdit} closeEdit={this.closeEdit}
                            value={this.props.value} buttonData={this.buttonDataEdit}/></td>
          </tr>
          <tr>
            <th scope="row">Numero</th>
            <td>045123123</td>
            <td><EditAction renderEdit={this.renderEdit} closeEdit={this.closeEdit}
                            value={this.props.value} buttonData={this.buttonDataEditOngoing}/>
            </td>
          </tr>
          </tbody>
        </Table>
      </TabPane>);

    }
    else {
      return (<TabPane tabId={this.props.value.toString()}>
        {this.state.editComponent}
      </TabPane>);
    }
  }
}

class Pane extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.paneData;

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '0',
      paneId: this.data.id,
    };
  }

  renderTabLabel(value, activeTab, label, toggleFunc) {
    return <FTabLabel value={value} activeTab={activeTab} label={label} toggleFunc={toggleFunc}/>
  }

  renderTabContent(value, activeTab) {
    return <FTabContent value={value} activeTab={activeTab} />
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {

    let labels = [];
    let contents = [];

    for (let i=0; i < this.data.tabs.length; i++) {
      labels.push(this.renderTabLabel(i, this.state.activeTab, this.data.tabs[i], this.toggle))
      contents.push(this.renderTabContent(i, this.state.activeTab))
    }
    return (
      <div>
        <Nav tabs>
          {labels}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {contents}
        </TabContent>
      </div>
    );
  }
}


class FourPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bLeft: this.props.data['bottom-left'],
      bRight: this.props.data['bottom-right'],
      tLeft: this.props.data['top-left'],
      tRight: this.props.data['top-right']
    };
  }

  renderPane(paneData) {
    return (<Pane paneData={paneData}/>);
  };

  render() {

    return (
        <div className="pane">
          <Row>
            <Col xs="6" sm="6">{this.renderPane(this.state.tLeft)}</Col>
            <Col xs="6" sm="6">{this.renderPane(this.state.tRight)}</Col>
          </Row>
          <Row>
            <Col xs="6" sm="6">{this.renderPane(this.state.bLeft)}</Col>
            <Col xs="6" sm="6">{this.renderPane(this.state.bRight)}</Col>
          </Row>
        </div>
    );
  }
}

class App extends Component {
  renderFourPane(data) {
    return (<FourPane data={data}/>);
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <Nav tabs className="main-nav">
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Orders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Contracts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                Customers
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {this.renderFourPane(fourpane['contract'])}
          </TabPane>
            <TabPane tabId="2">
              {this.renderFourPane(fourpane['contract'])}
            </TabPane>
            <TabPane tabId="3">
              {this.renderFourPane(fourpane['customer'])}
            </TabPane>
          </TabContent>
        </div>

        </div>
    );
  }
}

export default App;
