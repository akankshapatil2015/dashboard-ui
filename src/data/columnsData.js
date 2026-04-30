const columns = [
  {
    id: 'todo',
    title: 'To Do',
    count: 3,
    cards: [
      {
        id: 'col-1-1',
        tags: ['Dev', 'Medium', 'Sep 12 - 16'],
        title: 'Web Development',
        description:
          'Development is a process that creates growth, progress, positive change.',
        stats: '03 Comments • 2 attachments',
        avatars: 2,
      },
      {
        id: 'col-1-2',
        tags: ['UI/UX', 'High', 'Sep 12 - 16'],
        title: 'UI/UX Designing',
        description:
          'Design work that improves product usability and visual communication.',
        stats: '08 Comments • 4 attachments',
        avatars: 2,
        cover: true,
      },
      {
        id: 'col-1-3',
        tags: ['Dev', 'Medium', 'Sep 12 - 16'],
        title: 'Mobile App Development',
        description:
          'Mobile app development is the process of creating software applications that run on mobile devices.',
        stats: '10 Comments • 0 attachments',
        avatars: 2,
      },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    count: 2,
    cards: [
      {
        id: 'col-2-1',
        tags: ['Marketing', 'Medium', 'Sep 12 - 16'],
        title: 'Inhouse Marketing',
        description:
          'Development is a process that creates growth, progress, positive change.',
        stats: '20 Comments • 5 attachments',
        avatars: 3,
      },
      {
        id: 'col-2-2',
        tags: ['Branding', 'Low', 'Sep 12 - 16'],
        title: 'PPC Marketing',
        description:
          'Adkernel provides enterprise-level programmatic advertising solutions.',
        stats: '15 Comments • 10 attachments',
        avatars: 1,
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    count: 2,
    cards: [
      {
        id: 'col-3-1',
        tags: ['Client Work', 'Low', 'Sep 12 - 16'],
        title: 'Website Design',
        description:
          'Outstanding website design can help you make a lasting impression.',
        stats: '12 Comments • 4 attachments',
        avatars: 2,
      },
      {
        id: 'col-3-2',
        tags: ['Marketing', 'Medium', 'Sep 12 - 16'],
        title: 'Social Media Marketing',
        description:
          'Social media marketing uses social platforms to reach target audiences.',
        stats: '50 Comments • 0 attachments',
        avatars: 1,
      },
    ],
  },
];

export default columns;
