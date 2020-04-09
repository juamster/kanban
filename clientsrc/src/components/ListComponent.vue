<template>
  <div class="ListComponent">
    <div class="boxes d-flex">
      <div class="box d-flex justify-content-between align-items-top">
        {{list.name}}
        <i class="fa fa-trash text-muted mr-2" @click="deleteList"></i>
        <i class="fa fa-pencil text-muted mr-2" @click="editList"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListComponent",
  props: {
    list: { type: Object, required: true }
  },
  computed: {},
  methods: {
    async deleteList() {
      let yes = await this.$confirm(
        "Are you sure you want to delete the List?"
      );
      if (!yes) {
        return;
      } else {
        this.$store.dispatch("deleteList", this.list);
      }
    },

    async editList() {
      let yes = await this.$confirm("Edit List Feature is not yet implemented");
      if (!yes) {
        return;
      } else {
        // this.$store.dispatch("deleteList", this.list);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
.box {
  min-height: 80vh;
  width: 200px;
  background-color: var(--info);
}
</style>