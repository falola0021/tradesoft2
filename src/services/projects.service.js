import React, { useState } from 'react';
import http from './http_common';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Error from './err';

export default () => {
  const { error } = Error();
  const navigation = useNavigation();
  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [allLiveProjects, setAllLIveProjects] = React.useState(null);
  const [allProjects, setAllProjects] = React.useState(null);
  const [latestClockinsTime, setLatestClockinsTime] = React.useState(null);
  const [notificationCount, setNotificationCount] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [projectDetails, setProjectDetails] = React.useState(null);
  const [risk, setRisk] = React.useState(null);
  const [clockview, setClockview] = React.useState(null);
  const [allmessage, setAllmessage] = React.useState(null);
  const [messagedetails, setMessageDetails] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [allholidays, setAllholidays] = React.useState(null);
  const [alltask, setAlltask] = React.useState(null);


  




  const getAllLiveProjects = async (
    setModalVisible,
    setMessage,
    setLoading
  ) => {
    setLoading(true);
    http().then((axios) => {
      axios
        .post('/admin_dashboard')
        .then((response) => {
          setLoading(false);
          setAllLIveProjects(response.data.data.projects);
          setLatestClockinsTime(response.data.data.latest_clock_ins);
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getAllProjects = async (setModalVisible, setMessage, setLoading) => {
    setLoading(true);
    http().then((axios) => {
      axios
        .post('/get_projects')
        .then((response) => {
          setLoading(false);
          setAllProjects(response.data.data.projects);
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getProjectsDetails = async (
    setModalVisible,
    setMessage,
    setLoading,
    id
  ) => {
    setLoading(true);

    http().then((axios) => {
      axios
        .post('/get_project_detail', { id })
        .then((response) => {
          setLoading(false);
          setProjectDetails(response.data.data);
        })
        .catch((e) => {
          console.log(e.response, 'dddd');

          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };


  const getAllMessage = async (setModalVisible, setMessage, setLoading) => {
    setLoading(true);
    http().then((axios) => {
      axios
        .post('/message_get')
        .then((response) => {
          setLoading(false);
          setAllmessage(response.data.data.conversations);
         
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getMessageDetails = async (
    setModalVisible,
    setMessage,
    setLoading,
    message_id
  ) => {
    setLoading(true);

    http().then((axios) => {
      axios
        .post('/message_detail', { message_id })
        .then((response) => {
          setLoading(false);
          setMessageDetails(response?.data?.data?.conversation?.messages)
        })
        .catch((e) => {
          console.log(e.response, 'dddd');

          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const deleteMessage = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
    message_id,
    conversation_id
  ) => {
    http().then((axios) => {
      axios
        .post('/message_delete', {  message_id, conversation_id })
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
        
            getAllMessage(setModalVisible, setMessage, setLoading);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const replyMessage = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
  
 body
  ) => {

   
  

  
    http().then((axios) => {
      axios
        .post('/message_reply',body )
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
        
            getAllMessage(setModalVisible, setMessage, setLoading);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const addMessage = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
  
 body
  ) => {

   
  

  
    http().then((axios) => {
      axios
        .post('/message_add',body )
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
        
            getAllMessage(setModalVisible, setMessage, setLoading);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getUsers = async (setModalVisible, setMessage, setLoading) => {
    setLoading(true);
    http().then((axios) => {
      axios
        .post('/get_user')
        .then((response) => {
          setLoading(false);
          setUsers(response.data.data);
         
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };


  const addNote = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
    id,
    content,
    docname,
    docsize,
    docurl,
    doctype
  ) => {
    // this is not working just yet
    var attachment = {
      name: 'attachment',
      filename: docname,
      type: doctype,
      data: docurl,
    };

    http().then((axios) => {
      axios
        .post('/project_notes_add', { id, content })
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
            getProjectsDetails(setModalVisible, setMessage, setLoading, id);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const deleteNote = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
    projectId,
    id
  ) => {
    http().then((axios) => {
      axios
        .post('/project_notes_delete', { id })
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
            let id = projectId;
            getProjectsDetails(setModalVisible, setMessage, setLoading, id);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getRisk = async (
    setModalVisible,
    setMessage,
    setLoading,
    project_id
  ) => {
    setLoading(true);

    http().then((axios) => {
      axios
        .post('/get_risk', { project_id })
        .then((response) => {
          setLoading(false);
          setRisk(response.data.data);
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };
  const addAdditionalRisk = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
    projectId,
    riskDetails,
    setVal
  ) => {
    setLoading(true);
    let payload = {
      project_id: projectId,
      action: 'save-add-risks',
      details: riskDetails,
      risk_id: '',
    };
    setModalVisible(false);
    setVal(null);

    http().then((axios) => {
      axios
        .post('/project_risk_additional', payload)
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setLoading(false);
            setSuccess(true);
            setModalVisible(false);
            getRisk(setModalVisible, setMessage, setLoading, projectId);
            setMessage(response.data.message);
          } else {
            setErr(true);
            setLoading(false);
            setSuccess(false);
            setModalVisible(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getNotificatiobCount = async (
    setModalVisible,
    setMessage,
    setLoading
  ) => {
    http().then((axios) => {
      axios
        .post('/get_notification_count')
        .then((response) => {
          console.log(response.data, 'count');
          setNotificationCount(response.data.data.count);

          console.log(response.data.data.projects);
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getAllNotification = async (
    setModalVisible,
    setMessage,
    setLoading
  ) => {
    setLoading(true);
    http().then((axios) => {
      axios
        .post('/get_notifications')
        .then((response) => {
          setLoading(false);
          setNotification(response.data.data);
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const readNotification = async (
    setModalVisible,
    setMessage,
    setLoading,
    notificationId,
    setSuccess,
    setErr
  ) => {
    let id = notificationId;

    http().then((axios) => {
      axios
        .post('/read_notification', { id })
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
            getAllNotification(setModalVisible, setMessage, setLoading);
            getNotificatiobCount(setModalVisible, setMessage, setLoading);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }

          console.log(response.data);
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const readAllNotification = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr
  ) => {
    http().then((axios) => {
      axios
        .post('/readall_notification')
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
            getAllNotification(setModalVisible, setMessage, setLoading);
            getNotificatiobCount(setModalVisible, setMessage, setLoading);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }

          console.log(response.data);
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const clockInOut = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
    projectId,
    lat,
    lng
  ) => {
    setLoading(true);
    let payload = {
      project_id: projectId,
      lat: lat,
      lng: lng,
    };
    setModalVisible(false);


    http().then((axios) => {
      axios
        .post('/project_clock_toggle', payload)
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setLoading(false);
            setSuccess(true);
            setModalVisible(false);
           
             if(response.data.message=="Clocked in successfully"){
             
              AsyncStorage.setItem('clockinstatus',"clockin");

             }
             if(response.data.message=="Clocked out successfully"){
              AsyncStorage.setItem('clockinstatus',"clockout");
             }
          

            setMessage(response.data.message);
          } else {
            setErr(true);
            setLoading(false);
            setSuccess(false);
            setModalVisible(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getClock = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
    projectId,
    
  ) => {
    setLoading(true);
    let payload = {
      project_id: projectId,
    
    };
 
  

    http().then((axios) => {
      axios
        .post('/project_clock_view', payload)
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setLoading(false);
            setSuccess(true);
            setClockview(response.data.data)

          
          } else {
            setErr(true);
            setLoading(false);
            setSuccess(false);
            setModalVisible(false);
            setMessage(response.data.message);

          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };


  const getAllHolidays = async (setModalVisible, setMessage, setLoading) => {
    setLoading(true);
    http().then((axios) => {
      axios
        .post('/holiday/index')
        .then((response) => {
          setLoading(false);
          setAllholidays(response.data.data.holiday);
         
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const requestHoliday = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
  
 body
  ) => {


  
    http().then((axios) => {
      axios
        .post('/holiday/store',body )
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
        
            getAllHolidays(setModalVisible, setMessage, setLoading);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const updateHoliday = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
  
 body
  ) => {


  
    http().then((axios) => {
      axios
        .post('/holiday/update',body )
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
        
            getAllHolidays(setModalVisible, setMessage, setLoading);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const deleteHoliday = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
  id
  ) => {
    http().then((axios) => {
      axios
        .post('/holiday/destroy', { id })
        .then((response) => {
          if (response.data.status) {
            setErr(false);
            setSuccess(true);
            setMessage(response.data.message);
          
            getAllHolidays(setModalVisible, setMessage, setLoading);
          } else {
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const markAsRead = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
  id
  ) => {
    let project_id=id
    http().then((axios) => {
      axios
        .post('/project_finalize', { project_id })
        .then((response) => {
          if (response.data.status) {
           
            setErr(false);
            setSuccess(true);
            setMessage("This project is successfully completed");
           getAllLiveProjects (setModalVisible, setMessage, setLoading);
          } else {
         
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getAllRisk = async (
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
  id
  ) => {
    let project_id=id
    http().then((axios) => {
      axios
        .post('/get_risk', { project_id })
        .then((response) => {
          if (response.data.status) {
           
            setErr(false);
            setSuccess(true);
            setMessage("This project is successfully completed");
            getProjectsDetails  ( setModalVisible,
              setMessage,
              setLoading,
              id);
          } else {
         
            setErr(true);
            setSuccess(false);
            setMessage(response.data.message);
          }
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const getAllTask = async (setModalVisible, setMessage, setLoading) => {
    setLoading(true);
    http().then((axios) => {
      axios
        .post('/task_get')
        .then((response) => {
          setLoading(false);
          setAlltask(response.data.data);
         
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };





  return {
    getAllLiveProjects,
    allLiveProjects,
    success,
    err,
    setErr,
    latestClockinsTime,
    getNotificatiobCount,
    notificationCount,
    getAllNotification,
    notification,
    readNotification,
    readAllNotification,
    getAllProjects,
    allProjects,
    projectDetails,
    getProjectsDetails,
    addNote,
    deleteNote,
    getRisk,
    risk,
    addAdditionalRisk,
    clockInOut,
    getClock,
    clockview,
    getAllMessage,
    allmessage,
    messagedetails,
    getMessageDetails,
    deleteMessage,
    replyMessage,
    addMessage,
    getUsers,
    users,
    getAllHolidays,
    allholidays,
    requestHoliday,
    deleteHoliday,
    updateHoliday,
    markAsRead ,
    getAllRisk,
    getAllTask,
    alltask
   
  };
};
