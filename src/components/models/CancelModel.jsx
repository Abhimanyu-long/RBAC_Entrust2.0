import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Custom Toolbar Component
const CustomToolbar = (props) => {
  const goToBack = () => {
    const view = props.view;
    const date = props.date;
    const newDate =
      view === 'month'
        ? moment(date).subtract(1, 'month')
        : view === 'week'
        ? moment(date).subtract(1, 'week')
        : moment(date).subtract(1, 'day');
    props.onNavigate('PREV', newDate.toDate());
  };

  const goToNext = () => {
    const view = props.view;
    const date = props.date;
    const newDate =
      view === 'month'
        ? moment(date).add(1, 'month')
        : view === 'week'
        ? moment(date).add(1, 'week')
        : moment(date).add(1, 'day');
    props.onNavigate('NEXT', newDate.toDate());
  };

  const goToToday = () => {
    props.onNavigate('TODAY', new Date());
  };

  const changeView = (view) => {
    props.onView(view);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: '#4fc9da',
        color: '#fff',
        borderRadius: '8px',
      }}
    >
      <div>
        <button onClick={goToBack} style={buttonStyle}>
          &#8249;
        </button>
        <button onClick={goToToday} style={buttonStyle}>
          Today
        </button>
        <button onClick={goToNext} style={buttonStyle}>
          &#8250;
        </button>
      </div>
      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {moment(props.date).format('MMMM YYYY')}
      </span>
      <div>
        <button
          onClick={() => changeView('month')}
          style={viewButtonStyle(props.view === 'month')}
        >
          Month
        </button>
        <button
          onClick={() => changeView('week')}
          style={viewButtonStyle(props.view === 'week')}
        >
          Week
        </button>
        <button
          onClick={() => changeView('day')}
          style={viewButtonStyle(props.view === 'day')}
        >
          Day
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  background: 'none',
  border: '1px solid #fff',
  borderRadius: '4px',
  color: '#fff',
  padding: '5px 10px',
  cursor: 'pointer',
  margin: '0 5px',
  fontSize: '14px',
};

const viewButtonStyle = (isActive) => ({
  ...buttonStyle,
  backgroundColor: isActive ? '#00796b' : 'transparent',
});

// Main Component
const ErrorCard = () => {
  const localizer = momentLocalizer(moment);
  const events = [
    {
      id: 1,
      title: 'Task: Complete Report',
      start: new Date('2025-01-03T10:00:00'),
      end: new Date('2025-01-03T12:00:00'),
    },
    // Other events
  ];

  return (
    <Calendar
      localizer={localizer}
      events={events}
      defaultView="month"
      style={{ height: '600px', margin: '20px' }}
      components={{
        toolbar: CustomToolbar,
      }}
    />
  );
};

export default ErrorCard;
