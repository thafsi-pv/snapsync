
# SnapSync - Unified Media Sharing Hub
https://github.com/thafsi-pv/MERN/assets/22377348/2526aaa9-b2d6-463a-bd74-3a7a32ce5197

### LiveUrl: https://snapsync.onrender.com/

### Demo Video: https://youtu.be/XZyjKs38n9Q?si=pGh4V4mhk2cJhciY
<!-- [![Video](https://img.youtube.com/vi/XZyjKs38n9Q/0.jpg)](https://youtu.be/XZyjKs38n9Q?si=pGh4V4mhk2cJhciY) -->

#### Functional Requirement Document (FRD): https://docs.google.com/document/d/1ZANRQCTXW9wmTBztYvk0WFRVgXtaqc31rOFIxTh92JU/edit?usp=sharing
#### Database Diagram: https://dbdiagram.io/d/SnapSync-652a7510ffbf5169f0acfcad

## Overview

SnapSync is a social media application that incorporates essential features for photo and video sharing, story viewing, post interactions, messaging, and personalized content discovery, akin to well-known platforms in this genre.

To enhance SnapSync, React best practices such as component composition and the use of custom hooks are followed. These practices aid in managing the application's complexity, boosting performance, and ensuring maintainability. Here's how these practices are integrated with SnapSync's features:

### Component Composition

Component composition involves building small, reusable components that are combined to create complex UIs, which is vital for an application like SnapSync.

1. **Reusable UI Components**: Components for buttons, modals, inputs, posts, stories, etc., are created for reuse throughout the application.
2. **Layout Components**: Layout components such as `Header`, `Footer`, `Sidebar`, and `MainContent` provide a consistent look across different pages.
3. **Protected Route**: Redirects unauthenticated users to the login page while allowing authenticated users to access protected content.

### Custom Hooks

Custom hooks extract component logic into reusable functions.

1. **useAuth**: Manages user authentication state.
2. **useHandleMedia**: Facilitates effortless file uploads to Cloudinary.
3. **useChat**: Handles chat functionalities and real-time interactions.
4. **useSocialAction**: Manages interactions like likes, comments, and shares.
5. **useDebounce**: Implements delayed function execution to improve performance.
6. **useNotification**: Offers an elegant solution for in-app notifications.
7. **useToast**: Provides a charming way to display short-lived, non-intrusive messages.

### Additional Considerations

- **Performance Optimization**: Use React’s memoization (`React.memo`, `useMemo`, `useCallback`) to prevent unnecessary re-renders, especially in components that display posts, feeds, or stories.
- **State Management**: Utilize the Context API for global state management.
- **Responsive Design**: Ensure components work seamlessly across various devices.

By embracing these best practices, SnapSync not only replicates popular social media functionalities but also ensures a robust, maintainable, and scalable architecture.

## Tech Stack

- **MongoDB**: For storing user data, posts, etc.
- **Express.js**: Backend framework for RESTful API.
- **Axios**: HTTP client for API requests.
- **Formik**: For handling forms in React.
- **Framer Motion**: For animations in React.
- **React Icons**: Icon library for React.
- **React Intersection Observer**: For infinite scrolling.
- **React Router DOM**: For navigation in React apps.
- **Socket.IO Client**: For real-time communication.
- **bcrypt**: For password hashing.
- **cookie-parser**: For parsing cookies.
- **cors**: To enable Cross-Origin Resource Sharing.
- **dotenv**: For environment variable management.
- **jsonwebtoken**: For JSON Web Token implementation.
- **mongoose**: MongoDB modeling for Node.js.
- **nodemailer**: To send emails.
- **socket.io**: For real-time bidirectional communication.
- **uuid**: To generate unique identifiers.

## Features

### 1. Authentication
- Sign-up, log-in, and log-out functionalities.
- Email verification after signup.

### 2. Profile Management
- Dedicated profile page with user info.
- Bio setting and display.
- Followers and following list.

### 3. Content Posting
- Uploading and sharing images or videos.
- Viewing short video clips in a special tab.

### 4. Stories
- Adding and viewing temporary stories.
- Story visibility on user profiles.

### 5. Post Interactions
- Liking, commenting, and sharing posts.
- Saving posts for later viewing.

### 6. Messaging
- Private user-to-user chats.
- Notifications for new messages.
- Online status indication.

### 7. Explore and Search
- User search functionality.
- Exploring new posts in a discovery section.

### 8. Notifications
- Notifications for likes and new followers.
- Alerts for new chat messages.

### 9. Infinite Scrolling
- Implementation of the Intersection Observer API for endless content loading.

### 10. Animations
- Heart animation on double-clicking a post.