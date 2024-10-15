import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // State for users, current user, and messages
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  // Effect to update localStorage when users change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Effect to update localStorage when current user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Effect to update localStorage when messages change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // Function to register a new user
  const registerUser = (userData, role) => {
    const newUser = {
      id: `${role === 'admin' ? 'A' : 'S'}${Date.now()}`,
      ...userData,
      role: role,
      registeredCourses: []
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return { success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`, userId: newUser.id };
  };

  // Function to register an admin
  const registerAdmin = (formData) => {
    return registerUser(formData, 'admin');
  };

  // Function to register a student
  const registerStudent = (formData) => {
    return registerUser(formData, 'student');
  };

  // Function to handle user login
  const login = (username, password) => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setCurrentUser(foundUser);
      return { success: true, user: foundUser };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  // Function to handle user logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Function to register a student for a course
  const registerForCourse = (userId, course) => {
    const user = users.find(u => u.id === userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    if (!user.registeredCourses) {
      user.registeredCourses = [];
    }
    if (user.registeredCourses.some(c => c.id === course.id)) {
      return { success: false, message: 'Already registered for this course' };
    }
    if (user.registeredCourses.length >= 5) {
      return { success: false, message: 'Maximum course registration limit reached' };
    }
    const updatedUsers = users.map(u => 
      u.id === userId 
        ? { ...u, registeredCourses: [...u.registeredCourses, course] }
        : u
    );
    setUsers(updatedUsers);
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prevUser => ({
        ...prevUser,
        registeredCourses: [...(prevUser.registeredCourses || []), course]
      }));
    }
    return { success: true, message: 'Course registered successfully' };
  };

  // Function to unregister a student from a course
  const unregisterFromCourse = (userId, courseId) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, registeredCourses: user.registeredCourses.filter(c => c.id !== courseId) }
        : user
    );
    setUsers(updatedUsers);
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prevUser => ({
        ...prevUser,
        registeredCourses: prevUser.registeredCourses.filter(c => c.id !== courseId)
      }));
    }
  };

  // Function to send a message
  const sendMessage = (senderId, receiverId, subject, content) => {
    const newMessage = {
      id: Date.now(),
      senderId,
      receiverId,
      subject,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return { success: true, message: 'Message sent successfully' };
  };

  // Function to mark a message as read
  const markMessageAsRead = (messageId) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  // Function to get messages for a specific user
  const getUserMessages = (userId) => {
    return messages.filter(message => message.receiverId === userId);
  };

  return (
    <UserContext.Provider value={{ 
      users,
      setUsers,
      currentUser,
      setCurrentUser,
      messages,
      login,
      logout,
      registerAdmin,
      registerStudent,
      registerForCourse,
      unregisterFromCourse,
      sendMessage,
      markMessageAsRead,
      getUserMessages
    }}>
      {children}
    </UserContext.Provider>
  );
};
