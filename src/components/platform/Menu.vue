<template>
    <div class="hamburger" @click="toggle">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "Menu",
    methods: {
        toggle() {
            this.$emit("toggle");
        }
    }
}
</script>

<style lang="scss" scoped>
.hamburger {
    height: 20px;
    width: 30px;
    margin-right: 30px;
    position: relative;
    div {
        height: 4px;
        width: 30px;
        background-color: gray;
        position: absolute;
    }
    div:first-of-type {
        top: 0;
    }
    div:nth-of-type(2) {
        top: 50%;
        transform: translateY(-50%);
    }
    div:last-of-type {
        bottom: 0;
        width: 20px;
        transition: width 0.25s;
    }
    &:hover {
        cursor: pointer;
        div:last-of-type {
            width: 30px;
        }
    }
}
</style>