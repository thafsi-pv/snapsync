
# SnapSync - Instagram Clone App
https://github.com/thafsi-pv/MERN/assets/22377348/2526aaa9-b2d6-463a-bd74-3a7a32ce5197

### LiveUrl: https://snapsync.onrender.com/

### Demo Video: https://youtu.be/XZyjKs38n9Q?si=pGh4V4mhk2cJhciY
<!-- [![Video](https://img.youtube.com/vi/XZyjKs38n9Q/0.jpg)](https://youtu.be/XZyjKs38n9Q?si=pGh4V4mhk2cJhciY) -->

## Overview

SnapSync is a social media application that mirrors the key features of the popular Instagram platform. Users can share images and videos, view stories, engage with posts, chat with other users, and explore a personalized feed.

To enhance the "SnapSync" social media application, which already mirrors key features of Instagram, followed React best practices such as component composition and the use of custom hooks. These practices will help in managing the complexity of the application, improving its performance, and making it more maintainable. Here's how you can integrate these practices with the features of SnapSync:

### Component Composition

Component composition is about building small, reusable components that can be combined to create more complex UIs. This approach is particularly useful for a feature-rich application like Instagram.

1. **Reusable UI Components**: Create components for buttons, modals, inputs, posts, stories, etc., that can be reused throughout the application. For instance, a `Post` component can display both images and videos, and a `Story` component can be used in different parts of the application.

2. **Layout Components**: Develop layout components such as `Header`, `Footer`, `Sidebar`, and `MainContent` to maintain a consistent layout across different pages.

3. **Protected Route**: If the user is authenticated, it will render the component passed to it; otherwise, it will redirect the user to the login page.

### Custom Hooks

Custom hooks allow you to extract component logic into reusable functions.

1. **useAuth**: Manage user authentication state. This hook can provide user information and authentication status to any component that needs it.

2. **useHandleMedia**:  Effortlessly handle file uploads to Cloudinary,.

3. **useChat**: Handle chat functionalities. This hook can manage sending and receiving messages, connecting to a WebSocket (if real-time chat is implemented), and maintaining chat history.

4. **useSocialAction**: Handle likes, comments, and shares for posts. It can provide functions to update the post’s state (like count, comment list) and communicate with the backend.

5. **useDebounce**: Delays the execution of a function until a certain amount of time has passed since the last time it was invoked.

6. **useNotification**: An exquisite tool for handling in-app notifications.

7. **useToast**:A delightful touch for displaying short, auto-expiring messages in a non-intrusive way. It's ideal for confirmation messages, success states.

### Additional Considerations

- **Performance Optimization**: Use React’s memoization (`React.memo`, `useMemo`, `useCallback`) to prevent unnecessary re-renders, especially in components that display posts, feeds, or stories.

- **State Management**: For global state management using Context API

- **Responsive Design**: Ensure all components are responsive and provide a good user experience on various devices.

By following these best practices, SnapSync will not only mirror the functionality of Instagram but also ensure a solid, maintainable, and scalable React application architecture.

## Tech Stack

- **MongoDB**: Database to store user data, posts, and other information.
- **Express.js**: Backend framework for building a RESTful API.
- **Axios**: HTTP client for making API requests.
- **Formik**: Form library for handling forms with React.
- **Framer Motion**: Library for creating animations in React.
- **React Icons**: Library for popular icon sets in React applications.
- **React Intersection Observer**: Utilizes the Intersection Observer API for infinite scrolling.
- **React Router DOM**: Library for navigation in React applications.
- **Socket.IO Client**: Real-time bidirectional event-based communication.
- **bcrypt**: Library for hashing passwords.
- **cookie-parser**: Middleware to parse cookies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Zero-dependency module to load environment variables.
- **jsonwebtoken**: JSON Web Token implementation.
- **mongoose**: MongoDB object modeling for Node.js.
- **nodemailer**: Send emails from Node.js.
- **socket.io**: Real-time bidirectional event-based communication for the web.
- **uuid**: Generate unique identifiers.

## Features

### 1. Authentication

- **User Authentication**: Users can sign up, log in, and log out.
- **Email Verification**: A verification email is sent to the registered email after signup.

### 2. Profile Management

- **Profile Page**: Users have a dedicated profile page containing all their information.
- **Bio**: Users can set and display a bio on their profile.
- **Followers and Followed List**: View and interact with followers and followed users.

### 3. Posting Content

- **Add Post (Image/Video)**: Users can upload and share images or videos.
- **View Reels**: Explore and view short video clips in a dedicated Reels tab.

### 4. Stories

- **Add Story**: Users can add temporary stories.
- **View Story from User Profile**: Stories are visible on user profiles.

### 5. Engagement with Posts

- **Like Post**: Users can like posts.
- **Comment on Post**: Users can leave comments on posts.
- **Share Post**: Share posts with other users.
- **Save Post**: Save favorite posts for later viewing.

### 6. Messaging

- **Chat Between Users**: Users can engage in private conversations.
- **New Message Notification**: Notifications for new messages.
- **Online Status in Chat List**: Indicates whether users are online.

### 7. Explore and Search

- **Search Users**: Users can search for other users.
- **Explore Contents**: Discover new posts in the Explore section.

### 8. Notifications

- **Like and Follow Notifications**: Receive notifications for likes and new followers.
- **New Message Notification**: Get notified of new chat messages.

### 9. Infinite Scrolling

- **Intersection Observer**: Utilizes the Intersection Observer API for infinite scrolling.

### 10. Animation

- **Double Click Fly Heart Animation**: Animated heart icon appears when a post is double-clicked.

