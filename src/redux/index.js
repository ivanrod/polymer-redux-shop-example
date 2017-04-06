import * as Redux from 'redux';
import * as ReduxThunk from 'redux-thunk';

import constants from './constants';
import actions from './actions';
import reducers from './reducers';

const store = Redux.createStore(
              reducers,
              Redux.applyMiddleware(ReduxThunk.default)
            );

const behavior = PolymerRedux(store);

export default {
  actions,
  constants,
  behavior
};
