import usersReducer, {
    actions,
    InitialStateTypeUsersReducer,
    subscribe,
    unsubscribe,
    UsersShortType
} from './usersReducer';
import {usersApi} from '../api/usersApi';
import {ResultCodesEnum} from '../api/api';


let state;
type InitialStateType = typeof state;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'anna', followed: false, photos: {
                    small: null,
                    large: null
                }, status: 'status 1'
            },
            {
                id: 1, name: 'herman', followed: true, photos: {
                    small: null,
                    large: null
                }, status: 'status 2'
            },
            {
                id: 2, name: 'olga', followed: true, photos: {
                    small: null,
                    large: null
                }, status: 'status 3'
            },
            {
                id: 3, name: 'konrad', followed: false, photos: {
                    small: null,
                    large: null
                }, status: 'status 4'
            }

        ],
        pageSize: 5,
        totalUsersCount: 0, //before axios.get
        currentPage: 1,
        isLoading: false,
        subscriptionProcessed: []
    }
})


test('followSuccess', () => {
    const newState = usersReducer(state, actions.follow(3));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeTruthy();
});

test('unfollowSuccess', () => {
    const newState = usersReducer(state, actions.unfollow(1));
    expect(newState.users[1].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeTruthy();
})

const dispatchMock = jest.fn();
const getStateMock = jest.fn();


const result: number = ResultCodesEnum.Success;
jest.mock('../api/usersApi');
const userAPIMock = usersApi as jest.Mocked<typeof usersApi>;
beforeEach(()=> {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.getSubscription.mockClear();
    userAPIMock.deleteSubscription.mockClear();
})

test('thunkFollowSuccess', async () => {
    userAPIMock.getSubscription.mockReturnValue(Promise.resolve(result));
    const thunk = subscribe(1);
    await thunk(dispatchMock, getStateMock,{});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.subscriptionIsBeingProcessed(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.subscriptionIsBeingProcessed(false, 1));
})

test('thunkUnfollowSuccess', async () => {
    userAPIMock.deleteSubscription.mockReturnValue(Promise.resolve(result));
    const thunk = unsubscribe(1);
    await thunk(dispatchMock, getStateMock,{});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.subscriptionIsBeingProcessed(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.subscriptionIsBeingProcessed(false, 1));
})