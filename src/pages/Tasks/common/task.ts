import { IUser } from "../../Employees/common/employee";

export interface ITask {
  id: string;
  title: string;
  description: string;
  assignee: IUser;
  reviewer: IUser;
  status: string;
  createdAt: string;
  updatedAt: string;
  comments: IComment[];
  attachments: string[];
  location: ILocation;
  start_date?: string;
  due_date?: string;
}

export interface IComment {
  id: string;
  comment: string;
  user: IUser;
  createdAt: string;
}

export interface ILocation {
  long: string;
  lat: string;
  radius?: string;
}

export const dummyTasks: ITask[] = [
  {
    id: "task-001",
    title: "Create project plan",
    description:
      "Develop a comprehensive project plan for the new product launch.",
    assignee: {
      id: "user-001",
      first_name: "Alice",
      last_name: "Johnson",
      role: "Project Manager",
      status: "Active",
      job_title: "Senior Project Manager",
      phone: "555-1234",
      location: "New York, USA",
      email: "alice.johnson@example.com",
    },
    reviewer: {
      id: "user-002",
      first_name: "Bob",
      last_name: "Smith",
      role: "Director",
      status: "Active",
      job_title: "Director of Operations",
      phone: "555-5678",
      location: "New York, USA",
      email: "bob.smith@example.com",
    },
    status: "In Progress",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-02T12:00:00Z",
    comments: [
      {
        id: "comment-001",
        comment:
          "Initial draft looks good. Let's add more details on the timeline.",
        user: {
          id: "user-002",
          first_name: "Bob",
          last_name: "Smith",
          role: "Director",
          status: "Active",
          job_title: "Director of Operations",
          phone: "555-5678",
          location: "New York, USA",
          email: "bob.smith@example.com",
        },
        createdAt: "2024-06-02T13:00:00Z",
      },
    ],
    attachments: ["project_plan_draft.docx"],
    location: {
      long: "40.7128",
      lat: "74.0060",
    },
  },
  {
    id: "task-002",
    title: "Design website layout",
    description: "Create the layout for the new company website.",
    assignee: {
      id: "user-003",
      first_name: "Charlie",
      last_name: "Davis",
      role: "Designer",
      status: "Active",
      job_title: "UI/UX Designer",
      phone: "555-8765",
      location: "San Francisco, USA",
      email: "charlie.davis@example.com",
    },
    reviewer: {
      id: "user-004",
      first_name: "Dana",
      last_name: "Lee",
      role: "Creative Director",
      status: "Active",
      job_title: "Creative Director",
      phone: "555-4321",
      location: "San Francisco, USA",
      email: "dana.lee@example.com",
    },
    status: "Pending",
    createdAt: "2024-06-03T08:00:00Z",
    updatedAt: "2024-06-03T08:30:00Z",
    comments: [],
    attachments: ["website_layout_sketch.png"],
    location: {
      long: "37.7749",
      lat: "122.4194",
      radius: "5km",
    },
  },
  {
    id: "task-003",
    title: "Develop mobile app",
    description: "Start development on the new mobile app for iOS and Android.",
    assignee: {
      id: "user-005",
      first_name: "Eve",
      last_name: "Martinez",
      role: "Developer",
      status: "Active",
      job_title: "Mobile Developer",
      phone: "555-6543",
      location: "Austin, USA",
      email: "eve.martinez@example.com",
    },
    reviewer: {
      id: "user-006",
      first_name: "Frank",
      last_name: "Wong",
      role: "CTO",
      status: "Active",
      job_title: "Chief Technology Officer",
      phone: "555-9876",
      location: "Austin, USA",
      email: "frank.wong@example.com",
    },
    status: "Not Started",
    createdAt: "2024-06-04T09:00:00Z",
    updatedAt: "2024-06-04T09:00:00Z",
    comments: [],
    attachments: ["app_requirements.docx"],
    location: {
      long: "30.2672",
      lat: "97.7431",
    },
  },
  {
    id: "task-004",
    title: "Conduct market research",
    description:
      "Research market trends and customer preferences for the new product.",
    assignee: {
      id: "user-007",
      first_name: "Grace",
      last_name: "Harris",
      role: "Analyst",
      status: "Active",
      job_title: "Market Research Analyst",
      phone: "555-3210",
      location: "Chicago, USA",
      email: "grace.harris@example.com",
    },
    reviewer: {
      id: "user-008",
      first_name: "Hank",
      last_name: "Nguyen",
      role: "Marketing Manager",
      status: "Active",
      job_title: "Marketing Manager",
      phone: "555-6540",
      location: "Chicago, USA",
      email: "hank.nguyen@example.com",
    },
    status: "In Progress",
    createdAt: "2024-06-05T11:00:00Z",
    updatedAt: "2024-06-05T12:00:00Z",
    comments: [
      {
        id: "comment-002",
        comment: "Found some interesting trends in the competitor analysis.",
        user: {
          id: "user-007",
          first_name: "Grace",
          last_name: "Harris",
          role: "Analyst",
          status: "Active",
          job_title: "Market Research Analyst",
          phone: "555-3210",
          location: "Chicago, USA",
          email: "grace.harris@example.com",
        },
        createdAt: "2024-06-06T10:00:00Z",
      },
    ],
    attachments: ["market_research_report.pdf"],
    location: {
      long: "41.8781",
      lat: "87.6298",
    },
  },
  {
    id: "task-005",
    title: "Prepare financial report",
    description: "Compile the financial report for Q2 2024.",
    assignee: {
      id: "user-009",
      first_name: "Ivy",
      last_name: "Kim",
      role: "Accountant",
      status: "Active",
      job_title: "Senior Accountant",
      phone: "555-9870",
      location: "Los Angeles, USA",
      email: "ivy.kim@example.com",
    },
    reviewer: {
      id: "user-010",
      first_name: "Jack",
      last_name: "Brown",
      role: "CFO",
      status: "Active",
      job_title: "Chief Financial Officer",
      phone: "555-6547",
      location: "Los Angeles, USA",
      email: "jack.brown@example.com",
    },
    status: "In Review",
    createdAt: "2024-06-06T14:00:00Z",
    updatedAt: "2024-06-06T15:00:00Z",
    comments: [
      {
        id: "comment-003",
        comment: "Please verify the expense numbers for accuracy.",
        user: {
          id: "user-010",
          first_name: "Jack",
          last_name: "Brown",
          role: "CFO",
          status: "Active",
          job_title: "Chief Financial Officer",
          phone: "555-6547",
          location: "Los Angeles, USA",
          email: "jack.brown@example.com",
        },
        createdAt: "2024-06-07T11:00:00Z",
      },
    ],
    attachments: ["financial_report_q2_2024.xlsx"],
    location: {
      long: "34.0522",
      lat: "118.2437",
    },
  },
  {
    id: "task-006",
    title: "Organize team building event",
    description: "Plan and organize a team building event for the sales team.",
    assignee: {
      id: "user-011",
      first_name: "Karen",
      last_name: "Evans",
      role: "HR Specialist",
      status: "Active",
      job_title: "HR Specialist",
      phone: "555-5432",
      location: "Boston, USA",
      email: "karen.evans@example.com",
    },
    reviewer: {
      id: "user-012",
      first_name: "Leo",
      last_name: "Garcia",
      role: "HR Manager",
      status: "Active",
      job_title: "HR Manager",
      phone: "555-6789",
      location: "Boston, USA",
      email: "leo.garcia@example.com",
    },
    status: "Completed",
    createdAt: "2024-06-07T10:00:00Z",
    updatedAt: "2024-06-08T16:00:00Z",
    comments: [
      {
        id: "comment-004",
        comment: "The event was a great success! Thanks for organizing.",
        user: {
          id: "user-012",
          first_name: "Leo",
          last_name: "Garcia",
          role: "HR Manager",
          status: "Active",
          job_title: "HR Manager",
          phone: "555-6789",
          location: "Boston, USA",
          email: "leo.garcia@example.com",
        },
        createdAt: "2024-06-08T17:00:00Z",
      },
    ],
    attachments: ["event_photos.zip"],
    location: {
      long: "42.3601",
      lat: "71.0589",
    },
  },
  {
    id: "task-007",
    title: "Set up new office",
    description: "Coordinate the setup of the new office space in Miami.",
    assignee: {
      id: "user-013",
      first_name: "Mia",
      last_name: "Lewis",
      role: "Facilities Manager",
      status: "Active",
      job_title: "Facilities Manager",
      phone: "555-8760",
      location: "Miami, USA",
      email: "mia.lewis@example.com",
    },
    reviewer: {
      id: "user-014",
      first_name: "Noah",
      last_name: "Perez",
      role: "Operations Manager",
      status: "Active",
      job_title: "Operations Manager",
      phone: "555-4320",
      location: "Miami, USA",
      email: "noah.perez@example.com",
    },
    status: "In Progress",
    createdAt: "2024-06-09T08:00:00Z",
    updatedAt: "2024-06-10T09:00:00Z",
    comments: [
      {
        id: "comment-005",
        comment: "Furniture will be delivered next week.",
        user: {
          id: "user-013",
          first_name: "Mia",
          last_name: "Lewis",
          role: "Facilities Manager",
          status: "Active",
          job_title: "Facilities Manager",
          phone: "555-8760",
          location: "Miami, USA",
          email: "mia.lewis@example.com",
        },
        createdAt: "2024-06-10T10:00:00Z",
      },
    ],
    attachments: ["office_layout_plan.pdf"],
    location: {
      long: "25.7617",
      lat: "80.1918",
    },
  },
  {
    id: "task-008",
    title: "Develop marketing campaign",
    description: "Create and launch a marketing campaign for the new product.",
    assignee: {
      id: "user-015",
      first_name: "Olivia",
      last_name: "Green",
      role: "Marketing Specialist",
      status: "Active",
      job_title: "Marketing Specialist",
      phone: "555-1230",
      location: "Seattle, USA",
      email: "olivia.green@example.com",
    },
    reviewer: {
      id: "user-016",
      first_name: "Paul",
      last_name: "Adams",
      role: "Marketing Director",
      status: "Active",
      job_title: "Marketing Director",
      phone: "555-5670",
      location: "Seattle, USA",
      email: "paul.adams@example.com",
    },
    status: "Not Started",
    createdAt: "2024-06-10T10:00:00Z",
    updatedAt: "2024-06-10T10:00:00Z",
    comments: [],
    attachments: ["campaign_brief.docx"],
    location: {
      long: "47.6062",
      lat: "122.3321",
      radius: "10km",
    },
  },
  {
    id: "task-009",
    title: "Upgrade server infrastructure",
    description: "Plan and execute the upgrade of the server infrastructure.",
    assignee: {
      id: "user-017",
      first_name: "Quinn",
      last_name: "Miller",
      role: "System Administrator",
      status: "Active",
      job_title: "System Administrator",
      phone: "555-3217",
      location: "Houston, USA",
      email: "quinn.miller@example.com",
    },
    reviewer: {
      id: "user-018",
      first_name: "Rachel",
      last_name: "Taylor",
      role: "IT Manager",
      status: "Active",
      job_title: "IT Manager",
      phone: "555-6543",
      location: "Houston, USA",
      email: "rachel.taylor@example.com",
    },
    status: "In Progress",
    createdAt: "2024-06-11T08:00:00Z",
    updatedAt: "2024-06-11T09:00:00Z",
    comments: [
      {
        id: "comment-006",
        comment: "Testing the new servers before deployment.",
        user: {
          id: "user-017",
          first_name: "Quinn",
          last_name: "Miller",
          role: "System Administrator",
          status: "Active",
          job_title: "System Administrator",
          phone: "555-3217",
          location: "Houston, USA",
          email: "quinn.miller@example.com",
        },
        createdAt: "2024-06-11T10:00:00Z",
      },
    ],
    attachments: ["server_upgrade_plan.docx"],
    location: {
      long: "29.7604",
      lat: "95.3698",
    },
  },
  {
    id: "task-005",
    title: "Prepare financial report",
    description: "Compile the financial report for Q2 2024.",
    assignee: {
      id: "user-009",
      first_name: "Ivy",
      last_name: "Kim",
      role: "Accountant",
      status: "Active",
      job_title: "Senior Accountant",
      phone: "555-9870",
      location: "Los Angeles, USA",
      email: "ivy.kim@example.com",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    reviewer: {
      id: "user-010",
      first_name: "Jack",
      last_name: "Brown",
      role: "CFO",
      status: "Active",
      job_title: "Chief Financial Officer",
      phone: "555-6547",
      location: "Los Angeles, USA",
      email: "jack.brown@example.com",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    status: "In Review",
    createdAt: "2024-06-06T14:00:00Z",
    updatedAt: "2024-06-06T15:00:00Z",
    comments: [
      {
        id: "comment-003",
        comment: "Please verify the expense numbers for accuracy.",
        user: {
          id: "user-010",
          first_name: "Jack",
          last_name: "Brown",
          role: "CFO",
          status: "Active",
          job_title: "Chief Financial Officer",
          phone: "555-6547",
          location: "Los Angeles, USA",
          email: "jack.brown@example.com",
          image: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        createdAt: "2024-06-07T11:00:00Z",
      },
    ],
    attachments: ["financial_report_q2_2024.xlsx"],
    location: {
      long: "34.0522",
      lat: "118.2437",
    },
  },
  {
    id: "task-006",
    title: "Organize team building event",
    description:
      "Plan and organize the annual team building event for the company.",
    assignee: {
      id: "user-011",
      first_name: "Karen",
      last_name: "Thomas",
      role: "HR",
      status: "Active",
      job_title: "HR Manager",
      phone: "555-3212",
      location: "Seattle, USA",
      email: "karen.thomas@example.com",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    reviewer: {
      id: "user-012",
      first_name: "Leo",
      last_name: "Martin",
      role: "CEO",
      status: "Active",
      job_title: "Chief Executive Officer",
      phone: "555-1239",
      location: "Seattle, USA",
      email: "leo.martin@example.com",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    status: "Completed",
    createdAt: "2024-06-08T10:00:00Z",
    updatedAt: "2024-06-08T18:00:00Z",
    comments: [],
    attachments: ["event_agenda.pdf"],
    location: {
      long: "47.6062",
      lat: "122.3321",
    },
  },
];
