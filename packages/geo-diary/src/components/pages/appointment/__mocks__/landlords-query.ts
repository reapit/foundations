import { LandlordsQueryData } from '../appointment'

export const mockLandlordsQuery = {
  data: {
    GetLandlords: {
      __typename: 'PagedResultLandlordModel',
      _embedded: [
        {
          id: 'OXF200001',
          related: [
            {
              id: 'OXF12300101',
              name: 'Mr John Smith',
              type: 'contact',
              homePhone: '01234 567890',
              workPhone: '03242343244',
              mobilePhone: '07890 123456',
              email: 'example@email.com',
            },
          ],
        },
      ],
    },
  } as LandlordsQueryData,
}
