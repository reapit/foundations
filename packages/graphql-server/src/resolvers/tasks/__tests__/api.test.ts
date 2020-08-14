import { createTaskArgsMock } from '../__stubs__/create-task'
import { updateTaskArgsMock } from '../__stubs__/update-task'
import { taskMock } from '../__stubs__/task'
import { tasksMock } from '../__stubs__/tasks'
import { mockContext } from '../../../__stubs__/context'
import { callCreateTaskAPI, callGetTaskByIdAPI, callGetTasksAPI, callUpdateTaskAPI } from '../api'
import { URLS } from '../../../constants/api'

jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => {
    return {
      get: jest.fn().mockImplementation(values => {
        if (values === `${URLS.tasks}/id`) {
          return {
            data: taskMock,
          }
        }
        return {
          data: tasksMock,
        }
      }),
      post: jest.fn(() => {
        return {
          headers: {
            location: '/task/id',
          },
          data: taskMock,
        }
      }),
      patch: jest.fn(() => {
        return {
          status: 204,
          data: taskMock,
        }
      }),
    }
  }),
}))

describe('tasks api', () => {
  describe('callGetTaskByIdAPI', () => {
    it('should run correctly', async () => {
      try {
        const mockArgs = { id: 'id' }
        const result = await callGetTaskByIdAPI(mockArgs, mockContext)
        expect(result).toEqual(taskMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callGetTasksAPI', () => {
    it('should run correctly', async () => {
      try {
        const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
        const result = await callGetTasksAPI(args, mockContext)
        expect(result).toEqual(tasksMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callCreateTaskAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callCreateTaskAPI(createTaskArgsMock, mockContext)
        expect(result).toEqual(taskMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callUpdateTaskAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callUpdateTaskAPI(updateTaskArgsMock, mockContext)
        expect(result).toEqual(taskMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
})
