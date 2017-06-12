export default class GroupManager {
  constructor () {
    this.groups = new Map()
  }

  /**
   * Add given Collapse instance to the group defined in `props.groupId`.
   * Creates a new group if it wasn't found.
   * A group is just an array of Collapse instances
   * @param {Collapse} collapse Instance
   * @return {number} Index of collapse in group array
   */
  add (collapse) {
    const { groupId, positionInGroup } = collapse.props
    let myGroup = this.groups.get(groupId)

    if (!myGroup) {
      this.groups.set(groupId, [collapse])
      myGroup = this.groups.get(groupId)
    }

    // Make sure we return the proper position, which will differ if `pos` is higher than length
    if (positionInGroup > -1 && positionInGroup < this.collapsibles.length) {
      myGroup.splice(positionInGroup, 0, collapse)
      return positionInGroup
    }

    return myGroup.push(collapse) - 1
  }

  /**
   * Sets param isOpen to false for other Collapse instances in this group
   * @param {Collapse} collapse Instance
   */
  focusOn (collapse) {
    const { groupId } = collapse.props
    const myGroup = this.groups.get(groupId)

    myGroup.forEach((sibling) => {
      if (sibling !== collapse) {
        console.log(sibling)
        sibling.close(false)
      }
    })
  }
}
