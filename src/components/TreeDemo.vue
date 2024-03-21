<template>
  <a-tree
    checkable
    checkStrictly
    :tree-data="treeData"
    :expanded-keys="expandedKeys"
    :checked-keys="checkedKeys"
    @check="onCheck"
  >
    <span slot="title0010" style="color: #1890ff">sss</span>
  </a-tree>
</template>
<script>
import { conductCheck } from './utils'
import { convertDataToTree } from 'ant-design-vue/lib/vc-tree/src/util'
import { convertTreeToEntities } from 'ant-design-vue/lib/vc-tree/src/util'

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ key: '0-0-1-0', slots: { title: 'title0010' } }],
      },
    ],
  },
];

export default {
  data() {
    return {
      treeData,
      keyEntities: new Map(),
      expandedKeys: ['0-0-0', '0-0-1'],
      checkedKeys: []
    };
  },
  mounted() {
    const treeNode = convertDataToTree(this.$createElement, treeData)
    console.log('treeNode', treeNode)
    const entitiesMap = convertTreeToEntities(treeNode)
    console.log('entitiesMap', entitiesMap)
    this.keyEntities = entitiesMap.keyEntities
  },
  methods: {
    onCheck(keyList, {checked, checkedNodes, node, event}) {
      console.log('node', node)
      const eventKey = node.eventKey
      const { checkedKeys, halfCheckedKeys } = conductCheck([eventKey], checked, this.keyEntities, {
        checkedKeys: this.checkedKeys,
        halfCheckedKeys: [],
      });
      console.log('checkedKeys', checkedKeys);
      this.checkedKeys = checkedKeys
    },
  },
}
</script>
