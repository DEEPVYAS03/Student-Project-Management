import { useNavigation } from "@react-navigation/native";
import React, {useState, useRef} from "react";
import { Text ,View,SafeAreaView, Button, TextInput, Dimensions, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal} from "react-native";
const { width } = Dimensions.get('window');
import moment from 'moment';
import Swiper from 'react-native-swiper';

const Schedule = () => {
      const navigation = useNavigation();
      const [name,setName] = useState('')
  return (
    <View>
        <TextInput placeholder="Enter your name" 
        value={name} 
        onChangeText={(text)=>setName(text)}
        style={{color:'black'}}/>
        <Button title="join call" onPress={()=>{
            navigation.navigate('Call_view',{data:name})
        }}/>
       
    </View>
  )
}

  export const MeetingScreen=()=> {
  const swiper = useRef();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');

  const weeks = React.useMemo(() => {
    const start = moment(selectedDate).startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [selectedDate]);

  const scheduleMeeting = () => {
    setShowModal(true);
  };

  const confirmMeeting = () => {
    const newMeeting = {
      title: meetingTitle || "New Meeting",
      time: meetingTime,
    };

    setMeetings([...meetings, newMeeting]);
    setMeetingTitle('');
    setMeetingTime('');
    setShowModal(false);
  };

  return (
    <View style={{ flex:1}}>
      <Schedule/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Schedule</Text>
        </View>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                setSelectedDate(moment(selectedDate).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    selectedDate.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setSelectedDate(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>{selectedDate.toDateString()}</Text>
          <View style={styles.placeholder}>
            {meetings.map((meeting, index) => (
              <View key={index} style={styles.meeting}>
                <Text style={styles.meetingText}>{meeting.title}</Text>
                <Text style={styles.meetingText}>{meeting.time}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={scheduleMeeting}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Schedule</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Schedule Meeting</Text>
              <TextInput
                style={styles.input}
                placeholder="Meeting Title"
                value={meetingTitle}
                onChangeText={text => setMeetingTitle(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Meeting Time"
                value={meetingTime}
                onChangeText={text => setMeetingTime(text)}
              />
              <Button title="Confirm" onPress={confirmMeeting} />
              <Button title="Cancel" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  meeting: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  meetingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000', // Input text color
    placeholderTextColor: 'black', // Placeholder text color
  },
});


export default MeetingScreen


