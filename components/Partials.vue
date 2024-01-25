<script setup lang="ts">
const props = withDefaults(defineProps<{
  path: string,
  tocMerge?: boolean,
  component?: string
}>(), {
  tocMerge: false,
  component: ''
})
const { data } = await useAsyncData(props.path, () => queryContent("/", ...props.path.split("/")).findOne())
const { toc, page } = useContent()

if (props.tocMerge) {
  const regx = /^h\d$/;
  if (data.value?.body?.toc?.links.length || 0 > 0) {
    const partials = [];
    for (let i = 0; i < page.value.body.children.length; i++) { // 遍历子节点
      const children = page.value.body.children[i];
      if (typeof children.tag === 'undefined') {
        continue
      }
      if (children.tag === props.component) { // 发现需要插入的节点
        let flag = true; // 发现元素
        for (let j = i + 1; j < page.value.body.children.length; j++) { // 找插入点
          const nextChild = page.value.body.children[j];
          if (regx.test(nextChild.tag)) { // 查h标签
            for (let k = 0; k < page.value.body.toc.links.length; k++) {
              const tocNode = page.value.body.toc.links[k];
              if (tocNode.id === nextChild.props.id) {
                flag = false; // 标志已经插入位置
                partials.push(k)  // 插入点
                j = page.value.body.children.length;
                break;
              }
            }
          }
        }
        if (flag) { // 元素后面没有h标签, 元素插入最后面
          partials.push(page.value.body.toc.links.length)
        }
      }
    }

    if (partials.length === 1) {
      const newToc = [...toc.value.links];
      newToc.splice(partials[0], 0, ...data.value?.body?.toc?.links ?? []);
      toc.value.links = newToc;
    }
  }
}
// console.log(useContent().page.value.body)
// console.log(data.value)
// toc.value.links = [...toc.value.links, ...data.value?.body?.toc?.links ?? []]
</script>

<template>
  <ContentRenderer :value="data" />
</template>