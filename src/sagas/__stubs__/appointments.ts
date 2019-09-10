import { AppointmentsData } from '@/reducers/appointments'

export const appointmentsDataStub: AppointmentsData = {
  data: {
    data: [
      {
        id: 'NEP1600290',
        created: '2019-05-08T17:07:39',
        modified: '2019-05-09T09:18:06',
        start: '2019-05-11T17:30:00',
        end: '2019-05-11T18:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: true,
        property: {
          address: {
            buildingName: '',
            buildingNumber: '56',
            line1: 'High Street',
            line2: 'The Stables',
            line3: 'Old Haversham',
            line4: 'Milton Keynes',
            postcode: 'MK19 7DZ',
            country: 'GB',
            geolocation: {
              latitude: 52.079532,
              longitude: -0.790871
            }
          }
        },
        attendees: [
          {
            id: 'AWM',
            type: 'negotiator',
            name: 'Lukas Lang',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'lukas.lang@reapitestates.net'
              }
            ]
          },
          {
            id: 'NEP110356',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 968977'
              },
              {
                label: 'Mobile',
                detail: '07700 908977'
              },
              {
                label: 'Work',
                detail: '020 7946 8977'
              },
              {
                label: 'E-Mail',
                detail: 'rrooney129@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'BED1600537',
        created: '2019-05-08T17:00:15',
        modified: '2016-12-14T17:25:22',
        start: '2019-05-09T13:30:00',
        end: '2019-05-09T14:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: 'Cornerways',
            buildingNumber: '68',
            line1: 'The Embankment',
            line2: 'Bedford',
            line3: 'Bedfordshire',
            line4: '',
            postcode: 'MK40 3PD',
            country: 'GB',
            geolocation: {
              latitude: 52.135071,
              longitude: -0.45936
            }
          }
        },
        attendees: [
          {
            id: 'JWB',
            type: 'negotiator',
            name: 'Enzo Buchanan',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'enzo.buchanan@reapitestates.net'
              }
            ]
          },
          {
            id: 'BED130221',
            type: 'applicant',
            name: 'Mr and Mrs S Eggleton',
            confirmed: true
          }
        ]
      },
      {
        id: 'BUC1600211',
        created: '2019-05-08T16:56:37',
        modified: '2019-05-12T08:19:24',
        start: '2019-05-09T14:15:00',
        end: '2019-05-09T14:45:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: 'The Pines',
            buildingNumber: '34',
            line1: 'Sandhill Road',
            line2: 'East Claydon',
            line3: 'Buckingham',
            line4: 'Buckinghamshire',
            postcode: 'MK18 2LZ',
            country: 'GB',
            geolocation: {
              latitude: 51.924759,
              longitude: -0.929362
            }
          }
        },
        attendees: [
          {
            id: 'PAE',
            type: 'negotiator',
            name: 'Danny Findlay',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'danny.findlay@reapitestates.net'
              }
            ]
          },
          {
            id: 'BUC160036',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 966173'
              },
              {
                label: 'Mobile',
                detail: '07700 906173'
              },
              {
                label: 'Work',
                detail: '020 7946 6173'
              },
              {
                label: 'E-Mail',
                detail: 'gmcallister696@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'BUC1600210',
        created: '2019-05-08T16:44:46',
        modified: '2019-05-11T14:45:40',
        start: '2019-05-09T13:30:00',
        end: '2019-05-09T14:15:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: 'Wayside',
            buildingNumber: '',
            line1: 'Little Tingewick',
            line2: 'Buckingham',
            line3: 'Buckinghamshire',
            line4: '',
            postcode: 'MK18 4AG',
            country: 'GB',
            geolocation: {
              latitude: 51.989592,
              longitude: -1.06774
            }
          }
        },
        attendees: [
          {
            id: 'FHA',
            type: 'negotiator',
            name: 'Poppy McDonald',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'poppy.mcdonald@reapitestates.net'
              }
            ]
          },
          {
            id: 'OLY150161',
            type: 'applicant',
            name: 'Mr C Looker',
            confirmed: true
          }
        ]
      },
      {
        id: 'STS1600403',
        created: '2019-05-08T16:18:09',
        modified: '2019-05-11T10:05:34',
        start: '2019-05-09T11:15:00',
        end: '2019-05-09T11:45:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        attendees: [
          {
            id: 'AG',
            type: 'negotiator',
            name: 'Nikola Kay',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'nikola.kay@reapitestates.net'
              }
            ]
          },
          {
            id: 'NEP150790',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 970116'
              },
              {
                label: 'Mobile',
                detail: '07700 910116'
              },
              {
                label: 'Work',
                detail: '020 7946 1011'
              },
              {
                label: 'E-Mail',
                detail: 'jtennent271@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'STS1600401',
        created: '2019-05-08T15:39:57',
        modified: '2019-05-12T16:39:53',
        start: '2019-05-10T15:15:00',
        end: '2019-05-10T16:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        attendees: [
          {
            id: 'AEN',
            type: 'negotiator',
            name: 'Zac McColl',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'zac.mccoll@reapitestates.net'
              }
            ]
          },
          {
            id: 'NEP160059',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 963008'
              },
              {
                label: 'Mobile',
                detail: '07700 903008'
              },
              {
                label: 'Work',
                detail: '020 7946 3008'
              },
              {
                label: 'E-Mail',
                detail: 'hfield6@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'NEP1600288',
        created: '2019-05-08T14:56:47',
        modified: '2019-05-08T19:11:22',
        start: '2019-05-09T16:30:00',
        end: '2019-05-09T17:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: true,
        property: {
          address: {
            buildingName: '',
            buildingNumber: '56',
            line1: 'High Street',
            line2: 'The Stables',
            line3: 'Old Haversham',
            line4: 'Milton Keynes',
            postcode: 'MK19 7DZ',
            country: 'GB',
            geolocation: {
              latitude: 52.079532,
              longitude: -0.790871
            }
          }
        },
        attendees: [
          {
            id: 'AWM',
            type: 'negotiator',
            name: 'Lukas Lang',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'lukas.lang@reapitestates.net'
              }
            ]
          },
          {
            id: 'TOW160002',
            type: 'applicant',
            name: 'Mrs J Faid',
            confirmed: true
          }
        ]
      },
      {
        id: 'STS1600396',
        created: '2019-05-08T14:46:37',
        modified: '2019-05-12T12:32:01',
        start: '2019-05-08T18:00:00',
        end: '2019-05-08T18:30:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        attendees: [
          {
            id: 'AEN',
            type: 'negotiator',
            name: 'Zac McColl',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'zac.mccoll@reapitestates.net'
              }
            ]
          },
          {
            id: 'NEP150646',
            type: 'applicant',
            name: 'Mr L Balogun',
            confirmed: true
          }
        ]
      },
      {
        id: 'NEP1600287',
        created: '2019-05-08T14:39:24',
        modified: '2019-05-12T13:23:36',
        start: '2019-05-12T17:30:00',
        end: '2019-05-12T18:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: true,
        attendees: [
          {
            id: 'AWM',
            type: 'negotiator',
            name: 'Lukas Lang',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'lukas.lang@reapitestates.net'
              }
            ]
          }
        ]
      },
      {
        id: 'BED1600534',
        created: '2019-05-08T14:31:27',
        modified: '2016-12-18T08:24:24',
        start: '2019-05-09T15:15:00',
        end: '2019-05-09T16:15:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: 'The Cottage',
            buildingNumber: '',
            line1: 'Shelton Road',
            line2: 'Yielden',
            line3: 'Bedfordshire',
            line4: '',
            postcode: 'MK44 1AQ',
            country: 'GB',
            geolocation: {
              latitude: 52.29491,
              longitude: -0.512901
            }
          }
        },
        attendees: [
          {
            id: 'JWB',
            type: 'negotiator',
            name: 'Enzo Buchanan',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'enzo.buchanan@reapitestates.net'
              }
            ]
          },
          {
            id: 'BED160144',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 970904'
              },
              {
                label: 'Mobile',
                detail: '07700 910904'
              },
              {
                label: 'Work',
                detail: '020 7946 1090'
              },
              {
                label: 'E-Mail',
                detail: 'jwilson602@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'STS1600394',
        created: '2019-05-08T14:31:25',
        modified: '2019-05-12T16:18:48',
        start: '2019-05-10T14:00:00',
        end: '2019-05-10T14:30:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        attendees: [
          {
            id: 'AEN',
            type: 'negotiator',
            name: 'Zac McColl',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'zac.mccoll@reapitestates.net'
              }
            ]
          },
          {
            id: 'MKC150681',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 968195'
              },
              {
                label: 'Mobile',
                detail: '07700 908195'
              },
              {
                label: 'Work',
                detail: '020 7946 8195'
              },
              {
                label: 'E-Mail',
                detail: 'bpaterson905@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'BED1600532',
        created: '2019-05-08T14:05:42',
        modified: '2019-05-12T17:59:02',
        start: '2019-05-11T15:30:00',
        end: '2019-05-11T16:30:00',
        typeId: 'VL',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: '',
            buildingNumber: '49',
            line1: 'The Causeway',
            line2: 'Carlton',
            line3: 'Bedford',
            line4: 'Bedfordshire',
            postcode: 'MK43 7LU',
            country: 'GB',
            geolocation: {
              latitude: 52.188155,
              longitude: -0.604618
            }
          }
        },
        attendees: [
          {
            id: 'JJS',
            type: 'negotiator',
            name: 'Chase MacLean',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'chase.maclean@reapitestates.net'
              }
            ]
          }
        ]
      },
      {
        id: 'MKC1600312',
        created: '2019-05-08T13:33:25',
        modified: '2019-05-08T13:33:25',
        start: '2019-05-09T16:30:00',
        end: '2019-05-09T17:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: '',
            buildingNumber: '39',
            line1: 'Foxfield',
            line2: 'Broughton Gate',
            line3: 'Milton Keynes',
            line4: 'Buckinghamshire',
            postcode: 'MK10 7BP',
            country: 'GB',
            geolocation: {
              latitude: 52.044516,
              longitude: -0.689953
            }
          }
        },
        attendees: [
          {
            id: 'CLD',
            type: 'negotiator',
            name: 'Amelie Thompson',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'amelie.thompson@reapitestates.net'
              }
            ]
          },
          {
            id: 'MKC160072',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 967539'
              },
              {
                label: 'Mobile',
                detail: '07700 907539'
              },
              {
                label: 'Work',
                detail: '020 7946 7539'
              },
              {
                label: 'E-Mail',
                detail: 'mmorgan974@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'BED1600530',
        created: '2019-05-08T13:18:59',
        modified: '2019-05-12T08:33:02',
        start: '2019-05-11T15:00:00',
        end: '2019-05-11T17:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: 'The Firs',
            buildingNumber: '',
            line1: 'Bedford Road',
            line2: 'Northill',
            line3: 'Bedfordshire',
            line4: '',
            postcode: 'SG18 9AW',
            country: 'GB',
            geolocation: {
              latitude: 52.105969,
              longitude: -0.353784
            }
          }
        },
        attendees: [
          {
            id: 'JWB',
            type: 'negotiator',
            name: 'Enzo Buchanan',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'enzo.buchanan@reapitestates.net'
              }
            ]
          },
          {
            id: 'BED160144',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 970904'
              },
              {
                label: 'Mobile',
                detail: '07700 910904'
              },
              {
                label: 'Work',
                detail: '020 7946 1090'
              },
              {
                label: 'E-Mail',
                detail: 'jwilson602@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'BUC1600209',
        created: '2019-05-08T13:08:53',
        modified: '2019-05-11T14:45:35',
        start: '2019-05-09T13:00:00',
        end: '2019-05-09T13:30:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: 'Wayside',
            buildingNumber: '',
            line1: 'Little Tingewick',
            line2: 'Buckingham',
            line3: 'Buckinghamshire',
            line4: '',
            postcode: 'MK18 4AG',
            country: 'GB',
            geolocation: {
              latitude: 51.989592,
              longitude: -1.06774
            }
          }
        },
        attendees: [
          {
            id: 'PAE',
            type: 'negotiator',
            name: 'Danny Findlay',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'danny.findlay@reapitestates.net'
              }
            ]
          },
          {
            id: 'FHA',
            type: 'negotiator',
            name: 'Poppy McDonald',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'poppy.mcdonald@reapitestates.net'
              }
            ]
          },
          {
            id: 'BUC140468',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 964515'
              },
              {
                label: 'Mobile',
                detail: '07700 904515'
              },
              {
                label: 'Work',
                detail: '020 7946 4515'
              },
              {
                label: 'E-Mail',
                detail: 'shussain691@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'BED1600525',
        created: '2019-05-08T13:02:58',
        modified: '2016-12-14T16:30:47',
        start: '2019-05-09T13:30:00',
        end: '2019-05-09T14:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: 'The Homestead',
            buildingNumber: '57',
            line1: 'The Embankment',
            line2: 'Bedford',
            line3: 'Bedfordshire',
            line4: '',
            postcode: 'MK40 3PD',
            country: 'GB',
            geolocation: {
              latitude: 52.135071,
              longitude: -0.45936
            }
          }
        },
        attendees: [
          {
            id: 'JWB',
            type: 'negotiator',
            name: 'Enzo Buchanan',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'enzo.buchanan@reapitestates.net'
              }
            ]
          },
          {
            id: 'BED130221',
            type: 'applicant',
            name: 'Mr and Mrs S Eggleton',
            confirmed: true
          }
        ]
      },
      {
        id: 'BED1600523',
        created: '2019-05-08T12:40:52',
        modified: '2016-12-13T17:12:40',
        start: '2019-05-09T11:00:00',
        end: '2019-05-09T12:00:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: '',
            buildingNumber: '54',
            line1: 'Tyne Crescent',
            line2: 'Bedford',
            line3: 'Bedfordshire',
            line4: '',
            postcode: 'MK41 7UJ',
            country: 'GB',
            geolocation: {
              latitude: 52.161384,
              longitude: -0.461113
            }
          }
        },
        attendees: [
          {
            id: 'JWB',
            type: 'negotiator',
            name: 'Enzo Buchanan',
            confirmed: false,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'enzo.buchanan@reapitestates.net'
              }
            ]
          },
          {
            id: 'BED160039',
            type: 'applicant',
            confirmed: false,
            communicationDetails: [
              {
                label: 'Home',
                detail: '01632 966819'
              },
              {
                label: 'Mobile',
                detail: '07700 906819'
              },
              {
                label: 'Work',
                detail: '020 7946 6819'
              },
              {
                label: 'E-Mail',
                detail: 'smckenna707@rpsfiction.net'
              }
            ]
          }
        ]
      },
      {
        id: 'MKC1600311',
        created: '2019-05-08T12:36:02',
        modified: '2019-05-11T16:40:10',
        start: '2019-05-11T11:15:00',
        end: '2019-05-11T11:30:00',
        typeId: 'VW',
        recurring: false,
        cancelled: false,
        property: {
          address: {
            buildingName: '',
            buildingNumber: '8',
            line1: 'Deacon Place',
            line2: 'Middleton',
            line3: 'Milton Keynes',
            line4: '',
            postcode: 'MK10 9FS',
            country: '',
            geolocation: {
              latitude: 52.04681,
              longitude: -0.710721
            }
          }
        },
        attendees: [
          {
            id: 'CLD',
            type: 'negotiator',
            name: 'Amelie Thompson',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'amelie.thompson@reapitestates.net'
              }
            ]
          }
        ]
      },
      {
        id: 'STS1600389',
        created: '2019-05-08T11:48:40',
        modified: '2019-05-09T14:38:50',
        start: '2019-05-09T14:00:00',
        end: '2019-05-09T14:30:00',
        typeId: 'VW',
        recurring: false,
        cancelled: true,
        attendees: [
          {
            id: 'AG',
            type: 'negotiator',
            name: 'Nikola Kay',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'nikola.kay@reapitestates.net'
              }
            ]
          },
          {
            id: 'MKC100651',
            type: 'applicant',
            name: 'Mr M Siddall',
            confirmed: true
          }
        ]
      }
    ],
    pageNumber: 1,
    pageSize: 50,
    pageCount: 50,
    totalCount: 1710
  }
}
