export const REACT_APP_API_BASE = 'http://localhost:1711/api'

export const menuItemsByRole = {
    STUDENT: [
      {
        title: "Overview",
        url: "/engine/overview",
        icon: "🔍",
      },
      {
        title: "Profile",
        url: "/engine/profile",
        icon: "👤",
      },
      {
        title: "Logs",
        url: "/engine/logs",
        icon: "🗂",
      },
      {
        title: "Reviews",
        url: "/engine/reviews",
        icon: "📝",
      },
      {
        title: "Supervisors",
        url: "/engine/supervisors",
        icon: "👥",
      },
    ],
    INDUSTRY_SUPERVISOR: [
      {
        title: "Overview",
        url: "/engine/overview",
        icon: "🔍",
      },
      {
        title: "Profile",
        url: "/engine/profile",
        icon: "👤",
      },
      {
        title: "Intern Logs",
        url: "/engine/interns-logs",
        icon: "🗂",
      },
      {
        title: "My Reviews",
        url: "/engine/supervisor-industry-reviews",
        icon: "📝",
      },
      {
        title: "Interns",
        url: "/engine/interns",
        icon: "👥",
      },
    ],
    SCHOOL_SUPERVISOR: [
      {
        title: "Overview",
        url: "/engine/overview",
        icon: "🔍",
      },
      {
        title: "Profile",
        url: "/engine/profile",
        icon: "👤",
      },
      {
        title: "Student Logs",
        url: "/engine/students-logs",
        icon: "🗂",
      },
      {
        title: "Student Reviews",
        url: "/engine/supervisor-school-reviews",
        icon: "📝",
      },
      {
        title: "Students",
        url: "/engine/students",
        icon: "👥",
      },
    ],
  };

  export const dummyLogs = [
    {
      id: "1",
      description: "While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. Exception filters are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.",
      studentId: "1",
      clockInTime: "2021-08-23T08:00:00.000Z",
      logWeek: 1,
      logDay: "Monday",
      createdAt: "2021-08-23T08:00:00.000Z",
    },
    {
      id: "2",
      description: "While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. Exception filters are designed for exactly this purpose.",
      studentId: "1",
      clockInTime: "2021-08-24T08:00:00.000Z",
      logWeek: 1,
      logDay: "Tuesday",
      createdAt: "2021-08-24T08:00:00.000Z",
    },
    {
      id: "3",
      description: "While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. Exception filters are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.",
      studentId: "1",
      clockInTime: "2021-08-25T08:00:00.000Z",
      logWeek: 1,
      logDay: "Wednesday",
      createdAt: "2021-08-25T08:00:00.000Z",
    },
  ]

export const dummyLogsWithReview = [
    {
      id: "1",
      description: "While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. Exception filters are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.",
      studentId: "1",
      clockInTime: "2021-08-23T08:00:00.000Z",
      logWeek: 1,
      logDay: "Monday",
      createdAt: "2021-08-23T08:00:00.000Z",
      review: [
        {
        id: "1",
        content: "I Like your comprehension on this topic as a side note, you can also do this and that",
        submittedById: "1",
        submittedBy: {
          id: "1",
          firstName: "Odumodu",
          lastName: "Blvck",
          email: "blvckmodu@gmail.com",
          role: "INDUSTRY_SUPERVISOR",
          createdAt: "2021-08-23T08:00:00.000Z",
        },
        createdAt: "2021-08-23T08:00:00.000Z",
      },
      {
        id: "2",
        content: "Thank you very much sir, I will take note of that",
        submittedById: "1",
        submittedBy: {
          id: "1",
          firstName: "mumin",
          lastName: "raj",
          email: "muminraj15@gmail.com",
          role: "STUDENT",
          createdAt: "2021-08-23T08:00:00.000Z",
        },
        createdAt: "2021-08-23T08:00:00.000Z",
      },
    ],
    },
    {
      id: "2",
      description: "While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. Exception filters are designed for exactly this purpose.",
      studentId: "1",
      clockInTime: "2021-08-24T08:00:00.000Z",
      logWeek: 1,
      logDay: "Tuesday",
      createdAt: "2021-08-24T08:00:00.000Z",
      review: [{
        id: "2",
        content: "This is a very good log entry",
        submittedById: "1",
        submittedBy: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "blvckmodu@gmail.com",
          role: "INDUSTRY_SUPERVISOR",
          createdAt: "2021-08-23T08:00:00.000Z",
        },
        createdAt: "2021-08-23T08:00:00.000Z",
      }],
    },
  ]

