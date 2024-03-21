// export function isCheckDisabled(node) {
//   const { disabled, disableCheckbox, checkable } = getOptionProps(node) || {};
//   return !!(disabled || disableCheckbox) || checkable === false;
// }

/**
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 * @param keyList       list of keys
 * @param isCheck       is check the node or not
 * @param keyEntities   parsed by `convertTreeToEntities` function in Tree
 * @param checkStatus   Can pass current checked status for process (usually for uncheck operation)
 * @returns {{checkedKeys: [], halfCheckedKeys: []}}
 */
export function conductCheck(keyList, isCheck, keyEntities, checkStatus = {}) {
  const checkedKeys = new Map();
  // const halfCheckedKeys = new Map(); // Record the key has some child checked (include child half checked)

  (checkStatus.checkedKeys || []).forEach(key => {
    checkedKeys.set(key, true);
  });

  // (checkStatus.halfCheckedKeys || []).forEach(key => {
  //   halfCheckedKeys.set(key, true);
  // });

  // Conduct up
  function conductUp(key) {
    if (checkedKeys.get(key) === isCheck) return;

    const entity = keyEntities.get(key);
    if (!entity) return;

    const { children, parent, node } = entity;

    // if (isCheckDisabled(node)) return;

    // Check child node checked status
    let everyChildChecked = true;
    let someChildChecked = false; // Child checked or half checked

    // (children || [])
    //   // .filter(child => !isCheckDisabled(child.node))
    //   .forEach(({ key: childKey }) => {
    //     const childChecked = checkedKeys.get(childKey);
    //     // const childHalfChecked = halfCheckedKeys.get(childKey);

    //     // if (childChecked || childHalfChecked) someChildChecked = true;
    //     if (!childChecked) everyChildChecked = false;
    //   });

    // Update checked status
    // if (isCheck) {
    //   checkedKeys.set(key, everyChildChecked);
    // } else {
    //   checkedKeys.set(key, false);
    // }
    // halfCheckedKeys.set(key, someChildChecked);
    
    checkedKeys.set(key, true);

    if (parent) {
      conductUp(parent.key);
    }
  }

  // Conduct down
  function conductDown(key) {
    if (checkedKeys.get(key) === isCheck) return;

    const entity = keyEntities.get(key);
    if (!entity) return;

    const { children, node } = entity;

    // if (isCheckDisabled(node)) return;

    checkedKeys.set(key, isCheck);

    (children || []).forEach(child => {
      conductDown(child.key);
    });
  }

  function conduct(key) {
    const entity = keyEntities.get(key);

    if (!entity) {
      warning(false, `'${key}' does not exist in the tree.`);
      return;
    }
    const { children, parent, node } = entity;
    checkedKeys.set(key, isCheck);

    // if (isCheckDisabled(node)) return;

    // Conduct down
    (children || [])
      // .filter(child => !isCheckDisabled(child.node))
      .forEach(child => {
        conductDown(child.key);
      });

    // Conduct up
    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(key => {
    conduct(key);
  });

  const checkedKeyList = [];
  // const halfCheckedKeyList = [];

  // Fill checked list
  console.log('checkedKeys: ===', checkedKeys);
  for (const [key, value] of checkedKeys) {
    if (value) {
      checkedKeyList.push(key);
    }
  }

  // Fill half checked list
  // for (const [key, value] of halfCheckedKeys) {
  //   if (!checkedKeys.get(key) && value) {
  //     halfCheckedKeyList.push(key);
  //   }
  // }

  return {
    checkedKeys: checkedKeyList,
    // halfCheckedKeys: halfCheckedKeyList,
  };
}
