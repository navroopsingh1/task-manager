import React,  { Component } from 'react';
import Nav from './Nav';

import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";

import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {events: [], courses: [], courseTemp:'', eventNameTemp: '', courseSelectionTemp:'', eventDescriptionTemp:'', eventWeightTemp:'', startDate: new Date(), sort:'' };

    this.onChangecourseTemp = this.onChangecourseTemp.bind(this);
    this.AddCourseTemp = this.AddCourseTemp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeeventNameTemp = this.onChangeeventNameTemp.bind(this);
    this.onChangecourseSelectionTemp = this.onChangecourseSelectionTemp.bind(this);
    this.onChangeeventWeightTemp = this.onChangeeventWeightTemp.bind(this);
    this.onChangeeventDescriptionTemp = this.onChangeeventDescriptionTemp.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);

    this.AddEventTemp = this.AddEventTemp.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  onChangecourseSelectionTemp(event) {
    this.setState({ courseSelectionTemp: event.target.value});

  };

  onChangeeventDescriptionTemp(event) {
    this.setState({ eventDescriptionTemp: event.target.value});
  };

  onChangeeventWeightTemp(event) {
    this.setState({eventWeightTemp: event.target.value});
  };

  onChangecourseTemp(event) {
    this.setState({ courseTemp: event.target.value });
  };

  onChangeeventNameTemp(event) {
    this.setState({ eventNameTemp: event.target.value });
  };

  onChangeSort(event) {
    this.setState({ sort: event.target.value });
  };



  AddCourseTemp() {
    this.setState(state=> {
      const courses = [...state.courses, state.courseTemp];

      return {
        courses,
        courseTemp: '',
      };
    });

  };
  

  AddEventTemp() {
    this.setState(state=> {
      const events = [...state.events, {course: state.courseSelectionTemp, description: state.eventDescriptionTemp, eventName: state.eventNameTemp, weight: state.eventWeightTemp, id:this.state.events.length, endTime: state.startDate}];
    
      return {
        events,
        courseSelectionTemp:'',
        eventDescriptionTemp:'',
        eventNameTemp:'',
        eventWeightTemp:''
      };
    });
  };

  onRemoveCourse = i => {
    this.setState(state => {
      const courses = state.courses.filter((item, j) => i !== j);
 
      return {
        courses,
      };
    });
  };

  onRemoveEvent = i => {
    this.setState(state => {
      const events = state.events.filter((item, j) => i !== j);
 
      return {
        events,
      };
    });
  };



  onUpdateEvent = i => {
    this.setState(state => {
      const events = state.events.map((item, j) => {
        if (j === i) {
          item.course = this.state.courseSelectionTemp;
          item.description = this.state.eventDescriptionTemp;
          item.endTime = this.state.startDate;
          item.eventName = this.state.eventNameTemp;
          item.weight = this.state.eventWeightTemp;

          return item;
        } else {
          return item;
        }
      });
 
      return {
        events,
      };
    });
  };

  onSelectEvent = i => {
    this.setState(state => {
      const events = state.events.map((item, j) => {
        if (j === i) {
          this.state.courseSelectionTemp = item.course;
          this.state.eventDescriptionTemp = item.description;
          this.state.startDate = item.endTime;
          this.state.eventNameTemp = item.eventName;
          this.state.eventWeightTemp = item.weight;

          return item;
        } else {
          return item;
        }
      });
 
      return {
        events,
      };
    });
  };
  

  render() {
    var toShow = this.state.events;
    const {courses} = this.state;
    let courseList = courses.length > 0
      && courses.map((item, i) => {
      return (
        <option key={i} value={item}>{item}</option>
      )
    }, this);

    if (this.state.sort == "By Date Added (New to Old)") {
      toShow = this.state.events.reverse();
    }
    if (this.state.sort == "By Date Added (Old to New)") {
      toShow = this.state.events;
    }

    if (this.state.sort == "By Event Weight (High to Low)") {
      toShow = this.state.events.sort((a, b) => (b.weight) - (a.weight));
    }

    if (this.state.sort == "By Event Weight (Low to High)") {
      toShow = this.state.events.sort((a, b) => (a.weight) - (b.weight));
    }
    if (this.state.sort == "By Event Date (After to Before)") {
      toShow = this.state.events.sort(function(a,b){
        return new Date(b.endTime) - new Date(a.endTime);
      });
    }
    if (this.state.sort == "By Event Date (Before to After)") {
      toShow = this.state.events.sort(function(a,b){
        return new Date(a.endTime) - new Date(b.endTime);
      });
    }
  
  
  

    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route path="/" exact>
                      <div>
                        <br></br>
                        <h3> McMaster Task Manager </h3>
                        <div className='welcome'> 
                          <p> Add and remove courses under the manage courses tab. With these courses, you can go to the manage events tab and create, remove, or edit an event. After creating an event, you can view all of your events under the view events tab.</p>
                        </div >


                        <label for="sorting"> <b><p>Sort</p></b> </label>
                        <select id="sorting" value={this.state.sort} onChange= {this.onChangeSort}>
                          <option default> By Date Added (Old to New) </option>
                          <option> By Date Added (New to Old) </option>
                          <option> By Event Weight (High to Low) </option>
                          <option> By Event Weight (Low to High) </option>
                          <option> By Event Date (Before to After) </option>
                          <option> By Event Date (After to Before) </option>
                        </select>

                        {toShow.map( 
                            ({course, description, eventName, weight, endTime}) => 
                                <div className="myEvents" key={this.state.events.length}> 
                
                                    {course||"No Course Entered"} <br />         
                                    {eventName || "No Event Name Entered"} <br />
                                    {weight || "0"}% <br />
                                    {description||"No Description Entered"} <br />
                                    <DatePicker
                                      selected={ endTime }
                                      disabled={true}
                                      dateFormat="MMMM d, yyyy"
                                  
                                    />
                                     <br /> <br />
                                </div>
                            )}

                      </div>
                    </Route>
                    <Route path="/manage-courses">
                      <div>
                        <br></br>
                        <h3> Manage Courses</h3>
                        <br></br>
                        <h5> Add Course </h5>
                             
                        <input type="text" className="form-control" value={this.state.courseTemp } placeholder="Enter the name of your course" onChange={this.onChangecourseTemp}></input>
                        <br></br>
                        <button type="button"  className="btn btn-success" onClick={this.AddCourseTemp} > Add </button>

                        <br></br>
                        <br></br>

                        <h5> View Courses</h5>

                        <ul>
                          {this.state.courses.map((item, index) => (
                            <li key={item}>
                              {item || "No Course Name Entered"}
                              <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.onRemoveCourse(index)}
                              >
                                Remove
                              </button>
                              <br></br>
                              <br></br>
                            </li>
                          ))}
                        </ul>
                          
                      </div>
                    </Route>
                    <Route path="/manage-event">
                      <div>
                        <br></br>
                        <h3> Manage Events</h3>
                        <br></br>
                        <h5> Add Event </h5>
                        <input type="text" className="form-control" value={this.state.eventNameTemp} onChange={this.onChangeeventNameTemp}  placeholder="Enter an Event name"></input>
                        <br></br>
                        <select value={this.state.courseSelectionTemp} onChange= {this.onChangecourseSelectionTemp}>
                          <option default> Select a Course</option>
                          {courseList} 
                        </select>
                        <br></br>
                        <br></br>
                        <input type="number" value={this.state.eventWeightTemp} onChange={this.onChangeeventWeightTemp} className="form-control" placeholder="Enter the Event Grade Weight"></input>
                        <br></br>
                        <textarea name="paragraph_text" value={this.state.eventDescriptionTemp} onChange={this.onChangeeventDescriptionTemp} cols="50" rows="5" placeholder="Enter your Event Description Here"></textarea>
                        <br></br>
                        <br></br>

                        Select Event Date: <br></br>

                        <DatePicker
                            selected={ this.state.startDate }
                            onChange={ this.handleChange }
                            name="startDate"
                            dateFormat="MM/dd/yyyy"
                        />

                        <br></br>
                        <br></br>

                        <button type="button" className="btn btn-success" onClick={this.AddEventTemp} > Add </button>
                        <br></br>
                        <br></br>
                        <h5> Edit and Remove Events</h5>
                        <p> Click the select button to fill the form with the details of the event. Click the edit button to swap the event details with the event details currently in the form. </p>
                        <ul>
                          {this.state.events.map((item,index) => (
                            <li >{item.course || "No Course Selected"} - {item.eventName || "No Event Name Entered"} - {item.weight || "No Weight Entered"}%
                              <button 
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.onSelectEvent(index)}
                              >
                                Select
                              </button>

                              <button 
                                type="button"
                                className="btn btn-warning"
                                onClick={() => this.onUpdateEvent(index)}
                              >
                                Edit
                              </button>

                              <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.onRemoveEvent(index)}
                              >
                                Remove
                              </button>
                              <br></br>
                              <br></br>
                            
                            </li>
                          ))}
                        </ul>


                      </div>
                    
                    
                    </Route>
                </Switch>
            </div>
        </Router>

    );
  }
}

export default App;
