import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ErrorCard = () => {
  const [timezone, setTimezone] = useState('UTC');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Task: Complete Report [001]',
      start: new Date('2024-12-30T10:00:00Z'),
      end: new Date('2024-12-30T11:00:00Z'),
      type: 'task',
      description: 'Prepare the financial report for Q4 and submit it to the manager.',
      file: 'report.pdf',
    },
    {
      id: 2,
      title: 'Event: Team Meeting [002]',
      start: new Date('2024-12-31T13:00:00Z'),
      end: new Date('2024-12-31T14:00:00Z'),
      type: 'event',
      description: 'Discuss project progress and assign new tasks.',
      file: null,
    },
    {
      id: 3,
      title: 'Follow-up: Client Call [003]',
      start: new Date('2024-12-31T15:00:00Z'),
      end: new Date('2024-12-31T15:30:00Z'),
      type: 'follow-up',
      description: 'Follow up with the client regarding the contract renewal.',
      file: null,
    },
    {
      id: 4,
      title: 'Call Recording: Discussion [004]',
      start: new Date('2024-12-30T16:00:00Z'),
      end: new Date('2024-12-30T16:30:00Z'),
      type: 'call',
      description: 'Recorded discussion about the upcoming merger.',
      file: 'discussion-recording.mp3',
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    type: 'task',
    description: '',
    file: null,
  });

  const eventStyleGetter = (event) => {
    let backgroundColor;
    switch (event.type) {
      case 'task':
        backgroundColor = 'blue';
        break;
      case 'event':
        backgroundColor = 'green';
        break;
      case 'follow-up':
        backgroundColor = 'orange';
        break;
      case 'call':
        backgroundColor = 'red';
        break;
      default:
        backgroundColor = 'gray';
    }
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
      },
    };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleDateClick = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setNewEvent({
      ...newEvent,
      start: moment(slotInfo.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(slotInfo.start).add(1, 'hour').format('YYYY-MM-DDTHH:mm'),
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert('Please fill out all required fields.');
      return;
    }

    const newEventData = {
      id: data.length + 1,
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      type: newEvent.type,
      description: newEvent.description,
      file: newEvent.file,
    };

    setData([...data, newEventData]);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      start: '',
      end: '',
      type: 'task',
      description: '',
      file: null,
    });
  };

  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const handleShowMore = (events) => {
    setSelectedDayEvents(events);
    setIsModalOpen(true);
  };
  return (
    <div>
   
      {/* Timezone Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label>Timezone: </label>
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="Europe/London">Europe/London</option>
        </select>
      </div>

      {/* Calendar Component */}
      <div style={{ height: '600px' }}>
        <Calendar
          localizer={localizer}
          events={data}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleDateClick}
          onSelectEvent={handleEventClick}
          onShowMore={(events) => handleShowMore(events)}
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
          defaultView="week"
        />
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%',
              textAlign: 'left',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2>Add New Event</h2>
            <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={handleInputChange}
                required
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
                required
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
                required
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <select
                name="type"
                value={newEvent.type}
                onChange={handleInputChange}
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="task">Task</option>
                <option value="event">Event</option>
                <option value="follow-up">Follow-Up</option>
                <option value="call">Call</option>
              </select>
              <textarea
                name="description"
                placeholder="Description (Optional)"
                value={newEvent.description}
                onChange={handleInputChange}
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#ccc',
                    color: '#000',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%',
              textAlign: 'left',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ marginTop: 0 }}>{selectedEvent.title}</h2>
            <p>
              <strong>Type:</strong> {selectedEvent.type}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <p>
              <strong>Start:</strong> {selectedEvent.start.toString()}
            </p>
            <p>
              <strong>End:</strong> {selectedEvent.end.toString()}
            </p>
            {selectedEvent.file && (
              <p>
                <strong>Attachment:</strong>{' '}
                <a href={selectedEvent.file} download>
                  {selectedEvent.file}
                </a>
              </p>
            )}
            <button
              onClick={handleCloseModal}
              style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorCard;
