import { AppsBrowseConfigEnum } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppBrowseManageTable, updatedItemIndex } from '../app-browse-manage-table'

jest.mock('react-color', () => ({
  SketchPicker: jest.fn(),
}))

describe('AppBrowseManageTable', () => {
  it('should match a snapshot', () => {
    process.env.appEnv = 'development'
    expect(
      render(
        <AppBrowseManageTable
          type={AppsBrowseConfigEnum.FEATURED}
          items={[]}
          setEditType={() => {}}
          setSelectedItem={() => {}}
          deleteItem={() => {}}
          connectSession={{} as any}
          setItems={() => {}}
        />,
      ),
    ).toMatchSnapshot()
  })

  describe('updateItemIndex', () => {
    describe('up', () => {
      const items = [
        { index: 1, id: 'id-1' },
        { index: 2, id: 'id-2' },
        { index: 3, id: 'id-3' },
      ]
      let results
      it('Can update indexes', async () => {
        await updatedItemIndex({
          currentItem: items[1],
          allItems: items,
          setItems: () => {},
          updateIndexing: (params) =>
            new Promise<any>((resolve) => {
              results = params
              resolve({})
            }),
          direction: 'up',
          defaultIndex: 1,
        })

        expect(results[0].index).toBe(2)
        expect(results[0].id).toBe('id-1')
        expect(results[1].index).toBe(1)
        expect(results[1].id).toBe('id-2')
      })
    })

    describe('down', () => {
      const items = [
        { index: 1, id: 'id-1' },
        { index: 2, id: 'id-2' },
        { index: 3, id: 'id-3' },
      ]
      let results
      it('Can update indexes', async () => {
        await updatedItemIndex({
          currentItem: items[1],
          allItems: items,
          setItems: () => {},
          updateIndexing: (params) =>
            new Promise<any>((resolve) => {
              results = params
              resolve({})
            }),
          direction: 'down',
          defaultIndex: 1,
        })

        expect(results[1].index).toBe(3)
        expect(results[1].id).toBe('id-2')
        expect(results[2].index).toBe(2)
        expect(results[2].id).toBe('id-3')
      })
    })

    describe('Can switch missing indexes (deleted indexes)', () => {
      const items = [
        { index: 1, id: 'id-1' },
        { index: 4, id: 'id-4' },
        { index: 5, id: 'id-5' },
      ]
      let results
      it('Can update indexes', async () => {
        await updatedItemIndex({
          currentItem: items[1],
          allItems: items,
          setItems: () => {},
          updateIndexing: (params) =>
            new Promise<any>((resolve) => {
              results = params
              resolve({})
            }),
          direction: 'down',
          defaultIndex: 1,
        })

        expect(results[1].index).toBe(5)
        expect(results[1].id).toBe('id-4')
        expect(results[2].index).toBe(4)
        expect(results[2].id).toBe('id-5')
      })
    })

    describe('Can resolve errors with duplicate indexes', () => {
      const items = [
        { index: 1, id: 'id-1' },
        { index: 4, id: 'id-4' },
        { index: 4, id: 'id-5' },
      ]
      let results
      it('Can update indexes', async () => {
        await updatedItemIndex({
          currentItem: items[1],
          allItems: items,
          setItems: () => {},
          updateIndexing: (params) =>
            new Promise<any>((resolve) => {
              results = params
              resolve({})
            }),
          direction: 'down',
          defaultIndex: 1,
        })

        expect(results[1].index).toBe(5)
        expect(results[1].id).toBe('id-4')
        expect(results[2].index).toBe(4)
        expect(results[2].id).toBe('id-5')
      })
    })
  })
})
