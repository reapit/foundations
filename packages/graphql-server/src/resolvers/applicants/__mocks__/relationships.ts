export const relationshipsMock = {
  _embedded: [
    {
      id: 'MKT20000020',
      created: '2020-07-15T08:22:55Z',
      modified: null,
      applicantId: 'MKT200004',
      associatedType: 'contact',
      associatedId: 'MKT20000010',
      isMain: true,
      _links: {
        self: {
          href: '/applicants/MKT200004/relationships/MKT20000020',
        },
        contact: {
          href: '/contacts/MKT20000010',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 25,
  pageCount: 1,
  totalCount: 1,
  _links: {
    self: {
      href: '/applicants/?PageNumber=1&PageSize=25&id=MKT200004',
    },
    first: {
      href: '/applicants/?PageNumber=1&PageSize=25&id=MKT200004',
    },
  },
}
