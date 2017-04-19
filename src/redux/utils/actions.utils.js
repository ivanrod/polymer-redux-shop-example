function bindActionsToElement(actionCreators, element) {
  return Object.keys(actionCreators).reduce((bindedActions, actionCreator) => {
    bindedActions[actionCreator] = (...args) => element.dispatch(actionCreators[actionCreator].apply(this, args));
    return bindedActions;
  }, {});
}

export function behaviorCreator(actionCreators) {

  return {
    ready() {
      this.actions = Object.assign({}, this.actions, bindActionsToElement(actionCreators, this));
    }
  };
}
